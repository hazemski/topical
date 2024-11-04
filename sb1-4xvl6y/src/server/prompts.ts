export const SYSTEM_PROMPT = `You are an SEO expert. Generate a topical map as a JSON object with EXACTLY:
- 10 categories
- 5 pages per category
- Each page must have a title, intent, and relevance score

CRITICAL: 
- Do not include any explanatory text
- Return only the JSON object
- Ensure the JSON structure is complete
- Do not truncate the response

Required JSON structure:
{
  "categories": [
    {
      "name": "Category Name",
      "pages": [
        {
          "title": "Page Title",
          "intent": "informational" | "commercial" | "transactional" | "navigational",
          "relevance": number (1-10)
        }
      ]
    }
  ]
}`;

export const createUserPrompt = (keyword: string): string => `Create a topical map for "${keyword}".

Requirements:
1. EXACTLY 10 categories
2. EXACTLY 5 pages per category
3. Each page must have:
   - A clear, specific title
   - One of these intents: informational, commercial, transactional, navigational
   - A relevance score from 1-10

Return ONLY the JSON object.`;