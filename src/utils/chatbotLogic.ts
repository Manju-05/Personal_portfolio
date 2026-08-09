import manjuContext from '../data/manju-context.json';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

// Simple keyword matching for Tier 1
export const getRuleBasedResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.match(/\b(hi|hello|hey|greetings|howdy)\b/)) {
    return manjuContext.bot_responses.greetings[Math.floor(Math.random() * manjuContext.bot_responses.greetings.length)];
  }
  
  if (lowerMsg.match(/\b(skill|skills|technologies|tech stack|stack|tools|languages)\b/)) {
    return manjuContext.bot_responses.skills;
  }
  
  if (lowerMsg.match(/\b(project|projects|portfolio|work|built)\b/)) {
    return manjuContext.bot_responses.projects;
  }
  
  if (lowerMsg.match(/\b(contact|email|phone|whatsapp|reach|hire|message)\b/)) {
    return manjuContext.bot_responses.contact;
  }
  
  if (lowerMsg.match(/\b(education|college|university|degree|study|studying)\b/)) {
    return manjuContext.bot_responses.education;
  }
  
  if (lowerMsg.match(/\b(experience|internship|job|work history)\b/)) {
    return manjuContext.bot_responses.experience;
  }

  // Fallback for Tier 1 (If no rules match, this will be returned. In Phase 2, this will trigger the Gemini API instead)
  return manjuContext.bot_responses.fallback;
};

// Generate a unique ID for messages
export const generateId = () => Math.random().toString(36).substring(2, 9);
