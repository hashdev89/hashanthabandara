# WhatsApp Business API Integration Guide

This guide will help you set up WhatsApp Business API chatbot integration for your website.

## Prerequisites

1. A Meta Business Account
2. A WhatsApp Business Account
3. Access to Meta for Developers (https://developers.facebook.com/)

## Step 1: Set Up Meta Business Account

1. Go to [Meta Business Suite](https://business.facebook.com/)
2. Create or select your business account
3. Add your WhatsApp Business number

## Step 2: Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/apps/)
2. Click "Create App"
3. Select "Business" as the app type
4. Fill in your app details and create the app

## Step 3: Add WhatsApp Product

1. In your app dashboard, go to "Add Products"
2. Find "WhatsApp" and click "Set Up"
3. Follow the setup wizard

## Step 4: Get Your Credentials

1. **Phone Number ID**: 
   - Go to WhatsApp > API Setup
   - Copy your "Phone number ID"

2. **Access Token**:
   - Go to WhatsApp > API Setup
   - Generate a temporary token (for testing)
   - For production, set up a System User and get a permanent token

3. **Verify Token**:
   - Create a random string (e.g., use a password generator)
   - This will be used to verify your webhook

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_access_token
   WHATSAPP_API_VERSION=v18.0
   WHATSAPP_VERIFY_TOKEN=your_random_token
   LIVE_AGENT_PHONE=+94769212943  # Your WhatsApp number for live agent notifications
   ```

## Step 6: Set Up Webhook

1. **For Local Development (using ngrok)**:
   ```bash
   # Install ngrok: https://ngrok.com/
   ngrok http 3000
   # Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
   ```

2. **Configure Webhook in Meta**:
   - Go to WhatsApp > Configuration
   - Click "Edit" on Webhook
   - Callback URL: `https://your-domain.com/api/whatsapp/webhook`
   - For local: `https://your-ngrok-url.ngrok.io/api/whatsapp/webhook`
   - Verify Token: (use the same as WHATSAPP_VERIFY_TOKEN)
   - Subscribe to: `messages` field

3. **Verify Webhook**:
   - Click "Verify and Save"
   - Meta will send a GET request to verify your webhook

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. The WhatsApp chat widget should appear on your website (bottom right)

3. Click the widget and send a test message

4. Check your WhatsApp Business account for the message

## Step 8: Send Messages Programmatically

You can send messages via the API endpoint:

```javascript
// Example: Send a message
fetch('/api/whatsapp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '1234567890', // Phone number with country code (no +)
    message: 'Hello! This is a test message.',
  }),
});
```

## Webhook Events

The webhook will receive:
- **Incoming messages**: When users send messages to your WhatsApp Business number
- **Status updates**: When message status changes (sent, delivered, read, etc.)

## Customization

### Update Phone Number in Widget

Edit `components/WhatsAppChat/index.tsx`:
```typescript
const phoneNumber = "+94769212943"; // Change to your number
```

### Add Chatbot Logic

Edit `app/api/whatsapp/webhook/route.ts` to add:
- AI/chatbot responses
- Message routing
- Database storage
- Auto-replies

## Production Deployment

1. **Get Permanent Access Token**:
   - Set up a System User in Meta Business Settings
   - Generate a permanent token with WhatsApp permissions

2. **Update Webhook URL**:
   - Use your production domain
   - Ensure HTTPS is enabled

3. **Environment Variables**:
   - Add all variables to your hosting platform (Vercel, etc.)
   - Never commit `.env.local` to git

## Troubleshooting

### Webhook Not Receiving Messages
- Check webhook URL is accessible
- Verify webhook is subscribed to correct fields
- Check server logs for errors

### Messages Not Sending
- Verify access token is valid
- Check phone number ID is correct
- Ensure recipient has opted in (for business messaging)

### Widget Not Appearing
- Check browser console for errors
- Verify component is imported in layout
- Check if there are CSS conflicts

## Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta for Developers](https://developers.facebook.com/)
- [Webhook Setup Guide](https://developers.facebook.com/docs/graph-api/webhooks)

## Support

For issues with:
- **WhatsApp API**: Contact Meta Developer Support
- **Integration Code**: Check the code comments and documentation

