import type { TopicCategory } from '../types';

export function validateResponse(data: any): data is { categories: TopicCategory[] } {
  try {
    if (!data || typeof data !== 'object') {
      console.error('Invalid data structure:', data);
      return false;
    }
    if (!Array.isArray(data.categories)) {
      console.error('Categories is not an array:', data.categories);
      return false;
    }
    if (data.categories.length !== 10) {
      console.error('Wrong number of categories:', data.categories.length);
      return false;
    }

    const validIntents = ['informational', 'commercial', 'transactional', 'navigational'];

    return data.categories.every((category: any, categoryIndex: number) => {
      if (!category.name || typeof category.name !== 'string') {
        console.error(`Invalid category name at index ${categoryIndex}:`, category);
        return false;
      }
      if (!Array.isArray(category.pages)) {
        console.error(`Pages is not an array in category ${categoryIndex}:`, category);
        return false;
      }
      if (category.pages.length !== 5) {
        console.error(`Wrong number of pages in category ${categoryIndex}:`, category.pages.length);
        return false;
      }

      return category.pages.every((page: any, pageIndex: number) => {
        if (!page.title || typeof page.title !== 'string' || page.title.trim().length === 0) {
          console.error(`Invalid page title at category ${categoryIndex}, page ${pageIndex}:`, page);
          return false;
        }
        if (!validIntents.includes(page.intent)) {
          console.error(`Invalid intent at category ${categoryIndex}, page ${pageIndex}:`, page.intent);
          return false;
        }
        if (typeof page.relevance !== 'number' || page.relevance < 1 || page.relevance > 10) {
          console.error(`Invalid relevance at category ${categoryIndex}, page ${pageIndex}:`, page.relevance);
          return false;
        }
        return true;
      });
    });
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}