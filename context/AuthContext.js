import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import ApiService from "../services/ApiService";

// Create authentication context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([])
  const [bookings, setBookings] = useState([])
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState({});

  const fetchProfileData = async (id) => {
    try {
      setApiLoading(true);
      const response = await ApiService.getUserById(id);
      if (response.success) {
        setProfile(response.data);
      } else {
        console.log('Profile fetch failed:', response.message);
        setProfile([]);
        setError(response.message);
      }
    } catch (err) {
      console.log('Profile fetch error:', err);
      setProfile([]);
      setError('Failed to fetch profile data');
    } finally {
      setApiLoading(false);
    }
  };

  const fetchBookings = async (id) => {
    // Prevent spam fetching - check if already loading
    if (apiLoading) {
      console.log('Bookings fetch already in progress, skipping');
      return;
    }
    
    // Cooldown period for failed requests (5 seconds)
    const now = Date.now();
    const lastFetch = lastFetchTime.bookings || 0;
    if (now - lastFetch < 5000) {
      console.log('Bookings fetch on cooldown, skipping');
      return;
    }
    
    try {
      setApiLoading(true);
      setLastFetchTime(prev => ({ ...prev, bookings: now }));
      console.log('Fetching bookings for customer ID:', id);
      const response = await ApiService.getOrdersByCustomer(id);
      if (response.success) {
        const bookingsData = Array.isArray(response.data) ? response.data : [];
        setBookings(bookingsData);
        console.log('Bookings fetched successfully:', bookingsData.length, 'bookings');
      } else {
        console.log('Bookings fetch failed:', response.message, 'Status:', response.status);
        setBookings([]);
        setError(response.message);
      }
    } catch (err) {
      console.log('Bookings fetch error:', err);
      setBookings([]);
      setError('Failed to fetch bookings');
    } finally {
      setApiLoading(false);
    }
  };

  const statusFormatter = (status) => {
    switch (status) {
      case "inProgress":
        return { text: "U toku", color: "#FFA500" }; // orange
      case "requested":
        return { text: "Zatraženo", color: "#4ade80" }; // green
      case "accepted":
        return { text: "Prihvaćeno", color: "#28A745" }; // green
      case "rejected":
        return { text: "Odbijeno", color: "#DC3545" }; // red
      case "cancelled":
        return { text: "Otkazano", color: "#DC3545" }; // gray
      case "completed":
        return { text: "Završeno", color: "#20C997" }; // teal
      default:
        return { text: status, color: "#000000" }; // fallback: black
    }
  };
  
  
  // Initialize the auth state when app loads
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First, try to get user data from storage
        const userDataString = await AuthService.getUserData();
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser(userData);
        }

        // Then check if token is valid
        const authenticated = await AuthService.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated && userDataString) {
          // User is authenticated and we have user data
          const userData = JSON.parse(userDataString);
          console.log('User authenticated on app start:', userData);
          console.log('User ID:', userData.id, 'User role:', userData.role);
        } else if (authenticated && !userDataString) {
          // Token is valid but no user data, clear auth state
          console.log('Token valid but no user data, clearing auth state');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  
  const fetchCategories = useCallback(async () => {
    try {
      setApiLoading(true);
      const response = await ApiService.getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        console.log('Categories fetch failed:', response.message);
        setCategories([]);
        setError(response.message);
      }
    } catch (err) {
      console.log('Categories fetch error:', err);
      setCategories([]);
      setError('Failed to fetch categories');
    } finally {
      setApiLoading(false);
    }
  }, []);
  
  // Fetch banners
  const fetchBanners = useCallback(async () => {
    try {
      setApiLoading(true);
      const response = await ApiService.getActiveBanners();
      if (response.success) {
        setBanners(response.data);
      } else {
        console.log('Banners fetch failed:', response.message);
        setBanners([]);
        setError(response.message);
      }
    } catch (err) {
      console.log('Banners fetch error:', err);
      setBanners([]);
      setError('Failed to fetch banners');
    } finally {
      setApiLoading(false);
    }
  }, []);

  // Fetch workers
  const fetchWorkers = useCallback(async () => {
    try {
      setApiLoading(true);
      const response = await ApiService.getAllWorkers();
      if (response.success) {
        setWorkers(response.data);
      } else {
        console.log('Workers fetch failed:', response.message);
        setWorkers([]);
        setError(response.message);
      }
    } catch (err) {
      console.log('Workers fetch error:', err);
      setWorkers([]);
      setError('Failed to fetch workers');
    } finally {
      setApiLoading(false);
    }
  }, []);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!user?.id) {
      console.log('No user ID, skipping messages fetch');
      return;
    }
    
    // Prevent spam fetching - check if already loading
    if (apiLoading) {
      console.log('Messages fetch already in progress, skipping');
      return;
    }
    
    // Cooldown period for failed requests (5 seconds)
    const now = Date.now();
    const lastFetch = lastFetchTime.messages || 0;
    if (now - lastFetch < 5000) {
      console.log('Messages fetch on cooldown, skipping');
      return;
    }
    
    try {
      setApiLoading(true);
      setLastFetchTime(prev => ({ ...prev, messages: now }));
      console.log('Fetching messages for user:', user.id, 'with role:', user.role);
      const response = await ApiService.getAllMessages();
      if (response.success) {
        const messagesData = Array.isArray(response.data) ? response.data : [];
        setMessages(messagesData);
        console.log('Messages fetched successfully:', messagesData.length, 'messages');
      } else {
        console.log('Messages fetch failed:', response.message, 'Status:', response.status);
        setMessages([]);
        setError(response.message);
      }
    } catch (err) {
      console.log('Messages fetch error:', err);
      setMessages([]);
      setError('Failed to fetch messages');
    } finally {
      setApiLoading(false);
    }
  }, [user?.id, user?.role, apiLoading, lastFetchTime]);

  useEffect(() => {
    fetchCategories();
    fetchBanners();
    fetchWorkers();
  }, [fetchCategories, fetchBanners, fetchWorkers]);


  useEffect(() => {
    if(user && user.isActive) {
      console.log('User is active, fetching data for:', user.id, 'role:', user.role);
      // Add small delay to prevent rapid successive calls
      const timeoutId = setTimeout(() => {
        fetchProfileData(user.id);
        fetchBookings(user.id);
        fetchMessages();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    } else if(user && !user.isActive) {
      console.log('User is not active, skipping data fetch');
    }
  }, [user?.id, user?.isActive, fetchMessages])

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await AuthService.login(email, password);

      if (result.success) {
        setIsAuthenticated(true);
        // If the token response includes user data
        if (result.data.user) {
          console.log('Login successful, user data:', result.data.user);
          console.log('User role:', result.data.user.role);
          setUser(result.data.user);
        } else {
          console.log('Login successful but no user data in response');
        }
        return { success: true };
      } else {
        console.log('Login failed:', result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An unexpected error occurred during login",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
      // Navigation will be handled by the App component
      // based on the isAuthenticated state
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile function
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Check if user has required role
  const hasRole = (requiredRoles) => {
    if (!user || !user.role) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is worker
  const isWorker = () => {
    return hasRole(['worker', 'admin']);
  };

  // Auth context value
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    apiLoading,
    error,
    login,
    logout,
    updateUser,
    hasRole,
    isAdmin,
    isWorker,
    profile,
    bookings,
    statusFormatter,
    categories,
    banners,
    workers,
    messages,
    fetchBanners,
    fetchWorkers,
    fetchMessages,
    fetchCategories,
    fetchProfileData,
    fetchBookings,
    setError
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
