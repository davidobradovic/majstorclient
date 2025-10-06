'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ordersAPI } from '@/lib/api';
import { Order } from '@/lib/api';
import {
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  FunnelIcon,
  XMarkIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  HomeIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await ordersAPI.getByCustomer(user?.id || 0, {
          status: statusFilter === 'all' ? undefined : statusFilter,
        });

        if (response.success) {
          setOrders(response.data);
        } else {
          setError('Failed to load orders');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, router, statusFilter]);

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

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const statusFilters = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { value: 'accepted', label: 'Accepted', count: orders.filter(o => o.status === 'accepted').length },
    { value: 'in-progress', label: 'In Progress', count: orders.filter(o => o.status === 'in-progress').length },
    { value: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
              <p className="text-gray-600 text-lg">
                Track and manage your service requests
              </p>
            </div>
            <Button 
              onClick={() => router.push('/orders/create')}
              className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filter Orders</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === filter.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                      {filter.count > 0 && (
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          statusFilter === filter.value
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {filter.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          {error ? (
            <div className="text-center py-12">
              <div className="text-red-600 text-lg">{error}</div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClockIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {statusFilter === 'all'
                  ? "You haven't created any orders yet. Get started by booking your first service."
                  : `No orders with status "${statusFilter}". Try selecting a different filter.`}
              </p>
              <Button 
                onClick={() => router.push('/orders/create')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Your First Order
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const CategoryIcon = getCategoryIcon(order.categoryId);
                return (
                  <Card key={order._id} hover className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Order Image/Icon */}
                        <div className="lg:w-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-6">
                          <CategoryIcon className="h-12 w-12 text-white" />
                        </div>
                        
                        {/* Order Details */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                              <div className="flex items-start space-x-4">
                                {getStatusIcon(order.status)}
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {order.title}
                                  </h3>
                                  <p className="text-gray-600 mb-4 line-clamp-2">
                                    {order.description}
                                  </p>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-2" />
                                      {formatDate(order.scheduledDate)} at {formatTime(order.scheduledTime)}
                                    </div>
                                    <div className="flex items-center">
                                      <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                                      ${order.totalPrice}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPinIcon className="h-4 w-4 mr-2" />
                                      {order.location.city}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      Order #{order.orderNumber}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Status and Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                              >
                                {order.status.replace('-', ' ')}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/orders/${order._id}`)}
                                className="w-full sm:w-auto"
                              >
                                <EyeIcon className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
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