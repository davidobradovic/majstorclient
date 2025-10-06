'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  SparklesIcon,
  BoltIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<'user' | 'worker'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const role = searchParams.get('role');
    if (role === 'worker' || role === 'user') {
      setUserRole(role);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');
      
      const { confirmPassword, ...registerData } = data;
      await registerUser({
        ...registerData,
        role: userRole,
      });
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join Trebami
          </h2>
          <p className="text-gray-600">
            Create your account and get started
          </p>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={userRole === 'user' ? 'primary' : 'outline'}
                  onClick={() => setUserRole('user')}
                  className="w-full flex items-center justify-center py-3"
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Customer
                </Button>
                <Button
                  variant={userRole === 'worker' ? 'primary' : 'outline'}
                  onClick={() => setUserRole('worker')}
                  className="w-full flex items-center justify-center py-3"
                >
                  <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                  Worker
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Input
                {...register('fullName')}
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.fullName?.message}
                autoComplete="name"
              />

              <Input
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                error={errors.email?.message}
                autoComplete="email"
              />

              <Input
                {...register('phoneNumber')}
                type="tel"
                label="Phone Number (Optional)"
                placeholder="Enter your phone number"
                error={errors.phoneNumber?.message}
                autoComplete="tel"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
                loading={isLoading}
                disabled={isLoading}
              >
                Create Account
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {userRole === 'worker' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Worker Account</p>
                    <p className="text-sm text-blue-700 mt-1">
                      As a worker, you'll need to complete your profile with skills, 
                      experience, and hourly rates after registration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <SparklesIcon className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs text-gray-600">Quality Service</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <BoltIcon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-600">Fast Booking</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <HomeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">Trusted Workers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}