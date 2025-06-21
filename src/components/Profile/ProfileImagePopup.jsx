"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, User } from "lucide-react";
import { useRef } from "react";

const ProfileImagePopup = ({
  isOpen,
  onClose,
  userData,
  onAvatarChange,
  isOwner = false,
}) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-md p-0 bg-white rounded-2xl shadow-2xl border-0">
          {/* Profile Image Display */}
          <div className="relative">
            <div className="aspect-square w-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-2xl overflow-hidden">
              {userData?.image ? (
                <img
                  src={userData.image || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-24 w-24 text-purple-400" />
                </div>
              )}
            </div>

            {/* Overlay with user info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold">
                {userData?.full_name || "User"}
              </h3>
              <p className="text-sm opacity-90">
                {userData?.job_title || "Professional"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-2">
            {isOwner && (
              <>
                <Button
                  onClick={handleUploadClick}
                  className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Camera className="h-4 w-4 mr-3" />
                  Thay đổi ảnh đại diện
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ProfileImagePopup;
