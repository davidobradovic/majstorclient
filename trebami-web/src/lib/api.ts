import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: number;
  fullName: string | null;
  email: string | null;
  role: 'user' | 'worker' | 'admin' | null;
  phoneNumber?: string | null;
  profileImage?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
  isActive: boolean;
  createdAt?: Date | null;
}

export interface Worker {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  categoryId: number;
  subcategoryId: number;
  location: {
    type: string;
    coordinates: number[];
    address: string;
    city: string;
    postalCode: string;
  };
  ratings: number;
  reviews: number;
  totalJobs: number;
  completedJobs: number;
  hourlyRate: number;
  isAvailable: boolean;
  isVerified: boolean;
  profileImage?: string;
  description?: string;
  skills: string[];
  experience: number;
  education?: string;
  certifications: string[];
  workingHours: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  title: string;
  icon?: string;
  description?: string;
  color?: string;
  isActive: boolean;
  createdAt?: Date;
}

export interface Subcategory {
  id: number;
  title: string;
  categoryId: number;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: number;
  workerId: string;
  categoryId: number;
  subcategoryId: number;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    postalCode: string;
    coordinates: number[];
  };
  scheduledDate: Date;
  scheduledTime: string;
  estimatedDuration: number;
  totalPrice: number;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled' | 'rejected';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'cash' | 'card' | 'bank-transfer';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customerNotes?: string;
  workerNotes?: string;
  images: string[];
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export interface Message {
  _id: string;
  orderId: string;
  senderId: number;
  receiverId: number;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },

  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role?: 'user' | 'worker';
  }) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (id: number, userData: Partial<User>) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// Subcategories API
export const subcategoriesAPI = {
  getByCategory: async (categoryId: number) => {
    const response = await api.get(`/subcategories?categoryId=${categoryId}`);
    return response.data;
  },
};

// Workers API
export const workersAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
    subcategoryId?: number;
    isAvailable?: boolean;
    isVerified?: boolean;
  }) => {
    const response = await api.get('/workers', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/workers/${id}`);
    return response.data;
  },

  getNearby: async (longitude: number, latitude: number, maxDistance = 10000) => {
    const response = await api.get('/workers/nearby', {
      params: { longitude, latitude, maxDistance }
    });
    return response.data;
  },

  create: async (workerData: Partial<Worker>) => {
    const response = await api.post('/workers', workerData);
    return response.data;
  },

  update: async (id: string, workerData: Partial<Worker>) => {
    const response = await api.put(`/workers/${id}`, workerData);
    return response.data;
  },

  toggleAvailability: async (id: string) => {
    const response = await api.patch(`/workers/${id}/availability`);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    customerId?: number;
    workerId?: string;
    categoryId?: number;
    subcategoryId?: number;
  }) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  getByOrderNumber: async (orderNumber: string) => {
    const response = await api.get(`/orders/number/${orderNumber}`);
    return response.data;
  },

  create: async (orderData: Partial<Order>) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  update: async (id: string, orderData: Partial<Order>) => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  },

  updateStatus: async (id: string, status: string, notes?: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status, notes });
    return response.data;
  },

  getByCustomer: async (customerId: number, params?: { page?: number; limit?: number; status?: string }) => {
    const response = await api.get(`/orders/customer/${customerId}`, { params });
    return response.data;
  },

  getByWorker: async (workerId: string, params?: { page?: number; limit?: number; status?: string }) => {
    const response = await api.get(`/orders/worker/${workerId}`, { params });
    return response.data;
  },
};

// Messages API
export const messagesAPI = {
  getByOrder: async (orderId: string) => {
    const response = await api.get(`/messages/order/${orderId}`);
    return response.data;
  },

  send: async (messageData: {
    orderId: string;
    receiverId: number;
    message: string;
  }) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  markAsRead: async (messageId: string) => {
    const response = await api.patch(`/messages/${messageId}/read`);
    return response.data;
  },
};

export default api;