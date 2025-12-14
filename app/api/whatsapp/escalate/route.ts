import { NextRequest, NextResponse } from "next/server";
import {
  getConversation,
  saveConversation,
  ConversationStep,
  notifyAdmin,
} from "@/lib/whatsapp/chatbot";

// Endpoint to manually escalate a conversation to live agent
// Can be called from admin dashboard or triggered automatically

const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v18.0";
const LIVE_AGENT_PHONE = process.env.LIVE_AGENT_PHONE || "+94769212943";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const conversation = getConversation(phoneNumber);
    
    if (!conversation) {
      return NextResponse.json(
        { error: "No active conversation found" },
        { status: 404 }
      );
    }

    // Update conversation to live agent mode
    conversation.step = ConversationStep.LIVE_AGENT;
    saveConversation(conversation);

    // Notify admin
    await notifyAdmin(conversation);

    // Send message to user
    const message = `✅ You're now connected with a live agent!\n\nOur team member will respond to you shortly. Please wait...\n\nIf you have any urgent questions, feel free to ask.`;
    
    await sendWhatsAppMessage(phoneNumber, message);

    // Optional: Send notification to live agent
    const adminMessage = `🔔 New inquiry escalated:\n\nPhone: ${phoneNumber}\nName: ${conversation.data.name || "N/A"}\nEmail: ${conversation.data.email || "N/A"}\nProject: ${conversation.data.projectType || "N/A"}`;
    
    // Uncomment to send notification to your WhatsApp
    // await sendWhatsAppMessage(LIVE_AGENT_PHONE.replace(/[^0-9]/g, ""), adminMessage);

    return NextResponse.json(
      { success: true, message: "Conversation escalated to live agent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Escalation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.error("WhatsApp API credentials not configured");
    return;
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
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
}

