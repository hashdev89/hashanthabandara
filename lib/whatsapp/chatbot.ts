// WhatsApp Chatbot Logic
// Handles conversation flow, auto-replies, and escalation

export interface ConversationState {
  phoneNumber: string;
  step: ConversationStep;
  data: {
    name?: string;
    email?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    requirements?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export enum ConversationStep {
  GREETING = "greeting",
  ASK_NAME = "ask_name",
  ASK_EMAIL = "ask_email",
  ASK_PROJECT_TYPE = "ask_project_type",
  ASK_BUDGET = "ask_budget",
  ASK_TIMELINE = "ask_timeline",
  ASK_REQUIREMENTS = "ask_requirements",
  CONFIRM = "confirm",
  LIVE_AGENT = "live_agent",
  COMPLETED = "completed",
}

// In-memory storage (use database in production)
const conversations = new Map<string, ConversationState>();

export function getConversation(phoneNumber: string): ConversationState | null {
  return conversations.get(phoneNumber) || null;
}

export function saveConversation(state: ConversationState): void {
  conversations.set(state.phoneNumber, state);
}

export function resetConversation(phoneNumber: string): void {
  conversations.delete(phoneNumber);
}

// Chatbot responses based on conversation step
export function getChatbotResponse(
  message: string,
  phoneNumber: string
): { reply: string; nextStep?: ConversationStep; escalate?: boolean } {
  const conversation = getConversation(phoneNumber);
  const lowerMessage = message.toLowerCase().trim();

  // Check for escalation keywords
  if (
    lowerMessage.includes("agent") ||
    lowerMessage.includes("human") ||
    lowerMessage.includes("speak to") ||
    lowerMessage.includes("talk to") ||
    lowerMessage === "yes" && conversation?.step === ConversationStep.CONFIRM
  ) {
    return {
      reply: "I'll connect you with a live agent now. Please wait a moment...",
      escalate: true,
      nextStep: ConversationStep.LIVE_AGENT,
    };
  }

  // Start new conversation
  if (!conversation) {
    const newState: ConversationState = {
      phoneNumber,
      step: ConversationStep.GREETING,
      data: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveConversation(newState);
    return {
      reply: getGreetingMessage(),
      nextStep: ConversationStep.ASK_NAME,
    };
  }

  // Handle conversation flow
  switch (conversation.step) {
    case ConversationStep.GREETING:
    case ConversationStep.ASK_NAME:
      if (message.trim().length > 0) {
        conversation.data.name = message.trim();
        conversation.step = ConversationStep.ASK_EMAIL;
        conversation.updatedAt = new Date();
        saveConversation(conversation);
        return {
          reply: `Nice to meet you, ${message.trim()}! 👋\n\nCould you please share your email address?`,
          nextStep: ConversationStep.ASK_EMAIL,
        };
      }
      return {
        reply: "Please provide your name.",
      };

    case ConversationStep.ASK_EMAIL:
      if (message.includes("@") && message.includes(".")) {
        conversation.data.email = message.trim();
        conversation.step = ConversationStep.ASK_PROJECT_TYPE;
        conversation.updatedAt = new Date();
        saveConversation(conversation);
        return {
          reply: `Thank you! 📧\n\nWhat type of project are you looking for?\n\n1️⃣ Website Development\n2️⃣ Mobile App Development\n3️⃣ UI/UX Design\n4️⃣ Other\n\nPlease reply with the number or type your answer.`,
          nextStep: ConversationStep.ASK_PROJECT_TYPE,
        };
      }
      return {
        reply: "Please provide a valid email address.",
      };

    case ConversationStep.ASK_PROJECT_TYPE:
      const projectType = getProjectType(message);
      conversation.data.projectType = projectType;
      conversation.step = ConversationStep.ASK_BUDGET;
      conversation.updatedAt = new Date();
      saveConversation(conversation);
      return {
        reply: `Great choice! 💼\n\nWhat's your budget range for this project?\n\n1️⃣ Under $1,000\n2️⃣ $1,000 - $5,000\n3️⃣ $5,000 - $10,000\n4️⃣ $10,000+\n5️⃣ Not sure yet\n\nPlease reply with the number or your budget range.`,
        nextStep: ConversationStep.ASK_BUDGET,
      };

    case ConversationStep.ASK_BUDGET:
      conversation.data.budget = message.trim();
      conversation.step = ConversationStep.ASK_TIMELINE;
      conversation.updatedAt = new Date();
      saveConversation(conversation);
      return {
        reply: `Got it! 💰\n\nWhat's your preferred timeline for this project?\n\n1️⃣ ASAP / Urgent\n2️⃣ 1-2 months\n3️⃣ 3-6 months\n4️⃣ Flexible\n\nPlease reply with the number or your timeline.`,
        nextStep: ConversationStep.ASK_TIMELINE,
      };

    case ConversationStep.ASK_TIMELINE:
      conversation.data.timeline = message.trim();
      conversation.step = ConversationStep.ASK_REQUIREMENTS;
      conversation.updatedAt = new Date();
      saveConversation(conversation);
      return {
        reply: `Perfect! ⏰\n\nCould you please describe your project requirements in detail? Feel free to share as much information as you'd like.`,
        nextStep: ConversationStep.ASK_REQUIREMENTS,
      };

    case ConversationStep.ASK_REQUIREMENTS:
      conversation.data.requirements = message.trim();
      conversation.step = ConversationStep.CONFIRM;
      conversation.updatedAt = new Date();
      saveConversation(conversation);
      const summary = getSummary(conversation.data);
      return {
        reply: `Excellent! 📝\n\nHere's a summary of your requirements:\n\n${summary}\n\nIs this information correct? Reply "yes" to confirm, or "no" to start over.\n\nOr type "agent" to speak with a live agent.`,
        nextStep: ConversationStep.CONFIRM,
      };

    case ConversationStep.CONFIRM:
      if (lowerMessage === "yes" || lowerMessage === "y" || lowerMessage === "correct") {
        conversation.step = ConversationStep.COMPLETED;
        conversation.updatedAt = new Date();
        saveConversation(conversation);
        
        // Here you can save to database, send email notification, etc.
        // For now, we'll just confirm
        
        return {
          reply: `Perfect! ✅\n\nThank you for providing your requirements. I've received all the information.\n\nA team member will review your project details and get back to you within 24 hours.\n\nWould you like to speak with a live agent now? Reply "yes" or "agent" to connect.`,
          nextStep: ConversationStep.COMPLETED,
        };
      } else if (lowerMessage === "no" || lowerMessage === "n") {
        resetConversation(phoneNumber);
        return {
          reply: "No problem! Let's start over. 😊\n\n" + getGreetingMessage(),
          nextStep: ConversationStep.ASK_NAME,
        };
      }
      return {
        reply: 'Please reply "yes" to confirm, "no" to start over, or "agent" to speak with a live agent.',
      };

    case ConversationStep.COMPLETED:
    case ConversationStep.LIVE_AGENT:
      return {
        reply: "You're now connected with a live agent. They will respond shortly. Please wait...",
      };

    default:
      return {
        reply: getGreetingMessage(),
        nextStep: ConversationStep.ASK_NAME,
      };
  }
}

function getGreetingMessage(): string {
  return `👋 Hello! Welcome to Hashantha Bandara's Portfolio!\n\nI'm an AI assistant here to help you with your project requirements.\n\nTo get started, could you please tell me your name?`;
}

function getProjectType(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("1") || lower.includes("website") || lower.includes("web")) {
    return "Website Development";
  }
  if (lower.includes("2") || lower.includes("mobile") || lower.includes("app")) {
    return "Mobile App Development";
  }
  if (lower.includes("3") || lower.includes("ui") || lower.includes("ux") || lower.includes("design")) {
    return "UI/UX Design";
  }
  return message.trim();
}

function getSummary(data: ConversationState["data"]): string {
  return `👤 Name: ${data.name || "N/A"}
📧 Email: ${data.email || "N/A"}
💼 Project Type: ${data.projectType || "N/A"}
💰 Budget: ${data.budget || "N/A"}
⏰ Timeline: ${data.timeline || "N/A"}
📝 Requirements: ${data.requirements || "N/A"}`;
}

// Send notification to admin (you can integrate with email, Slack, etc.)
export async function notifyAdmin(conversation: ConversationState): Promise<void> {
  // TODO: Implement notification system
  // Examples:
  // - Send email to admin
  // - Send Slack notification
  // - Save to database
  // - Send to CRM system
  
  console.log("New inquiry received:", {
    phone: conversation.phoneNumber,
    data: conversation.data,
  });
}

