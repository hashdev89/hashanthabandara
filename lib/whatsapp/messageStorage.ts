// Message storage for WhatsApp chat
// In-memory storage (replace with database in production)

export interface StoredMessage {
  id: string;
  phoneNumber: string;
  sessionId?: string;
  text: string;
  from: "user" | "bot";
  timestamp: Date;
  messageId?: string; // WhatsApp message ID
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
}

// In-memory storage
const messages = new Map<string, StoredMessage[]>();

// Store a message
export function storeMessage(message: StoredMessage): void {
  const key = message.sessionId || message.phoneNumber;
  const existing = messages.get(key) || [];
  existing.push(message);
  messages.set(key, existing);
}

// Get messages for a phone number or session
export function getMessages(
  phoneNumber: string,
  sessionId?: string
): StoredMessage[] {
  // If sessionId is provided, use it
  if (sessionId) {
    const sessionMessages = messages.get(sessionId) || [];
    // Also get business replies that might be for this session
    // (matched by timestamp proximity or context)
    const businessMessages = messages.get("business") || [];
    
    // Filter business messages that are recent (within last hour) as potential replies
    const recentBusinessMessages = businessMessages.filter((msg) => {
      const timeDiff = Date.now() - msg.timestamp.getTime();
      return timeDiff < 3600000; // Last hour
    });
    
    // Combine and sort by timestamp
    const allMessages = [...sessionMessages, ...recentBusinessMessages];
    return allMessages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
  }
  
  // Otherwise use phone number
  const key = phoneNumber;
  return messages.get(key) || [];
}

// Get all messages (for admin)
export function getAllMessages(): StoredMessage[] {
  const allMessages: StoredMessage[] = [];
  messages.forEach((msgArray) => {
    allMessages.push(...msgArray);
  });
  return allMessages.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );
}

// Clear messages for a session (optional)
export function clearMessages(phoneNumber: string, sessionId?: string): void {
  const key = sessionId || phoneNumber;
  messages.delete(key);
}

