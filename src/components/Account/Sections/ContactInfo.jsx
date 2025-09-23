import React, { useState, useEffect } from "react";
import BaseSection from "./BaseSection";
import { accountService } from "../../../services/AccountService";
import { useAuth } from "../../Context/AuthContext";

const ContactInfoContent = ({ data, user, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { updateUser, isAuthenticated } = useAuth();

  // Initialize form data with user details
  useEffect(() => {
    if (isAuthenticated && user) {
      const initialData = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        profileImage: user?.profileImage || "",
      };
      
      setFormData(initialData);
      
      // Set image preview if profile image exists
      if (user?.profileImage) {
        setImagePreview(user.profileImage);
      }
    }
  }, [user, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setSaveError('Please login to update your profile');
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      // If there's a new image file, upload it first
      let imageUrl = formData.profileImage;
      if (imageFile) {
        const imageResult = await accountService.uploadProfileImage(imageFile);
        imageUrl = imageResult.imageUrl || imageResult.url; 
      }

      // Update profile with form data including the image URL
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        profileImage: imageUrl
      };

      const result = await accountService.updateProfile(updateData);
      
      // Update user context with new data
      updateUser(updateData);
      setSaveSuccess(true);
      setIsEditing(false);
      setImageFile(null);
      
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Refresh data if onUpdate callback is provided
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      setSaveError(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveError('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveError('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      setSaveError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({
      ...formData,
      profileImage: ""
    });
  };

  const handleCancel = () => {
    // Reset form data to original user values
    const originalData = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      profileImage: user?.profileImage || "",
    };
    
    setFormData(originalData);
    setImagePreview(user?.profileImage || null);
    setImageFile(null);
    setIsEditing(false);
    setSaveError(null);
  };

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-8">
          <p className="text-gray-600">Please log in to view your contact information.</p>
        </div>
      </div>
    );
  }

  // Display user information when not editing
  if (!isEditing) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-800">Profile updated successfully!</p>
          </div>
        )}

        {/* User Information Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          
          {/* Profile Image Display */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={formData.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {formData.firstName} {formData.lastName}
              </h4>
              <p className="text-gray-600">{formData.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">First Name</label>
              <p className="text-gray-900 mt-1">{formData.firstName || "Not provided"}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Last Name</label>
              <p className="text-gray-900 mt-1">{formData.lastName || "Not provided"}</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <p className="text-gray-900 mt-1">{formData.email || "Not provided"}</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900 mt-1">{formData.phone || "Not provided"}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-[#006F6A] text-white rounded-md hover:bg-[#005a55] transition-colors"
            >
              Edit Information
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit Form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">Error: {saveError}</p>
        </div>
      )}

      {/* Profile Image Upload */}
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={imagePreview || formData.profileImage || "/default-avatar.png"}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            {(imagePreview || formData.profileImage) && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                title="Remove image"
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={saving}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#006F6A] file:text-white hover:file:bg-[#005a55] disabled:opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            required
            disabled={saving}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            required
            disabled={saving}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] disabled:bg-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            disabled={saving}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] disabled:bg-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={saving}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#006F6A] text-white rounded-md hover:bg-[#005a55] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

const ContactInfo = ({ config, user }) => {
  return (
    <BaseSection config={config}>
      {({ data, fetchData }) => (
        <ContactInfoContent data={data} user={user} onUpdate={fetchData} />
      )}
    </BaseSection>
  );
};

export default ContactInfo;