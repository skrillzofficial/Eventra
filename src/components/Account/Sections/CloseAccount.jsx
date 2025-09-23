// src/components/Account/Sections/CloseAccount.jsx
import React, { useState } from 'react';
import { AlertTriangle, LogOut } from 'lucide-react';
import BaseSection from './BaseSection';
import { accountService } from '../../../services/AccountService';
import { useAuth } from '../../Context/AuthContext';

const CloseAccount = ({ config }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reason, setReason] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const handleCloseAccount = async () => {
    if (!reason.trim()) {
      setError('Please provide a reason for closing your account');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      await accountService.closeAccount(reason, token);
      
      // Logout user after account closure
      logout();
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-900 mb-2">Close Your Account?</h3>
          <p className="text-red-700 mb-4">{config.confirmationText}</p>
          
          {error && (
            <div className="bg-red-100 border border-red-300 rounded-md p-3 mb-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-red-700 mb-2">
                Reason for closing account *
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please tell us why you're closing your account..."
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCloseAccount}
                disabled={processing}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{processing ? 'Closing...' : 'Yes, Close Account'}</span>
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={processing}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BaseSection config={config}>
      {() => (
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">Close Account</h3>
                <p className="text-red-700 mb-4">
                  Closing your account is permanent and cannot be undone. All your data, 
                  including event bookings, preferences, and personal information will be 
                  permanently deleted.
                </p>
                
                <ul className="text-red-700 space-y-2 mb-6">
                  <li>• All your event tickets and bookings will be cancelled</li>
                  <li>• Your personal data will be permanently deleted</li>
                  <li>• This action cannot be reversed</li>
                  <li>• You will need to create a new account to use our services again</li>
                </ul>

                <button
                  onClick={() => setShowConfirmation(true)}
                  className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Close My Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseSection>
  );
};

export default CloseAccount;