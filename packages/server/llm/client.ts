import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
};
