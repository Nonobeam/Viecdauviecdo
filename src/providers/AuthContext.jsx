"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  isTokenExpired,
  getTimeUntilExpiration,
  handleTokenResponse,
} from "@/utils/tokenUtils";
import { storage } from "@/utils/storage";
import { login as apiLogin } from "@/utils/authApi";
import { getUserById } from "@/utils/userApi";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => Promise.resolve({ requiresProfileUpdate: false }),
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const logout = useCallback(async (reason = "manual") => {
    try {
      setLoading(true);

      if (reason === "expired") {
        console.log("Session expired, logging out...");
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      storage.removeUserType();

      if (typeof document !== "undefined") {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      storage.removeUserType();
    } finally {
      setLoading(false);
    }
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && isTokenExpired(storedToken, 5)) {
      console.log("Token expired, logging out...");
      logout("expired");
      return false;
    }
    return true;
  }, [logout]);

  useEffect(() => {
    if (!user) return;

    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    const timeUntilExpiration = getTimeUntilExpiration(storedToken);
    if (!timeUntilExpiration) return;

    const bufferTime = 5 * 60 * 1000;
    if (timeUntilExpiration <= bufferTime) {
      logout("expired");
      return;
    }

    const timeoutId = setTimeout(() => {
      logout("expired");
    }, timeUntilExpiration - bufferTime);

    return () => clearTimeout(timeoutId);
  }, [user, logout]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, checkTokenExpiration]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const storedUserType = storage.getUserType();

        if (storedUser && storedToken) {
          if (isTokenExpired(storedToken, 5)) {
            console.log("Stored token is expired, clearing auth data");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            storage.removeUserType();
            return;
          }

          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email) {
            setUser({
              ...parsedUser,
              userType: storedUserType ? storedUserType.toLowerCase() : "free",
            });
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            storage.removeUserType();
          }
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        storage.removeUserType();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const { token } = await apiLogin({ username: email, password });
      const tokenData = handleTokenResponse(token);

      if (!tokenData) {
        throw new Error("Invalid token response");
      }

      const userData = {
        email: tokenData.email,
        name: tokenData.name,
        id: tokenData.userId,
        user_id: tokenData.userId,
        token,
        userType: tokenData.userType || "free",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      const res = await getUserById(userData.user_id);
      const phone = res?.data?.user_information?.phone_number;

      return {
        requiresProfileUpdate: !phone,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
