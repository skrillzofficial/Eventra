const API_BASE = "https://ecommerce-backend-tb8u.onrender.com/api/v1/";

const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

const handleAuthError = (error) => {
  console.error("Auth error:", error);
  throw error;
};

export const accountService = {
  // Generic fetch function for user-specific data
  async fetchData(endpoint) {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      return handleAuthError(error);
    }
  },

  // Generic update function for user-specific data
  async updateData(endpoint, data, method = "PUT") {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Update failed: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      return handleAuthError(error);
    }
  },

  // USER-SPECIFIC ENDPOINTS 

  // Get current user's profile
  async getProfile() {
    return this.fetchData("profile");
  },

  // Update current user's profile
  async updateProfile(data) {
    return this.updateData("profile", data, "PATCH");
  },

  // Profile image upload for current user
  async uploadProfileImage(imageFile) {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      // Try different endpoint variations
      const response = await fetch(`${API_BASE}upload-profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Image upload failed: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      return handleAuthError(error);
    }
  },

  // Payment methods for current user
  async getPaymentMethods() {
    return this.fetchData("payment-methods");
  },

  async addPaymentMethod(data) {
    return this.updateData("payment-methods", data, "POST");
  },

  async updatePaymentMethod(id, data) {
    return this.updateData(`payment-methods/${id}`, data, "PUT");
  },

  async deletePaymentMethod(id) {
    return this.updateData(`payment-methods/${id}`, {}, "DELETE");
  },

  // Communication preferences for current user
  async getCommunicationPrefs() {
    return this.fetchData("communication-preferences");
  },

  async updateCommunicationPrefs(data) {
    return this.updateData("communication-preferences", data, "PATCH");
  },

  // Personal data for current user
  async downloadPersonalData() {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }

    try {
      const response = await fetch(`${API_BASE}download-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      return handleAuthError(error);
    }
  },

  // Close current user's account
  async closeAccount(reason) {
    return this.updateData("close-account", { reason }, "DELETE");
  }
};