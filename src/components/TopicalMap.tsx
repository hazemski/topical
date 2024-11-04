import React, { useState, useEffect } from 'react';
import { TopicCategory } from '../types';
import { Download } from 'lucide-react';
import CategorySection from './CategorySection';
import { generateCSV } from '../server/api';

interface TopicalMapProps {
  categories: TopicCategory[];
  isLoading: boolean;
}

const loadingMessages = [
  "Analyzing topic structure...",
  "Mapping content relationships...",
  "Identifying key themes...",
  "Organizing topic clusters...",
  "Generating content suggestions...",
  "Almost there..."
];

export default function TopicalMap({ categories, isLoading }: TopicalMapProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleExportCSV = () => {
    const csv = generateCSV(categories);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'topical-map.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            {loadingMessages[messageIndex]}
          </p>
          <p className="text-sm text-gray-600">
            This may take a minute as we generate comprehensive topic suggestions
          </p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>
      <div className="space-y-8">
        {categories.map((category, index) => (
          <CategorySection key={index} category={category} />
        ))}
      </div>
    </div>
  );
}