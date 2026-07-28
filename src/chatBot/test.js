// quickstart.ts
import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({ apiKey: process.env.MISTRALAI_API_KEY });

export async function response(query) {
    const response = await client.chat.complete({
  model: 'mistral-large-latest',
//   stream:true,
//   maxTokens:500,

  messages: [
    {role: 'system', content: 'You are a helpful assistant.'},
    { role: 'user', content: query }
  ],
});
    return response;
}
