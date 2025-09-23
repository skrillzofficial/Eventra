// src/components/Account/Sections/CommunicationPrefs.jsx
import React, { useState } from 'react';
import BaseSection from './BaseSection';
import { accountService } from '../../../services/AccountService';

const CommunicationPrefs = ({ config }) => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePreferenceChange = async (category, type, enabled) => {
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      await accountService.updateCommunicationPrefs({
        [category]: { [type]: enabled }
      }, token);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const preferenceTypes = {
    email: { label: 'Email', description: 'Receive updates via email' },
    sms: { label: 'SMS', description: 'Receive text message notifications' },
    push: { label: 'Push Notifications', description: 'Receive app notifications' }
  };

  return (
    <BaseSection config={config}>
      {({ data }) => (
        <div className="space-y-6">
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800">Preferences updated successfully!</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {config.categories.map((category) => (
              <div key={category} className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4 capitalize">{category} Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(preferenceTypes).map(([type, info]) => (
                    <div key={type} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data?.[category]?.[type] || false}
                          onChange={(e) => handlePreferenceChange(category, type, e.target.checked)}
                          disabled={saving}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006F6A]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              You can control how we communicate with you. Uncheck any options you don't want to receive.
            </p>
          </div>
        </div>
      )}
    </BaseSection>
  );
};

export default CommunicationPrefs;