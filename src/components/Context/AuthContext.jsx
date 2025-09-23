import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        // Verify token is still valid with backend
        const response = await fetch(
          "https://ecommerce-backend-tb8u.onrender.com/api/v1/verify-token",
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const user = JSON.parse(userData);
          setUser(user);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, logout user
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // On network errors, use local storage data as fallback
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } catch (parseError) {
          logout();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce-backend-tb8u.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Ensure user data has onboardingCompleted field
        const userData = {
          ...data.user,
          onboardingCompleted: data.user.onboardingCompleted || false
        };

        // Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log("Login successful - onboarding status:", userData.onboardingCompleted);
        
        return { 
          success: true, 
          data: userData
        };
      } else {
        return { 
          success: false, 
          error: data.message || data.error || "Login failed" 
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: "Network error. Please try again." 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce-backend-tb8u.onrender.com/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // New users typically haven't completed onboarding
        const userData = {
          ...data.user,
          onboardingCompleted: data.user.onboardingCompleted || false
        };

        // Auto-login after registration
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { 
          success: true, 
          data: userData
        };
      } else {
        return { 
          success: false, 
          error: data.message || data.error || "Registration failed" 
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: "Network error. Please try again." 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}