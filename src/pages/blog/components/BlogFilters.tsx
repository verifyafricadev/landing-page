
import { blogCategories } from '../../../mocks/blogArticles';
import {
	MagnifyingGlassIcon,
} from "@phosphor-icons/react";

interface BlogFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * BlogFilters component – renders category buttons and a search input.
 * Includes defensive checks to avoid runtime errors if callbacks are missing.
 */
export default function BlogFilters({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: BlogFiltersProps) {
  // Guard against undefined callbacks (should never happen in normal usage)
  const handleCategoryChange = (cat: string) => {
    if (typeof onCategoryChange === 'function') {
      onCategoryChange(cat);
    } else {
      console.warn('onCategoryChange callback is not provided');
    }
  };

  const handleSearchChange = (value: string) => {
    if (typeof onSearchChange === 'function') {
      onSearchChange(value);
    } else {
      console.warn('onSearchChange callback is not provided');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72 flex-shrink-0">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500\\/30 focus:border-teal-400 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
