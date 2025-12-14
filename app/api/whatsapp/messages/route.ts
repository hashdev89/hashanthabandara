import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "@/lib/whatsapp/messageStorage";

// Get messages for a session or phone number
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("sessionId");
    const phoneNumber = searchParams.get("phoneNumber");

    if (!sessionId && !phoneNumber) {
      return NextResponse.json(
        { error: "sessionId or phoneNumber is required" },
        { status: 400 }
      );
    }

    const messages = getMessages(phoneNumber || "", sessionId || undefined);

    // Format messages for frontend
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      from: msg.from,
      timestamp: msg.timestamp,
      status: msg.status,
    }));

    return NextResponse.json(
      {
        success: true,
        messages: formattedMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

