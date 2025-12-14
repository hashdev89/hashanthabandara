# WhatsApp Business API Setup Guide

## Yes, You Need WhatsApp Business API Access!

To use the chat widget that sends and receives messages directly on your website (without opening WhatsApp), you **MUST** have WhatsApp Business API access through Meta (Facebook).

## What You Need

1. **Meta Business Account** (Free)
2. **WhatsApp Business Account** (Free)
3. **WhatsApp Business API Access** (Free for testing, paid for production)
4. **Meta App** with WhatsApp product enabled

## Step-by-Step Setup

### Step 1: Create Meta Business Account

1. Go to [Meta Business Suite](https://business.facebook.com/)
2. Click "Create Account" or sign in
3. Complete the business account setup

### Step 2: Add WhatsApp Business Number

1. In Meta Business Suite, go to **WhatsApp Accounts**
2. Click **"Add Phone Number"** or **"Get Started"**
3. Choose your country and enter your phone number
4. Verify your phone number with the code sent via SMS

### Step 3: Create Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/apps/)
2. Click **"Create App"**
3. Select **"Business"** as the app type
4. Fill in:
   - App Name: Your business name
   - App Contact Email: Your email
   - Business Account: Select your business account
5. Click **"Create App"**

### Step 4: Add WhatsApp Product

1. In your app dashboard, find **"Add Products"** or go to **"Products"** in the left menu
2. Find **"WhatsApp"** and click **"Set Up"**
3. Follow the setup wizard

### Step 5: Get Your Credentials

1. **Phone Number ID**:
   - Go to **WhatsApp** → **API Setup** in your app dashboard
   - Copy the **"Phone number ID"** (looks like: `123456789012345`)

2. **Access Token**:
   - In the same **API Setup** page
   - You'll see **"Temporary access token"** (valid for 24 hours)
   - For production, you need a **System User** token (permanent)
   - Click **"Generate access token"** to get a temporary token

3. **Verify Token**:
   - Create a random secure string (e.g., use a password generator)
   - This is used to verify your webhook
   - Example: `my_secure_verify_token_12345`

### Step 6: Configure Environment Variables

Create or update `.env.local`:

```env
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_API_VERSION=v18.0
WHATSAPP_VERIFY_TOKEN=my_secure_verify_token_12345
LIVE_AGENT_PHONE=+94769212943
```

### Step 7: Set Up Webhook (For Receiving Messages)

#### For Local Development (using ngrok):

1. **Install ngrok**:
   ```bash
   # macOS
   brew install ngrok
   
   # Or download from https://ngrok.com/
   ```

2. **Start your Next.js server**:
   ```bash
   npm run dev
   ```

3. **Expose with ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

5. **Configure Webhook in Meta**:
   - Go to your Meta App → **WhatsApp** → **Configuration**
   - Click **"Edit"** next to **Webhook**
   - **Callback URL**: `https://your-ngrok-url.ngrok.io/api/whatsapp/webhook`
   - **Verify Token**: (same as `WHATSAPP_VERIFY_TOKEN` in your `.env.local`)
   - Click **"Verify and Save"**

6. **Subscribe to Webhook Fields**:
   - After verification, click **"Manage"** next to Webhook
   - Subscribe to: **`messages`** field
   - Click **"Save"**

#### For Production:

1. Use your production domain instead of ngrok
2. Webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
3. Make sure your server has HTTPS enabled

### Step 8: Test the Integration

1. **Start your server**:
   ```bash
   npm run dev
   ```

2. **Open your website** and click the WhatsApp chat widget

3. **Enter your phone number** (the one you verified with WhatsApp Business)

4. **Send a test message** - it should:
   - Send via API (not open WhatsApp app)
   - Receive auto-reply from chatbot
   - Show messages in the chat widget

## Important Notes

### Free Tier Limitations

- **Temporary Access Token**: Valid for 24 hours only
- **Message Limits**: 1,000 conversations/month (free tier)
- **Testing**: Can only message numbers you've verified

### Production Setup

For production, you need:

1. **System User Token** (Permanent):
   - Go to Meta Business Settings → **System Users**
   - Create a System User with WhatsApp permissions
   - Generate a permanent token

2. **Business Verification**:
   - Complete business verification in Meta Business Suite
   - Required for higher message limits

3. **Phone Number Verification**:
   - Your WhatsApp Business number must be verified
   - Can take 24-48 hours

### Testing Your Number

Before users can message you:

1. **Add Test Numbers**:
   - Go to Meta App → **WhatsApp** → **API Setup**
   - Scroll to **"To"** field
   - Add phone numbers you want to test with (format: `1234567890` without +)
   - Click **"Send Message"** to verify

2. **Users must message you first**:
   - In free tier, users need to initiate conversation
   - After 24 hours, you can message them freely

## Troubleshooting

### "WhatsApp API credentials not configured"
- Check your `.env.local` file exists
- Verify all environment variables are set
- Restart your development server after adding variables

### "Failed to send message"
- Check your access token is valid (not expired)
- Verify phone number ID is correct
- Ensure recipient number is in correct format (no +, no spaces)
- Check if you've reached message limits

### Webhook not receiving messages
- Verify webhook URL is accessible (test with ngrok URL in browser)
- Check verify token matches
- Ensure webhook is subscribed to `messages` field
- Check server logs for errors

### Messages not appearing in chat widget
- Check browser console for errors
- Verify `/api/whatsapp/messages` endpoint is working
- Check if session ID is being stored in localStorage
- Ensure polling is running (check Network tab)

## Cost Information

- **Free Tier**: 1,000 conversations/month
- **Paid Tier**: Starts at $0.005-0.09 per conversation (varies by country)
- **No setup fees** for WhatsApp Business API

## Next Steps

1. ✅ Set up Meta Business Account
2. ✅ Create Meta App with WhatsApp
3. ✅ Get API credentials
4. ✅ Configure webhook
5. ✅ Test the integration
6. 🔄 Upgrade to production token when ready
7. 🔄 Complete business verification for higher limits

## Support Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta for Developers](https://developers.facebook.com/)
- [WhatsApp Business API Pricing](https://developers.facebook.com/docs/whatsapp/pricing)
- [Webhook Setup Guide](https://developers.facebook.com/docs/graph-api/webhooks)

## Quick Checklist

- [ ] Meta Business Account created
- [ ] WhatsApp Business number verified
- [ ] Meta App created
- [ ] WhatsApp product added to app
- [ ] Phone Number ID obtained
- [ ] Access Token generated
- [ ] Verify Token created
- [ ] Environment variables configured
- [ ] Webhook configured (ngrok for local)
- [ ] Webhook verified and subscribed
- [ ] Test message sent successfully

Once all checked, your WhatsApp chat widget will work directly on your website! 🎉

