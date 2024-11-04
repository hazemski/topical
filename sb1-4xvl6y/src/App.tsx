import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import TopicalMap from './components/TopicalMap';
import { generateTopicalMap } from './server/api';
import type { TopicCategory } from './types';

function App() {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<TopicCategory[]>([]);
  const [error, setError] = useState('');

  const handleGenerateMap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError('');
    setCategories([]);

    try {
      console.log('Generating map for:', keyword);
      const data = await generateTopicalMap(keyword);
      console.log('Received data:', data);
      setCategories(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate topical map. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SEO Topical Map Generator
          </h1>
          <p className="text-lg text-gray-600">
            Build your website's topical authority with AI-powered content mapping
          </p>
        </div>

        <form onSubmit={handleGenerateMap} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter your main topic or keyword..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !keyword.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Generate Map'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </form>

        <TopicalMap categories={categories} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;