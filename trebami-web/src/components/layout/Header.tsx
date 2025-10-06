'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Orders', href: '/orders', icon: ClipboardDocumentListIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const workerNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Jobs', href: '/jobs', icon: ClipboardDocumentCheckIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const currentNavigation = user?.role === 'worker' ? workerNavigation : userNavigation;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg shadow-blue-500/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center group">
              <div className="h-12 w-12 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="ml-4 text-2xl font-bold text-gradient group-hover:scale-105 transition-all duration-300">
                Trebami
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-6 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 group font-medium"
              >
                <item.icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl p-3 transition-all duration-300 hover:bg-white/50 backdrop-blur-sm"
                >
                  <div className="h-10 w-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">
                      {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-base font-bold">
                      {user.fullName || 'User'}
                    </p>
                    <p className="text-sm text-slate-500 capitalize font-medium">
                      {user.role || 'user'}
                    </p>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-blue-500/10 py-3 z-50 border border-white/20">
                    <div className="px-6 py-4 border-b border-slate-100">
                      <p className="text-base font-bold text-slate-900">
                        {user.fullName || 'User'}
                      </p>
                      <p className="text-sm text-slate-500">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-6 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Cog6ToothIcon className="h-5 w-5 mr-4" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-6 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/50 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {currentNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-4" />
                  {item.name}
                </Link>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 transition-all duration-300 font-medium"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-4" />
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};