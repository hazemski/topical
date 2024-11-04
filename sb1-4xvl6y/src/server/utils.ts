export function cleanJsonResponse(response: string): string {
  try {
    let cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('Invalid JSON structure in response:', cleaned);
      throw new Error('Invalid JSON structure');
    }
    
    const jsonStr = cleaned.slice(jsonStart, jsonEnd + 1);
    JSON.parse(jsonStr); // Validate JSON
    return jsonStr;
  } catch (error) {
    console.error('Clean JSON failed:', error);
    throw new Error('Failed to clean JSON response');
  }
}

export function generateCSV(categories: any[]): string {
  const csvRows = ['Category,Title,Intent,Relevance'];
  
  categories.forEach(category => {
    category.pages.forEach(page => {
      const escapedCategory = category.name.replace(/"/g, '""');
      const escapedTitle = page.title.replace(/"/g, '""');
      csvRows.push(`"${escapedCategory}","${escapedTitle}","${page.intent}",${page.relevance}`);
    });
  });
  
  return csvRows.join('\n');
}