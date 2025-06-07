import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES } from '@/constants';

const FilterControls = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search files, tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search files"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          onClick={() => setSelectedCategory('all')}
          className="flex items-center gap-2"
          aria-pressed={selectedCategory === 'all'}
        >
          <Filter className="w-4 h-4" />
          All Files
        </Button>
        {Object.entries(CATEGORIES).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'ghost'}
              onClick={() => setSelectedCategory(key)}
              className="flex items-center gap-2"
              aria-pressed={selectedCategory === key}
              aria-label={`Filter by ${category.name}`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterControls;