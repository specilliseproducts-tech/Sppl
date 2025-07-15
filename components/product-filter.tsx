"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { products } from "@/lib/constants"

interface ProductFilterProps {
  onFilterChange: (filtered: typeof products) => void
}

export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  // Extract unique categories from products
  const categories = Array.from(new Set(products.map((product) => product.category)))

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Apply filters whenever they change
  useEffect(() => {
    let filteredProducts = [...products]

    // Filter by category if one is selected
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory)
    }

    // Filter by search term if one is entered
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.shortDescription.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.features.some((feature) => feature.toLowerCase().includes(term)) ||
          product.applications.some((application) => application.toLowerCase().includes(term)),
      )
    }

    // Pass filtered products to parent component
    onFilterChange(filteredProducts)
  }, [selectedCategory, searchTerm, onFilterChange])

  return (
    <div className="mb-12 bg-card p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4">Filter Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-1">
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
              <span>{selectedCategory || "All Categories"}</span>
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
                      role="option"
                      className="px-4 py-2 cursor-pointer hover:bg-primary/10 flex items-center justify-between"
                      onClick={() => {
                        setSelectedCategory(null)
                        setIsCategoryDropdownOpen(false)
                      }}
                    >
                      <span>All Categories</span>
                      {selectedCategory === null && <Check className="h-4 w-4 text-primary" />}
                    </li>
                    {categories.map((category) => (
                      <li
                        key={category}
                        role="option"
                        className="px-4 py-2 cursor-pointer hover:bg-primary/10 flex items-center justify-between"
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsCategoryDropdownOpen(false)
                        }}
                      >
                        <span>{category}</span>
                        {selectedCategory === category && <Check className="h-4 w-4 text-primary" />}
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
            setSelectedCategory(null)
            setSearchTerm("")
          }}
          className="text-sm"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
