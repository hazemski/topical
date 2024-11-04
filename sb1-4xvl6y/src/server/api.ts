import OpenAI from 'openai';
import type { TopicCategory } from '../types';
import { SYSTEM_PROMPT, createUserPrompt } from './prompts';
import { validateResponse } from './validation';
import { cleanJsonResponse } from './utils';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateTopicalMap(keyword: string): Promise<TopicCategory[]> {
  if (!keyword.trim()) {
    throw new Error('Keyword is required');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: createUserPrompt(keyword) }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from AI');
    }

    console.log('Raw AI response:', content);
    const cleanedContent = cleanJsonResponse(content);
    console.log('Cleaned content:', cleanedContent);
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }

    if (!validateResponse(parsedData)) {
      throw new Error('AI response format is invalid - please try again');
    }

    return parsedData.categories;
  } catch (error) {
    console.error('Error in generateTopicalMap:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate topical map');
  }
}

export { generateCSV } from './utils';