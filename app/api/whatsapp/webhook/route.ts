import { NextRequest, NextResponse } from "next/server";
import {
  getChatbotResponse,
  getConversation,
  saveConversation,
  notifyAdmin,
  ConversationStep,
  type ConversationState,
} from "@/lib/whatsapp/chatbot";
import { storeMessage } from "@/lib/whatsapp/messageStorage";

// WhatsApp Business API Webhook Handler
// This handles incoming messages from WhatsApp and processes them with the chatbot

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "your_verify_token_here";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v18.0";
const LIVE_AGENT_PHONE = process.env.LIVE_AGENT_PHONE || "+94769212943";
const BUSINESS_PHONE = process.env.BUSINESS_PHONE || "94769212943"; // Your business WhatsApp number (no +)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Verify the webhook
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle incoming messages
    if (body.object === "whatsapp_business_account") {
      const entries = body.entry;
      
      for (const entry of entries) {
        const changes = entry.changes;
        
        for (const change of changes) {
          if (change.field === "messages") {
            const value = change.value;
            
            // Handle incoming message
            if (value.messages) {
              const message = value.messages[0];
              const from = message.from;
              const messageText = message.text?.body || "";
              const messageId = message.id;
              
              console.log("Received message:", {
                from,
                text: messageText,
                id: messageId,
              });
              
              // Check if message is from business (when business replies from WhatsApp)
              // Messages from business number should be shown as "bot" replies in chat widget
              const isFromBusiness = from === BUSINESS_PHONE.replace(/[^0-9]/g, "");
              
              // Extract session ID from message if it's a reply to website chat
              // Format: [Website Chat - Session: session_id]
              let sessionId: string | undefined;
              if (messageText.includes("[Website Chat - Session:")) {
                const sessionMatch = messageText.match(/Session: ([^\]]+)/);
                if (sessionMatch) {
                  sessionId = sessionMatch[1].trim();
                }
              }
              
              // If message is from business, it's a reply - find the session from recent messages
              if (isFromBusiness) {
                // Try to find session from context (check recent website messages)
                // For now, we'll store it and let the frontend match by timestamp/context
                // In production, you'd want a better session matching system
              }

              // Store incoming message
              // If from business, mark as "bot" so it shows in chat widget
              storeMessage({
                id: messageId,
                phoneNumber: isFromBusiness ? "business" : from,
                sessionId: sessionId,
                text: messageText,
                from: isFromBusiness ? "bot" : "user",
                timestamp: new Date(),
                messageId: messageId,
                status: "delivered",
              });

              // Only process with chatbot if message is from a customer (not business)
              if (!isFromBusiness && messageText && message.type === "text") {
                try {
                  const chatbotResponse = getChatbotResponse(messageText, from);
                  
                  // Send auto-reply
                  if (chatbotResponse.reply) {
                    const replyMessageId = await sendWhatsAppMessage(from, chatbotResponse.reply);
                    
                    // Store bot reply
                    if (replyMessageId) {
                      storeMessage({
                        id: `bot_${Date.now()}`,
                        phoneNumber: from,
                        text: chatbotResponse.reply,
                        from: "bot",
                        timestamp: new Date(),
                        messageId: replyMessageId,
                        status: "sent",
                      });
                    }
                  }
                  
                  // Handle escalation to live agent
                  if (chatbotResponse.escalate) {
                    const conversation = getConversation(from);
                    if (conversation) {
                      conversation.step = ConversationStep.LIVE_AGENT;
                      saveConversation(conversation);
                      
                      // Notify admin about escalation
                      await notifyAdmin(conversation);
                      
                      // Send notification to live agent (optional)
                      // You can send a message to your WhatsApp number
                      const adminMessage = `🔔 New inquiry escalated to live agent:\n\nPhone: ${from}\nName: ${conversation.data.name || "N/A"}\n\nView conversation in dashboard.`;
                      // await sendWhatsAppMessage(LIVE_AGENT_PHONE.replace(/[^0-9]/g, ""), adminMessage);
                    }
                  }
                  
                  // Handle completed conversations
                  const conversation = getConversation(from);
                  if (conversation?.step === ConversationStep.COMPLETED) {
                    // Notify admin about new inquiry
                    await notifyAdmin(conversation);
                  }
                } catch (error) {
                  console.error("Chatbot processing error:", error);
                  // Fallback response
                  await sendWhatsAppMessage(
                    from,
                    "I apologize, but I'm having trouble processing your message. Please try again or type 'agent' to speak with a live agent."
                  );
                }
              }
            }
            
            // Handle status updates
            if (value.statuses) {
              const status = value.statuses[0];
              console.log("Message status:", status);
            }
          }
        }
      }
      
      return NextResponse.json({ status: "success" }, { status: 200 });
    }
    
    return NextResponse.json({ status: "ignored" }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to send WhatsApp messages
async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<string | null> {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.error("WhatsApp API credentials not configured");
    return null;
  }

  try {
    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: {
          body: message,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send WhatsApp message:", errorData);
      return null;
    } else {
      const data = await response.json();
      console.log("Message sent successfully:", data);
      return data.messages[0].id;
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

