import { Button } from '@/components/ui';
import { useAuth } from '@/providers/AuthContext';
import { changeUserInformation } from '@/utils/userApi';
import { AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
const navigate = useNavigate();
  const { user } = useAuth();

  // form state
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      await changeUserInformation(user.user_id, {
        full_name: fullName,
        job_tittle: jobTitle,
        about_me: aboutMe,
        location: location,
        phone: phone,
      });
      setSaveSuccess(true);
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      console.error(err);
      setSaveError('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
        <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-indigo-600 h-28"></div>

      <div className="max-w-2xl mx-auto -mt-20 bg-white rounded-lg shadow-lg p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/profile">
            <Button variant="outline" className="flex items-center gap-2 mb-4 hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4" />
              Go to Profile
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-red-800">{saveError}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-800">Profile saved! Redirecting...</p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">About Me</label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isSaving || saveSuccess}
          >
            {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Profile'}
          </Button>
          <Button
            variant="outline"
            disabled={isSaving}
            onClick={() => navigate('/profile')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
