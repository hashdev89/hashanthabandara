import { NextRequest, NextResponse } from "next/server";
import { getConversation } from "@/lib/whatsapp/chatbot";

// Get conversation details for a phone number
// Useful for admin dashboard or checking conversation status

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const conversation = getConversation(phoneNumber);

    if (!conversation) {
      return NextResponse.json(
        { error: "No conversation found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        conversation: {
          phoneNumber: conversation.phoneNumber,
          step: conversation.step,
          data: conversation.data,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get conversation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

