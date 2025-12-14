# Environment Variables Setup

## Current Status

Your `.env.local` file has been created with:
- ✅ Access Token: Added
- ❌ Phone Number ID: Still needs to be set
- ❌ Verify Token: Still needs to be set

## Step 1: Get Your Phone Number ID

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Select your app
3. Go to **WhatsApp** → **API Setup**
4. Find **"Phone number ID"** (it looks like: `123456789012345`)
5. Copy it

## Step 2: Update .env.local

Replace these values in your `.env.local` file:

```env
# Replace this:
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here

# With your actual Phone Number ID (numbers only, no quotes):
WHATSAPP_PHONE_NUMBER_ID=123456789012345
```

## Step 3: Create Verify Token

Generate a random secure string for the verify token:

```env
# Replace this:
WHATSAPP_VERIFY_TOKEN=your_random_verify_token_here

# With a random string (you can use any secure string):
WHATSAPP_VERIFY_TOKEN=my_secure_token_12345
```

## Step 4: Restart Your Server

After updating `.env.local`, restart your development server:

```bash
# Stop the server (Ctrl+C) and restart:
npm run dev
```

## Step 5: Test Configuration

Visit this URL to test:
```
http://localhost:3000/api/whatsapp/test
```

This will show you if everything is configured correctly.

## Complete .env.local Example

```env
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAM1vujI9eYBQNNXMilHJM9G3B5HRMVgTPZCxQybp1Dg1hBQ30vsaYlSCeZAELElzz4dpvX83ALZAM1myezQlnZBOx3ZBcSio5Q1SAvFuh9jbGbH79ZCV6t1Xi07Ut1D5csR3lOOGJlYdKa1u4vYndHFYQpMDdsrZCBLfNOfR6MTihZBeOEp1Xkmj8N7E0FpUZCccO8wlPE5iZBWiz6EdoklZBBSqooY8GDN38ZCL7uM4NQR
WHATSAPP_API_VERSION=v18.0
WHATSAPP_VERIFY_TOKEN=my_secure_token_12345
BUSINESS_PHONE=94769212943
LIVE_AGENT_PHONE=+94769212943
```

