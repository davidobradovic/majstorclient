import AuthService from './AuthService';

const API_BASE_URL = 'https://trebami.betcoresolutions.com/api';

class ApiService {
  // Generic API request method
  static async makeRequest(endpoint, method = 'GET', body = null, requiresAuth = true) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (requiresAuth) {
        const authHeaders = await AuthService.getAuthHeaders();
        Object.assign(headers, authHeaders);
        
        // Check if token is missing
        if (requiresAuth && !authHeaders.Authorization) {
          console.error('Authentication required but no token found');
          return {
            success: false,
            message: 'Authentication required',
            status: 401,
          };
        }
      }

      const options = {
        method,
        headers,
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(body);
      }

      console.log(`Making ${method} request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      
      // Handle non-JSON responses
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        console.error(`API Error ${response.status}:`, data);
      }

      return {
        success: response.ok,
        data: data,
        status: response.status,
        message: data.message || (response.ok ? 'Success' : 'Request failed'),
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        message: 'Network or server error',
        error: error.message,
      };
    }
  }

  // Advertisement/Banner endpoints
  static async getActiveBanners() {
    return await this.makeRequest('/advertisements/active', 'GET', null, false);
  }

  static async recordBannerImpression(bannerId) {
    return await this.makeRequest(`/advertisements/${bannerId}/impression`, 'POST', null, false);
  }

  static async recordBannerClick(bannerId) {
    return await this.makeRequest(`/advertisements/${bannerId}/click`, 'POST', null, false);
  }

  // Worker endpoints
  static async getAllWorkers() {
    return await this.makeRequest('/workers', 'GET', null, false);
  }

  static async getWorkerById(workerId) {
    return await this.makeRequest(`/workers/${workerId}`, 'GET', null, false);
  }

  static async getNearbyWorkers(latitude, longitude, radius = 10) {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
      radius: radius.toString(),
    });
    return await this.makeRequest(`/workers/nearby?${params}`, 'GET', null, false);
  }

  // Order endpoints
  static async getAllOrders() {
    return await this.makeRequest('/orders', 'GET');
  }

  static async getOrderById(orderId) {
    return await this.makeRequest(`/orders/${orderId}`, 'GET');
  }

  static async getOrdersByCustomer(customerId) {
    return await this.makeRequest(`/orders/customer/${customerId}`, 'GET');
  }

  static async getOrdersByWorker(workerId) {
    return await this.makeRequest(`/orders/worker/${workerId}`, 'GET');
  }

  static async createOrder(orderData) {
    return await this.makeRequest('/orders', 'POST', orderData);
  }

  static async updateOrder(orderId, orderData) {
    return await this.makeRequest(`/orders/${orderId}`, 'PUT', orderData);
  }

  static async updateOrderStatus(orderId, status) {
    return await this.makeRequest(`/orders/${orderId}/status`, 'POST', { status });
  }

  static async getOrderByNumber(orderNumber) {
    return await this.makeRequest(`/orders/number/${orderNumber}`, 'GET');
  }

  // Message endpoints
  static async getAllMessages() {
    return await this.makeRequest('/messages', 'GET');
  }

  static async getMessageById(messageId) {
    return await this.makeRequest(`/messages/${messageId}`, 'GET');
  }

  static async getMessagesByOrder(orderId) {
    return await this.makeRequest(`/messages/order/${orderId}`, 'GET');
  }

  static async getConversation(userId1, userId2) {
    const params = new URLSearchParams({
      user1: userId1.toString(),
      user2: userId2.toString(),
    });
    return await this.makeRequest(`/messages/conversation?${params}`, 'GET');
  }

  static async getUnreadCount(userId) {
    return await this.makeRequest(`/messages/user/${userId}/unread-count`, 'GET');
  }

  static async createMessage(messageData) {
    return await this.makeRequest('/messages', 'POST', messageData);
  }

  static async updateMessage(messageId, messageData) {
    return await this.makeRequest(`/messages/${messageId}`, 'PUT', messageData);
  }

  static async markMessageAsRead(messageId) {
    return await this.makeRequest(`/messages/${messageId}/read`, 'POST');
  }

  static async markAllMessagesAsRead(userId) {
    return await this.makeRequest('/messages/read-all', 'POST', { userId });
  }

  static async deleteMessage(messageId) {
    return await this.makeRequest(`/messages/${messageId}`, 'DELETE');
  }

  // Category endpoints (already implemented in AuthContext)
  static async getCategories() {
    return await this.makeRequest('/categories', 'GET', null, false);
  }

  static async getSubcategories(categoryId) {
    return await this.makeRequest(`/subcategories/category/${categoryId}`, 'GET', null, false);
  }

  // User endpoints
  static async getUserById(userId) {
    return await this.makeRequest(`/users/${userId}`, 'GET');
  }

  static async updateUser(userId, userData) {
    return await this.makeRequest(`/users/${userId}`, 'PUT', userData);
  }

  // Dashboard/Statistics endpoints
  static async getDashboardStats() {
    return await this.makeRequest('/dashboard/stats', 'GET');
  }

  static async getOrderStats() {
    return await this.makeRequest('/orders/stats/overview', 'GET');
  }

  static async getMessageStats() {
    return await this.makeRequest('/messages/stats/overview', 'GET');
  }

  static async getWorkerStats() {
    return await this.makeRequest('/workers/stats/overview', 'GET');
  }

  static async getAdvertisementStats() {
    return await this.makeRequest('/advertisements/stats/overview', 'GET');
  }

  // Upload endpoints
  static async uploadFile(fileData, fileType = 'image') {
    try {
      const token = await AuthService.getToken();
      const formData = new FormData();
      formData.append('file', fileData);
      formData.append('type', fileType);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data,
        status: response.status,
        message: data.message || (response.ok ? 'File uploaded successfully' : 'Upload failed'),
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        message: 'Upload failed',
        error: error.message,
      };
    }
  }

  // Helper method to handle API responses consistently
  static handleResponse(response, successMessage = 'Operation successful') {
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message || successMessage,
      };
    } else {
      return {
        success: false,
        message: response.message || 'Operation failed',
        error: response.error,
      };
    }
  }

  // Helper method to format error messages
  static formatErrorMessage(error, defaultMessage = 'Something went wrong') {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    if (error?.data?.message) {
      return error.data.message;
    }
    
    return defaultMessage;
  }
}

export default ApiService;
