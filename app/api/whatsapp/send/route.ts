import { NextRequest, NextResponse } from "next/server";
import { storeMessage } from "@/lib/whatsapp/messageStorage";

// WhatsApp Business API - Send Message
// This endpoint allows you to send messages via WhatsApp Business API

const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v18.0";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, message, sessionId } = body;

    if (!to || !message) {
      return NextResponse.json(
        { error: "Missing 'to' or 'message' parameter" },
        { status: 400 }
      );
    }

    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
      console.error("Missing WhatsApp API credentials:", {
        hasPhoneNumberId: !!WHATSAPP_PHONE_NUMBER_ID,
        hasAccessToken: !!WHATSAPP_ACCESS_TOKEN,
      });
      return NextResponse.json(
        { 
          error: "WhatsApp API credentials not configured",
          details: "Please check your .env.local file and ensure WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN are set"
        },
        { status: 500 }
      );
    }

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

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", {
        status: response.status,
        statusText: response.statusText,
        error: data,
        phoneNumber: to,
        phoneNumberId: WHATSAPP_PHONE_NUMBER_ID,
      });
      
      // Store failed message
      storeMessage({
        id: `failed_${Date.now()}`,
        phoneNumber: to,
        sessionId: sessionId,
        text: message,
        from: "user",
        timestamp: new Date(),
        status: "failed",
      });
      
      // Provide more specific error messages
      let errorMessage = "Failed to send message";
      if (data.error) {
        const error = data.error;
        if (error.message) {
          errorMessage = error.message;
        } else if (error.error_subcode === 132000) {
          errorMessage = "Invalid phone number format";
        } else if (error.code === 190) {
          errorMessage = "Access token expired or invalid";
        } else if (error.type) {
          errorMessage = `WhatsApp API Error: ${error.type}`;
        }
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: data,
          debug: {
            phoneNumber: to,
            hasCredentials: !!(WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN),
          }
        },
        { status: response.status }
      );
    }

    const messageId = data.messages[0].id;

    // Store sent message (remove session ID from message text before storing)
    const cleanMessage = message.replace(/\[Website Chat - Session: [^\]]+\]\n\n/, "");
    storeMessage({
      id: `sent_${Date.now()}`,
      phoneNumber: to,
      sessionId: sessionId,
      text: cleanMessage,
      from: "user",
      timestamp: new Date(),
      messageId: messageId,
      status: "sent",
    });

    return NextResponse.json(
      { success: true, messageId: messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

