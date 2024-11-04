import React from 'react';
import { FileText } from 'lucide-react';
import { TopicPage } from '../types';

interface TopicCardProps {
  page: TopicPage;
}

export default function TopicCard({ page }: TopicCardProps) {
  const getIntentStyles = (intent: string) => {
    const styles = {
      informational: 'bg-green-100 text-green-800',
      commercial: 'bg-blue-100 text-blue-800',
      transactional: 'bg-purple-100 text-purple-800',
      navigational: 'bg-orange-100 text-orange-800'
    };
    return styles[intent as keyof typeof styles] || '';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-500 transition-colors">
      <div className="flex items-start space-x-3">
        <FileText className="w-5 h-5 text-blue-500 mt-1" />
        <div>
          <h3 className="font-semibold text-gray-800">{page.title}</h3>
          <div className="mt-2 flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIntentStyles(page.intent)}`}>
              {page.intent}
            </span>
            <span className="text-xs text-gray-500">
              Relevance: {page.relevance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}