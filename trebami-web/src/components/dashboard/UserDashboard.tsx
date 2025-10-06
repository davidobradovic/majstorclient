'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { categoriesAPI, ordersAPI } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Category, Order } from '@/lib/api';
import {
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  HomeIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function UserDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesResponse, ordersResponse] = await Promise.all([
          categoriesAPI.getAll(),
          ordersAPI.getByCustomer(user?.id || 0, { limit: 5 })
        ]);

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        }

        if (ordersResponse.success) {
          setRecentOrders(ordersResponse.data);
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
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'accepted':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
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

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Hero Section */}
      <div className="gradient-primary rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome back, {user?.fullName || 'User'}! 👋
            </h1>
            <p className="text-blue-100 text-xl">
              What service do you need today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">🔧</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-indigo-400/20 rounded-full blur-xl"></div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card 
          hover 
          variant="modern"
          className="cursor-pointer group gradient-secondary text-white border-0"
          onClick={() => router.push('/orders/create')}
        >
          <CardContent className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <PlusIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">New Service</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">Book a new service</p>
          </CardContent>
        </Card>

        <Card 
          hover 
          variant="modern"
          className="cursor-pointer group gradient-primary text-white border-0"
          onClick={() => router.push('/workers')}
        >
          <CardContent className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <MagnifyingGlassIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Find Workers</h3>
            <p className="text-blue-100 text-sm leading-relaxed">Browse professionals</p>
          </CardContent>
        </Card>

        <Card 
          hover 
          variant="modern"
          className="cursor-pointer group gradient-accent text-white border-0"
          onClick={() => router.push('/orders')}
        >
          <CardContent className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <ClockIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">My Orders</h3>
            <p className="text-orange-100 text-sm leading-relaxed">Track your services</p>
          </CardContent>
        </Card>

        <Card 
          hover 
          variant="modern"
          className="cursor-pointer group bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0"
          onClick={() => router.push('/messages')}
        >
          <CardContent className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <StarIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Messages</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">Chat with workers</p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Services */}
      <Card variant="modern">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">Popular Services</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => router.push('/categories')}
              className="text-blue-600 border-blue-600/30 hover:bg-blue-50/50"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-600 text-center py-8 text-lg">{error}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <Card
                    key={category.id}
                    variant="elevated"
                    hover
                    className="cursor-pointer group p-6"
                    onClick={() => router.push(`/workers?category=${category.id}`)}
                  >
                    <div className="text-center">
                      <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 shadow-lg">
                        <IconComponent className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {category.description || 'Professional service'}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card variant="modern">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">Recent Orders</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => router.push('/orders')}
              className="text-blue-600 border-blue-600/30 hover:bg-blue-50/50"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ClockIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No orders yet</h3>
              <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
                Get started by booking your first service
              </p>
              <Button 
                onClick={() => router.push('/orders/create')}
                className="gradient-primary shadow-lg shadow-blue-500/25"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Book Service
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <Card
                  key={order._id}
                  variant="elevated"
                  hover
                  className="p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {getStatusIcon(order.status)}
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">
                          {order.title}
                        </h4>
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <span className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {formatDate(order.scheduledDate)}
                          </span>
                          <span className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                            ${order.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}
                      >
                        {order.status.replace('-', ' ')}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/orders/${order._id}`)}
                        className="text-blue-600 border-blue-600/30 hover:bg-blue-50/50"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}