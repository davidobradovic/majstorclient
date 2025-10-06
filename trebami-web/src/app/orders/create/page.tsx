'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { categoriesAPI, subcategoriesAPI, ordersAPI } from '@/lib/api';
import { Category, Subcategory } from '@/lib/api';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowLeftIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  HomeIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

const orderSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.number().min(1, 'Please select a category'),
  subcategoryId: z.number().min(1, 'Please select a subcategory'),
  scheduledDate: z.string().min(1, 'Please select a date'),
  scheduledTime: z.string().min(1, 'Please select a time'),
  estimatedDuration: z.number().min(1, 'Duration must be at least 1 hour'),
  totalPrice: z.number().min(1, 'Price must be greater than 0'),
  paymentMethod: z.enum(['cash', 'card', 'bank-transfer']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  customerNotes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function CreateOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      priority: 'medium',
      paymentMethod: 'cash',
    },
  });

  const watchedCategoryId = watch('categoryId');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (user) {
      fetchCategories();
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (watchedCategoryId) {
        try {
          const response = await subcategoriesAPI.getByCategory(watchedCategoryId);
          if (response.success) {
            setSubcategories(response.data);
            setSelectedCategory(categories.find(c => c.id === watchedCategoryId) || null);
          }
        } catch (err: any) {
          console.error('Failed to load subcategories:', err);
        }
      } else {
        setSubcategories([]);
        setSelectedCategory(null);
      }
    };

    fetchSubcategories();
  }, [watchedCategoryId, categories]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      setLoading(true);
      setError('');

      const orderData = {
        ...data,
        customerId: user?.id || 0,
        workerId: '', // Will be assigned when a worker accepts
        location: {
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          coordinates: [0, 0], // Would be populated with actual coordinates
        },
        scheduledDate: new Date(data.scheduledDate),
        images: [], // Would be populated with uploaded images
      };

      const response = await ordersAPI.create(orderData);
      
      if (response.success) {
        router.push('/orders');
      } else {
        setError(response.message || 'Failed to create order');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
    };
    return iconMap[category.title] || WrenchScrewdriverIcon;
  };

  if (authLoading) {
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
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="mr-4"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Order</h1>
            <p className="text-gray-600 text-lg">
              Fill out the details below to book a service
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  {...register('title')}
                  label="Service Title"
                  placeholder="e.g., Fix leaky kitchen faucet"
                  error={errors.title?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the service you need in detail..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      {...register('categoryId', { valueAsNumber: true })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => {
                        const IconComponent = getCategoryIcon(category);
                        return (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        );
                      })}
                    </select>
                    {errors.categoryId && (
                      <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      {...register('subcategoryId', { valueAsNumber: true })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!watchedCategoryId}
                    >
                      <option value="">Select a subcategory</option>
                      {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.title}
                        </option>
                      ))}
                    </select>
                    {errors.subcategoryId && (
                      <p className="mt-1 text-sm text-red-600">{errors.subcategoryId.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    {...register('scheduledDate')}
                    type="date"
                    label="Preferred Date"
                    error={errors.scheduledDate?.message}
                  />

                  <Input
                    {...register('scheduledTime')}
                    type="time"
                    label="Preferred Time"
                    error={errors.scheduledTime?.message}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    {...register('estimatedDuration', { valueAsNumber: true })}
                    type="number"
                    label="Estimated Duration (hours)"
                    placeholder="2"
                    min="1"
                    error={errors.estimatedDuration?.message}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      {...register('priority')}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Service Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  {...register('address')}
                  label="Address"
                  placeholder="123 Main Street"
                  error={errors.address?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    {...register('city')}
                    label="City"
                    placeholder="New York"
                    error={errors.city?.message}
                  />

                  <Input
                    {...register('postalCode')}
                    label="Postal Code"
                    placeholder="10001"
                    error={errors.postalCode?.message}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  {...register('totalPrice', { valueAsNumber: true })}
                  type="number"
                  label="Estimated Budget"
                  placeholder="100"
                  min="1"
                  step="0.01"
                  error={errors.totalPrice?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'cash', label: 'Cash', icon: BanknotesIcon, description: 'Pay when service is completed' },
                      { value: 'card', label: 'Credit Card', icon: CreditCardIcon, description: 'Secure online payment' },
                      { value: 'bank-transfer', label: 'Bank Transfer', icon: CurrencyDollarIcon, description: 'Direct bank transfer' },
                    ].map((method) => (
                      <label key={method.value} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer group">
                        <input
                          {...register('paymentMethod')}
                          type="radio"
                          value={method.value}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <method.icon className="h-6 w-6 ml-4 text-gray-400 group-hover:text-blue-600" />
                        <div className="ml-4 flex-1">
                          <span className="text-sm font-medium text-gray-700">
                            {method.label}
                          </span>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register('customerNotes')}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special instructions or requirements..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4 pb-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="px-8 bg-blue-600 hover:bg-blue-700"
              >
                Create Order
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}