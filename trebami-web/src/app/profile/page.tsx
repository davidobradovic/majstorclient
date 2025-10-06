'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      city: user?.city || '',
      postalCode: user?.postalCode || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await updateUser(data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (authLoading) {
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
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600 text-lg">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
                  {success}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      {...register('fullName')}
                      label="Full Name"
                      error={errors.fullName?.message}
                    />

                    <Input
                      {...register('email')}
                      type="email"
                      label="Email Address"
                      error={errors.email?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      {...register('phoneNumber')}
                      type="tel"
                      label="Phone Number"
                      error={errors.phoneNumber?.message}
                    />

                    <Input
                      {...register('address')}
                      label="Address"
                      error={errors.address?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      {...register('city')}
                      label="City"
                      error={errors.city?.message}
                    />

                    <Input
                      {...register('postalCode')}
                      label="Postal Code"
                      error={errors.postalCode?.message}
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading}
                      className="flex items-center bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.fullName || 'User'}
                            className="h-24 w-24 rounded-full object-cover"
                          />
                        ) : (
                          <UserCircleIcon className="h-16 w-16 text-white" />
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <CameraIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {user.fullName || 'No name set'}
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {user.role || 'user'}
                        </span>
                        {user.isActive && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <ShieldCheckIcon className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-gray-900">{user.email || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-gray-900">{user.phoneNumber || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-gray-900">
                            {user.address ? `${user.address}, ${user.city} ${user.postalCode}` : 'Not provided'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Member Since</p>
                          <p className="text-gray-900">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-900">Account Status</h3>
                        <p className="text-sm text-blue-700">
                          {user.isActive 
                            ? 'Your account is active and you can use all features.' 
                            : 'Your account is currently inactive. Please contact support if you need assistance.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}