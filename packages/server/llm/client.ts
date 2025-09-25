import OpenAI from 'openai';
import { Ollama } from 'ollama';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ollamaClient = new Ollama();

type GenerateText = {
  prompt: string;
  model?: string;
  temperature?: number;
  maxToken?: number;
  previousResponseId?: string;
};

type LlmResponse = {
  id: string;
  output_text: string;
};

export const llmClient = {
  async generateText({
    prompt,
    model = 'gpt-4o-mini',
    temperature = 0.2,
    maxToken = 300,
    previousResponseId,
  }: GenerateText): Promise<LlmResponse> {
    const response = await client.responses.create({
      input: prompt,
      model,
      temperature,
      max_output_tokens: maxToken,
      previous_response_id: previousResponseId,
    });

    return {
      id: response.id,
      output_text: response.output_text,
    };
  },

  async summarizeReview(prompt: string) {
    const { message } = await ollamaClient.chat({
      model: 'gpt-oss:20b',
      messages: [{ role: 'user', content: prompt }],
    });

    if (!message?.content) {
      throw new Error('Ollama chat returned an empty response');
    }

    return {
      content: message.content,
    };
  },
};
