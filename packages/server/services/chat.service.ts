import { conversationRepository } from '../repositories/conversation.repository';
import OpenAI from 'openai';

interface ChatResponse {
  id: string;
  message: string;
}

const openaiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: openaiKey,
});

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
  ): Promise<ChatResponse> {
    const response = await client.responses.create({
      input: prompt,
      model: 'gpt-4o-mini',
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);
    return {
      id: response.id,
      message: response.output_text,
    };
  },
};
