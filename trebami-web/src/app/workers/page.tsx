'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { workersAPI, categoriesAPI } from '@/lib/api';
import { Worker, Category } from '@/lib/api';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  XMarkIcon,
  CheckCircleIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  HomeIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function WorkersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const categoryId = searchParams.get('category');
        const subcategoryId = searchParams.get('subcategory');
        
        const [workersResponse, categoriesResponse] = await Promise.all([
          workersAPI.getAll({
            categoryId: categoryId ? parseInt(categoryId) : undefined,
            subcategoryId: subcategoryId ? parseInt(subcategoryId) : undefined,
            isAvailable: true,
            isVerified: true,
          }),
          categoriesAPI.getAll(),
        ]);

        if (workersResponse.success) {
          setWorkers(workersResponse.data);
        }

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
          if (categoryId) {
            setSelectedCategory(parseInt(categoryId));
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, authLoading, router, searchParams]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await workersAPI.getAll({
        search: searchTerm,
        categoryId: selectedCategory || undefined,
        isAvailable: true,
        isVerified: true,
      });

      if (response.success) {
        setWorkers(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkerSelect = (worker: Worker) => {
    router.push(`/workers/${worker._id}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const getCategoryIcon = (categoryId: number) => {
    const iconMap: { [key: number]: any } = {
      1: SparklesIcon,
      2: BoltIcon,
      3: WrenchScrewdriverIcon,
      4: PaintBrushIcon,
      5: HomeIcon,
      6: ComputerDesktopIcon,
    };
    return iconMap[categoryId] || WrenchScrewdriverIcon;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find Professional Workers
            </h1>
            <p className="text-gray-600 text-lg">
              Browse verified professionals in your area
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search workers by name, skills, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="lg:w-64">
                    <select
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button 
                    onClick={handleSearch} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <FunnelIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 lg:hidden">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button 
                      onClick={handleSearch} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {error ? (
            <div className="text-center py-12">
              <div className="text-red-600 text-lg">{error}</div>
            </div>
          ) : workers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No workers found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or browse all categories to find the perfect professional.
              </p>
              <Button 
                onClick={() => router.push('/categories')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Browse Categories
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => {
                const CategoryIcon = getCategoryIcon(worker.categoryId);
                return (
                  <Card
                    key={worker._id}
                    hover
                    className="cursor-pointer group overflow-hidden"
                    onClick={() => handleWorkerSelect(worker)}
                  >
                    <div className="relative">
                      {/* Profile Image */}
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        {worker.profileImage ? (
                          <img
                            src={worker.profileImage}
                            alt={worker.fullName}
                            className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                        ) : (
                          <div className="h-32 w-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {worker.fullName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Availability Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          worker.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {worker.isAvailable ? 'Available' : 'Busy'}
                        </div>
                      </div>

                      {/* Verified Badge */}
                      {worker.isVerified && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            Verified
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {worker.fullName}
                        </h3>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {renderStars(worker.ratings)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {worker.ratings.toFixed(1)} ({worker.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {worker.location.city}
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            ${worker.hourlyRate}/hr
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {worker.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {worker.skills.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{worker.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {worker.completedJobs} jobs
                        </div>
                        <div className="flex items-center">
                          <CategoryIcon className="h-4 w-4 mr-1" />
                          {worker.experience} years exp
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}