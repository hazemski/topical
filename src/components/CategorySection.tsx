import React from 'react';
import { TopicCategory } from '../types';
import TopicCard from './TopicCard';

interface CategorySectionProps {
  category: TopicCategory;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.pages
          .sort((a, b) => b.relevance - a.relevance)
          .map((page, pageIndex) => (
            <TopicCard key={pageIndex} page={page} />
          ))}
      </div>
    </div>
  );
}