'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Solution } from '@/app/dashboard/solutions/schema';

interface SolutionFilterProps {
  solutions: Solution[];
  onFilterChange: (filtered: Solution[]) => void;
}

export default function SolutionFilter({ solutions, onFilterChange }: SolutionFilterProps) {
  // Extract unique categories from solutions (we'll use a generic category for now)
  const categories = Array.from(
    new Set(solutions.map((solution) => 'Solution')), // Default category for all solutions
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Apply filters whenever they change
  useEffect(() => {
    let filteredSolutions = [...solutions];

    // Filter by category if one is selected
    if (selectedCategory) {
      filteredSolutions = filteredSolutions.filter(
        (solution) => 'Solution' === selectedCategory,
      );
    }

    // Filter by search term if one is entered
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredSolutions = filteredSolutions.filter(
        (solution) =>
          solution.title.toLowerCase().includes(term) ||
          solution.description.toLowerCase().includes(term) ||
          solution.slug.toLowerCase().includes(term),
      );
    }

    // Pass filtered solutions to parent component
    onFilterChange(filteredSolutions);
  }, [selectedCategory, searchTerm, solutions, onFilterChange]);

  return (
    <div className="mb-12 bg-card p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4">Filter Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search solutions..."
            className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Category
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={isCategoryDropdownOpen}
            >
              <span>{selectedCategory || 'All Categories'}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-1 bg-card border border-muted rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  <ul className="py-1" role="listbox">
                    <li
                      aria-selected={selectedCategory === null}
                      role="option"
                      className="px-4 py-2 cursor-pointer hover:bg-primary/10 flex items-center justify-between"
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      <span>All Categories</span>
                      {selectedCategory === null && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </li>
                    {categories.map((category) => (
                      <li
                        key={category}
                        role="option"
                        aria-selected={selectedCategory === category}
                        className="px-4 py-2 cursor-pointer hover:bg-primary/10 flex items-center justify-between"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryDropdownOpen(false);
                        }}
                      >
                        <span>{category}</span>
                        {selectedCategory === category && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedCategory(null);
            setSearchTerm('');
          }}
          className="text-sm"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
