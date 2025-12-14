import { NextRequest, NextResponse } from "next/server";

// Test endpoint to check WhatsApp API configuration
// Useful for debugging configuration issues

const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v18.0";

export async function GET(request: NextRequest) {
  const checks = {
    phoneNumberId: {
      exists: !!WHATSAPP_PHONE_NUMBER_ID,
      value: WHATSAPP_PHONE_NUMBER_ID ? `${WHATSAPP_PHONE_NUMBER_ID.substring(0, 4)}...` : "Not set",
    },
    accessToken: {
      exists: !!WHATSAPP_ACCESS_TOKEN,
      length: WHATSAPP_ACCESS_TOKEN?.length || 0,
      preview: WHATSAPP_ACCESS_TOKEN ? `${WHATSAPP_ACCESS_TOKEN.substring(0, 10)}...` : "Not set",
    },
    apiVersion: WHATSAPP_API_VERSION,
    allConfigured: !!(WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN),
  };

  // Try to validate token by making a test API call
  let tokenValid = false;
  let tokenError: string | null = null;

  if (WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN) {
    try {
      const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        },
      });

      if (response.ok) {
        tokenValid = true;
      } else {
        const errorData = await response.json();
        tokenError = errorData.error?.message || "Token validation failed";
      }
    } catch (error) {
      tokenError = error instanceof Error ? error.message : "Unknown error";
    }
  }

  return NextResponse.json(
    {
      configuration: checks,
      tokenValidation: {
        valid: tokenValid,
        error: tokenError,
      },
      instructions: {
        missingCredentials: !checks.allConfigured
          ? "Add WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN to your .env.local file"
          : null,
        invalidToken: !tokenValid && checks.allConfigured
          ? "Your access token may be expired. Generate a new one from Meta App Dashboard"
          : null,
      },
    },
    { status: 200 }
  );
}


