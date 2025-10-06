'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ordersAPI, workersAPI } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Order, Worker } from '@/lib/api';
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  MapPinIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function WorkerDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [recentJobs, setRecentJobs] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock worker profile - in real app, fetch by user.workerId
        const mockWorker: Worker = {
          _id: '1',
          fullName: user?.fullName || 'Worker',
          email: user?.email || '',
          phoneNumber: user?.phoneNumber || '',
          categoryId: 1,
          subcategoryId: 1,
          location: {
            type: 'Point',
            coordinates: [0, 0],
            address: user?.address || '',
            city: user?.city || '',
            postalCode: user?.postalCode || '',
          },
          ratings: 4.8,
          reviews: 24,
          totalJobs: 45,
          completedJobs: 42,
          hourlyRate: 35,
          isAvailable: true,
          isVerified: true,
          skills: ['Plumbing', 'Electrical', 'General Repair'],
          experience: 5,
          certifications: ['Licensed Plumber', 'Electrical Safety'],
          workingHours: {
            monday: { start: '08:00', end: '18:00', available: true },
            tuesday: { start: '08:00', end: '18:00', available: true },
            wednesday: { start: '08:00', end: '18:00', available: true },
            thursday: { start: '08:00', end: '18:00', available: true },
            friday: { start: '08:00', end: '18:00', available: true },
            saturday: { start: '09:00', end: '16:00', available: true },
            sunday: { start: '10:00', end: '15:00', available: false },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setWorker(mockWorker);

        // Fetch recent jobs
        const jobsResponse = await ordersAPI.getByWorker(mockWorker._id, { limit: 5 });
        if (jobsResponse.success) {
          setRecentJobs(jobsResponse.data);
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

  const handleJobAction = async (jobId: string, action: string) => {
    try {
      await ordersAPI.updateStatus(jobId, action);
      // Refresh jobs list
      const jobsResponse = await ordersAPI.getByWorker(worker?._id || '', { limit: 5 });
      if (jobsResponse.success) {
        setRecentJobs(jobsResponse.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
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
    <div className="space-y-8">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {worker?.fullName || 'Worker'}! 💪
            </h1>
            <p className="text-green-100 text-lg">
              Ready to take on new jobs today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <WrenchScrewdriverIcon className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Jobs</p>
                <p className="text-3xl font-bold">
                  {recentJobs.filter(job => job.status === 'in-progress').length}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold">
                  {worker?.completedJobs || 0}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Rating</p>
                <p className="text-3xl font-bold">
                  {worker?.ratings || 0}
                </p>
              </div>
              <StarIcon className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Hourly Rate</p>
                <p className="text-3xl font-bold">
                  ${worker?.hourlyRate || 0}
                </p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-2 text-blue-600" />
            Availability Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className={`h-4 w-4 rounded-full ${worker?.isAvailable ? 'bg-green-400' : 'bg-red-400'}`} />
              <div>
                <p className="font-medium text-gray-900">
                  {worker?.isAvailable ? 'Available for new jobs' : 'Currently unavailable'}
                </p>
                <p className="text-sm text-gray-500">
                  {worker?.isAvailable ? 'You will receive job notifications' : 'You won\'t receive new job requests'}
                </p>
              </div>
            </div>
            <Button
              variant={worker?.isAvailable ? 'danger' : 'primary'}
              onClick={() => {
                setWorker(prev => prev ? { ...prev, isAvailable: !prev.isAvailable } : null);
              }}
            >
              {worker?.isAvailable ? 'Set Unavailable' : 'Set Available'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Jobs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
              Recent Jobs
            </CardTitle>
            <Button 
              variant="outline" 
              onClick={() => router.push('/jobs')}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 text-center py-4">{error}</div>
          )}
          
          {recentJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <WrenchScrewdriverIcon className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs yet</h3>
              <p className="text-gray-500 mb-6">
                Complete your profile to start receiving job requests
              </p>
              <Button 
                onClick={() => router.push('/profile')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Complete Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job._id}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {job.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(job.scheduledDate)}
                          </span>
                          <span className="flex items-center">
                            <CurrencyDollarIcon className="h-3 w-3 mr-1" />
                            ${job.totalPrice}
                          </span>
                          <span className="flex items-center">
                            <MapPinIcon className="h-3 w-3 mr-1" />
                            {job.location.city}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}
                      >
                        {job.status.replace('-', ' ')}
                      </span>
                      {job.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleJobAction(job._id, 'accepted')}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleJobAction(job._id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {job.status === 'accepted' && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleJobAction(job._id, 'in-progress')}
                        >
                          Start Job
                        </Button>
                      )}
                      {job.status === 'in-progress' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleJobAction(job._id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills & Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SparklesIcon className="h-5 w-5 mr-2 text-blue-600" />
            Your Skills & Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {worker?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Experience</h4>
              <p className="text-gray-600">
                {worker?.experience || 0} years of professional experience
              </p>
              <div className="mt-2">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Certifications</h5>
                <div className="space-y-1">
                  {worker?.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}