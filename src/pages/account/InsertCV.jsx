import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { uploadDocument } from "@/utils/userApi";
import { ArrowLeft, Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InsertCV = () => {
  const [cvFile, setCvFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const { user, loading } = useAuth();
  const fileInputRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(user?.user_id);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setCvFile(file);
      setFileName(file.name);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    setFileName("");
  };

  const handleUpload = async () => {
    if (!cvFile) return;

    // Validate file before upload
    const maxSize = 500 * 1024; // 5MB
    if (cvFile.size > maxSize) {
      setUploadError("File size must be less than 500KB");
      return;
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(cvFile.type)) {
      setUploadError("Only PDF files are allowed");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      console.log(currentUserId);
      await uploadDocument(currentUserId, cvFile);
      setUploadSuccess(true);

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);

      // More detailed error handling
      let errorMessage = "Failed to upload CV. Please try again.";

      if (error.response) {
        console.error("Error response:", error.response.data);

        if (error.response.status === 400) {
          errorMessage =
            error.response.data?.message ||
            "Invalid request. Please check your file and try again.";
        } else if (error.response.status === 401) {
          errorMessage = "Authentication required. Please log in again.";
        } else if (error.response.status === 413) {
          errorMessage = "File is too large. Please choose a smaller file.";
        } else if (error.response.status === 415) {
          errorMessage =
            "File type not supported. Please upload a PDF, DOC, or DOCX file.";
        } else {
          errorMessage = `Upload failed: ${error.response.status} ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.user_id) {
      setCurrentUserId(user.user_id);
    }
  }, [loading, user]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-indigo-600 h-28"></div>

      <div className="max-w-2xl mx-auto -mt-20 bg-white rounded-lg shadow-lg p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/profile">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Profile
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Insert CV</h1>
        </div>

        {/* File Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-400"
          }`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {cvFile ? (
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="bg-green-100 rounded-full p-3 mb-3">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {fileName}
                </p>
                <p className="text-sm text-gray-500">
                  File uploaded successfully
                </p>
              </div>
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">
                Drag and drop your CV file here
              </p>
              <p className="text-sm text-gray-400">or click to select file</p>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, DOC, DOCX
              </p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInputChange}
          />
        </div>

        {/* Additional Information */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Upload Guidelines:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Maximum file size: 500KB</li>
            <li>• Accepted formats: PDF</li>
            <li>• Make sure your CV is up to date and properly formatted</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!cvFile || isUploading || uploadSuccess}
            onClick={handleUpload}
          >
            {isUploading
              ? "Uploading..."
              : uploadSuccess
              ? "Uploaded!"
              : "Upload CV"}
          </Button>
          <Button
            variant="outline"
            disabled={isUploading}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertCV;
