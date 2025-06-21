"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { useTokenExpiration } from "@/hooks/useTokenExpiration";

const TokenExpirationWarning = () => {
  const { logout, refreshToken } = useAuth();
  const { timeUntilExpiration, isExpiringSoon, formattedTimeUntilExpiration } =
    useTokenExpiration();
  const [showDialog, setShowDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show dialog when token is expiring soon (10 minutes)
    if (isExpiringSoon && timeUntilExpiration > 0) {
      setShowDialog(true);
    }

    // Auto logout when token expires
    if (timeUntilExpiration !== null && timeUntilExpiration <= 0) {
      handleLogout();
    }
  }, [isExpiringSoon, timeUntilExpiration]);

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      if (refreshToken) {
        await refreshToken();
        setShowDialog(false);
      } else {
        // If no refresh token function, redirect to login
        handleLogout();
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      handleLogout();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", {
      state: {
        message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      },
    });
  };

  const handleContinueSession = () => {
    setShowDialog(false);
    // Optionally refresh token automatically
    handleRefreshToken();
  };

  // Show warning banner when expiring soon but not critical
  if (isExpiringSoon && timeUntilExpiration > 300000 && !showDialog) {
    // 5 minutes
    return (
      <Alert className="mb-4 border-yellow-200 bg-yellow-50">
        <Clock className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Phiên đăng nhập sẽ hết hạn trong {formattedTimeUntilExpiration}.{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-yellow-800 underline"
            onClick={handleRefreshToken}
          >
            Gia hạn ngay
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Dialog open={showDialog} onOpenChange={() => {}}>
      <DialogContent className="max-w-md bg-white" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Phiên đăng nhập sắp hết hạn
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-600">
            Phiên đăng nhập của bạn sẽ hết hạn trong{" "}
            <span className="font-semibold text-orange-600">
              {formattedTimeUntilExpiration}
            </span>
            . Bạn có muốn tiếp tục sử dụng?
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleContinueSession}
              disabled={isRefreshing}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Đang gia hạn...
                </>
              ) : (
                "Tiếp tục"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isRefreshing}
              className="flex-1"
            >
              Đăng xuất
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Nếu không có hành động, bạn sẽ được tự động đăng xuất khi phiên hết
            hạn.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenExpirationWarning;
