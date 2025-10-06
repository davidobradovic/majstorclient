'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import CategoriesGrid from '@/components/categories/CategoriesGrid';
import { Category, Subcategory } from '@/lib/api';

export default function CategoriesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleCategorySelect = (category: Category) => {
    // Navigate to workers page with category filter
    router.push(`/workers?category=${category.id}`);
  };

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    // Navigate to workers page with subcategory filter
    router.push(`/workers?subcategory=${subcategory.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Categories</h1>
            <p className="text-gray-600 text-lg">
              Choose a category to find the perfect service professional for your needs
            </p>
          </div>

          <CategoriesGrid
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
            showSubcategories={true}
          />
        </div>
      </main>
    </div>
  );
}