import React, { useState } from 'react'
import Nav from "../Nav";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { menuItems } from './../Data/daTa'; 
import { useAuth } from '../Context/AuthContext'; 

const Account = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(menuItems[0]);
  const { user, updateUser, loading } = useAuth();

  // Prefill form data from AuthContext
  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.name?.split(' ')[0] || '',
    lastName: user?.lastName || user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || user?.phoneNumber || ''
  });

  const handleMenuSelect = (item) => {
    setActiveSection(item);
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Update user data in context and localStorage
      await updateUser(formData);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    setFormData({
      firstName: user?.firstName || user?.name?.split(' ')[0] || '',
      lastName: user?.lastName || user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || user?.phoneNumber || ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen AboutHeroimg py-8">
        <nav className='AboutHeroimg'>
          <Nav/>
        </nav>
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-96">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen AboutHeroimg py-8">
      <nav className='AboutHeroimg'>
        <Nav/>
      </nav>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {/* Mobile Dropdown */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between"
              >
                <span className="font-medium text-gray-700">{activeSection}</span>
                {isMobileMenuOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
              </button>
              
              {isMobileMenuOpen && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-1">
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {menuItems.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleMenuSelect(item)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              activeSection === item
                                ? 'bg-[#006F6A] text-white font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            } ${item === 'Close Account' ? 'text-red-600 hover:bg-red-50' : ''}`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => setActiveSection(item)}
                          className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                            activeSection === item
                              ? 'bg-[#006F6A] text-white font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          } ${item === 'Close Account' ? 'text-red-600 hover:bg-red-50' : ''}`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{activeSection}</h2>
              
              {activeSection === 'Contact Info' && (
                <>
                  {/* Profile Picture Upload */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="max-w-xs mx-auto">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Drag and drop or choose a file to upload</p>
                        <button className="mt-4 bg-[#006F6A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#005a55] transition-colors">
                          Choose File
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A]"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A]"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A]"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A]"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button 
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveChanges}
                        className="px-6 py-2 bg-[#006F6A] text-white rounded-md hover:bg-[#005a55] transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Other Sections */}
              {activeSection !== 'Contact Info' && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{activeSection} section content will be displayed here.</p>
                  <p className="text-gray-400 text-sm mt-2">This is a placeholder for the {activeSection.toLowerCase()} functionality.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account