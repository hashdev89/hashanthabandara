# WhatsApp Auto Chatbot Guide

This guide explains how the auto chatbot works and how to customize it.

## How It Works

The chatbot automatically:
1. **Greets users** when they first message
2. **Collects requirements** through a conversation flow:
   - Name
   - Email
   - Project Type
   - Budget
   - Timeline
   - Detailed Requirements
3. **Confirms information** and saves it
4. **Escalates to live agent** when requested

## Conversation Flow

```
User sends message
    ↓
Chatbot greets and asks for name
    ↓
User provides name
    ↓
Chatbot asks for email
    ↓
User provides email
    ↓
Chatbot asks for project type
    ↓
User selects project type
    ↓
Chatbot asks for budget
    ↓
User provides budget
    ↓
Chatbot asks for timeline
    ↓
User provides timeline
    ↓
Chatbot asks for detailed requirements
    ↓
User provides requirements
    ↓
Chatbot shows summary and asks for confirmation
    ↓
User confirms → Conversation completed
    OR
User says "agent" → Escalated to live agent
```

## Escalation Triggers

Users can request a live agent by typing:
- "agent"
- "human"
- "speak to"
- "talk to"
- "yes" (when asked if they want to speak with agent)

## Customization

### 1. Modify Conversation Flow

Edit `lib/whatsapp/chatbot.ts`:

```typescript
// Add new questions
case ConversationStep.ASK_NEW_QUESTION:
  conversation.data.newField = message.trim();
  conversation.step = ConversationStep.ASK_NEXT_QUESTION;
  return {
    reply: "Your question here?",
    nextStep: ConversationStep.ASK_NEXT_QUESTION,
  };
```

### 2. Change Greeting Message

Edit `getGreetingMessage()` function in `lib/whatsapp/chatbot.ts`:

```typescript
function getGreetingMessage(): string {
  return `Your custom greeting message here!`;
}
```

### 3. Customize Project Types

Edit `getProjectType()` function to add more options:

```typescript
function getProjectType(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("5") || lower.includes("ecommerce")) {
    return "E-commerce Development";
  }
  // Add more options...
}
```

### 4. Add Notification System

Edit `notifyAdmin()` function in `lib/whatsapp/chatbot.ts`:

```typescript
export async function notifyAdmin(conversation: ConversationState): Promise<void> {
  // Send email
  await sendEmail({
    to: "your-email@example.com",
    subject: "New WhatsApp Inquiry",
    body: `Name: ${conversation.data.name}\nEmail: ${conversation.data.email}...`
  });
  
  // Or send to Slack
  await sendSlackMessage({
    channel: "#inquiries",
    text: `New inquiry from ${conversation.data.name}`
  });
  
  // Or save to database
  await db.inquiries.create({
    data: conversation.data
  });
}
```

### 5. Database Integration

Replace in-memory storage with a database:

```typescript
// Instead of Map, use database
import { db } from "@/lib/db";

export async function getConversation(phoneNumber: string): Promise<ConversationState | null> {
  const conversation = await db.conversations.findUnique({
    where: { phoneNumber }
  });
  return conversation;
}

export async function saveConversation(state: ConversationState): Promise<void> {
  await db.conversations.upsert({
    where: { phoneNumber: state.phoneNumber },
    update: state,
    create: state
  });
}
```

## API Endpoints

### 1. Webhook (Automatic)
- **URL**: `/api/whatsapp/webhook`
- **Method**: POST (handled automatically by WhatsApp)
- **Purpose**: Receives incoming messages and processes with chatbot

### 2. Send Message
- **URL**: `/api/whatsapp/send`
- **Method**: POST
- **Body**: 
  ```json
  {
    "to": "1234567890",
    "message": "Your message here"
  }
  ```

### 3. Escalate Conversation
- **URL**: `/api/whatsapp/escalate`
- **Method**: POST
- **Body**:
  ```json
  {
    "phoneNumber": "1234567890"
  }
  ```

### 4. Get Conversation
- **URL**: `/api/whatsapp/conversations?phoneNumber=1234567890`
- **Method**: GET
- **Purpose**: Check conversation status and data

## Testing

### Test Locally with ngrok

1. Start your server:
   ```bash
   npm run dev
   ```

2. Expose with ngrok:
   ```bash
   ngrok http 3000
   ```

3. Set webhook URL in Meta dashboard:
   ```
   https://your-ngrok-url.ngrok.io/api/whatsapp/webhook
   ```

4. Send a test message from WhatsApp to your Business number

### Test Conversation Flow

1. Send: "Hello"
   - Expected: Greeting + asks for name

2. Send: "John Doe"
   - Expected: Asks for email

3. Send: "john@example.com"
   - Expected: Asks for project type

4. Continue through the flow...

5. To test escalation:
   - Send: "agent" at any point
   - Expected: Escalated to live agent

## Environment Variables

Add to `.env.local`:

```env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_API_VERSION=v18.0
WHATSAPP_VERIFY_TOKEN=your_verify_token
LIVE_AGENT_PHONE=+94769212943  # Your WhatsApp number for notifications
```

## Production Considerations

1. **Database**: Replace in-memory storage with a database (PostgreSQL, MongoDB, etc.)

2. **Error Handling**: Add retry logic and error notifications

3. **Rate Limiting**: Implement rate limiting to prevent abuse

4. **Analytics**: Track conversation completion rates, escalation rates, etc.

5. **Admin Dashboard**: Build a dashboard to view and manage conversations

6. **Multi-language**: Add support for multiple languages

7. **AI Integration**: Integrate with OpenAI, Claude, or other AI for smarter responses

## Troubleshooting

### Chatbot not responding
- Check webhook is properly configured
- Verify environment variables are set
- Check server logs for errors

### Conversations not saving
- Currently using in-memory storage (resets on server restart)
- Implement database storage for persistence

### Escalation not working
- Check `LIVE_AGENT_PHONE` is set correctly
- Verify API credentials have send message permissions

## Next Steps

1. **Add Database**: Store conversations permanently
2. **Admin Dashboard**: View and manage conversations
3. **Email Notifications**: Get notified of new inquiries
4. **Analytics**: Track chatbot performance
5. **AI Enhancement**: Use GPT/Claude for smarter responses

