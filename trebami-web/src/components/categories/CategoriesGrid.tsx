'use client';

import React, { useState, useEffect } from 'react';
import { categoriesAPI, subcategoriesAPI } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Category, Subcategory } from '@/lib/api';
import {
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  HomeIcon,
  ComputerDesktopIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface CategoriesGridProps {
  onCategorySelect?: (category: Category) => void;
  onSubcategorySelect?: (subcategory: Subcategory) => void;
  showSubcategories?: boolean;
}

export default function CategoriesGrid({
  onCategorySelect,
  onSubcategorySelect,
  showSubcategories = false,
}: CategoriesGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getAll();
        
        if (response.success) {
          setCategories(response.data);
        } else {
          setError('Failed to load categories');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (category: Category) => {
    setSelectedCategory(category);
    
    if (onCategorySelect) {
      onCategorySelect(category);
    }

    if (showSubcategories) {
      try {
        const response = await subcategoriesAPI.getByCategory(category.id);
        if (response.success) {
          setSubcategories(response.data);
        }
      } catch (err: any) {
        console.error('Failed to load subcategories:', err);
      }
    }
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    if (onSubcategorySelect) {
      onSubcategorySelect(subcategory);
    }
  };

  const getCategoryIcon = (category: Category) => {
    const iconMap: { [key: string]: any } = {
      'Cleaning': SparklesIcon,
      'Electrical': BoltIcon,
      'Plumbing': WrenchScrewdriverIcon,
      'Painting': PaintBrushIcon,
      'Construction': HomeIcon,
      'IT Services': ComputerDesktopIcon,
      'Garden': HeartIcon,
      'Appliance': ShieldCheckIcon,
      'Pest Control': StarIcon,
      'Woodwork': WrenchScrewdriverIcon,
      'Air Assist': TruckIcon,
      'House Assist': HomeIcon,
    };

    return iconMap[category.title] || WrenchScrewdriverIcon;
  };

  const getCategoryColor = (category: Category) => {
    const colorMap: { [key: string]: string } = {
      'Cleaning': 'from-green-500 to-emerald-600',
      'Electrical': 'from-yellow-500 to-amber-600',
      'Plumbing': 'from-blue-500 to-cyan-600',
      'Painting': 'from-purple-500 to-violet-600',
      'Construction': 'from-orange-500 to-red-600',
      'IT Services': 'from-indigo-500 to-blue-600',
      'Garden': 'from-green-400 to-green-600',
      'Appliance': 'from-gray-500 to-gray-700',
      'Pest Control': 'from-red-500 to-pink-600',
      'Woodwork': 'from-amber-600 to-orange-600',
      'Air Assist': 'from-sky-500 to-blue-600',
      'House Assist': 'from-rose-500 to-pink-600',
    };

    return colorMap[category.title] || 'from-gray-500 to-gray-700';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {showSubcategories ? 'Select a Category' : 'Service Categories'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            const colorClass = getCategoryColor(category);
            
            return (
              <Card
                key={category.id}
                hover
                className={`cursor-pointer transition-all group ${
                  selectedCategory?.id === category.id
                    ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                    : 'hover:shadow-lg hover:scale-105'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Subcategories */}
      {showSubcategories && selectedCategory && subcategories.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {selectedCategory.title} Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subcategories.map((subcategory) => {
              const IconComponent = getCategoryIcon(selectedCategory);
              const colorClass = getCategoryColor(selectedCategory);
              
              return (
                <Card
                  key={subcategory.id}
                  hover
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all group"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {subcategory.title}
                    </h4>
                    {subcategory.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {subcategory.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {showSubcategories && selectedCategory && subcategories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WrenchScrewdriverIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subcategories available</h3>
          <p className="text-gray-500">
            No subcategories found for {selectedCategory.title}. You can still browse workers in this category.
          </p>
        </div>
      )}
    </div>
  );
}