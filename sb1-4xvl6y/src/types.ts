export interface TopicCategory {
  name: string;
  pages: TopicPage[];
}

export interface TopicPage {
  title: string;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  relevance: number;
}