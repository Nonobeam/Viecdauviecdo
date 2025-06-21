import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthContext";
import { getUserById } from "@/utils/userApi";
import { useTokenExpiration } from "./useTokenExpiration";

export const useUser = () => {
  const { user, isAuthenticated } = useAuth();
  const { timeUntilExpiration } = useTokenExpiration();
  const [userData, setUserData] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (timeUntilExpiration !== null && timeUntilExpiration <= 0) {
        return;
      }

      if (!isAuthenticated || !user?.user_id) {
        setUserData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getUserById(user.user_id);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error.message || "Failed to fetch user data");

        if (error.status === 401 || error.status === 403) {
          setUserData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.user_id, updated, isAuthenticated, timeUntilExpiration]);

  useEffect(() => {
    if (timeUntilExpiration !== null && timeUntilExpiration <= 0) {
      setUserData(null);
    }
  }, [timeUntilExpiration]);

  return {
    user,
    userData,
    setUserData,
    updated,
    setUpdated,
    loading,
    error,
    isTokenValid: timeUntilExpiration === null || timeUntilExpiration > 0,
  };
};
