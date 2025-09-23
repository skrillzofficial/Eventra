// src/components/Account/Sections/LinkedAccounts.jsx
import React, { useState } from 'react';
import { Link, Unlink } from 'lucide-react';
import BaseSection from './BaseSection';
import { accountService } from '../../../services/AccountService';

const LinkedAccounts = ({ config }) => {
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState(null);

  const handleLink = async (provider) => {
    setProcessing(provider);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      await accountService.linkAccount(provider, token);
      // BaseSection will refetch data
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const handleUnlink = async (provider) => {
    if (!window.confirm(`Are you sure you want to unlink your ${provider} account?`)) return;

    setProcessing(provider);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      await accountService.unlinkAccount(provider, token);
      // BaseSection will refetch data
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const providers = {
    google: { name: 'Google', color: 'bg-red-500' },
    facebook: { name: 'Facebook', color: 'bg-blue-600' },
    apple: { name: 'Apple', color: 'bg-black' }
  };

  return (
    <BaseSection config={config}>
      {({ data }) => (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {config.providers.map((provider) => {
              const isLinked = data?.linkedAccounts?.includes(provider);
              const providerInfo = providers[provider];

              return (
                <div key={provider} className="border rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${providerInfo.color} flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">
                        {providerInfo.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{providerInfo.name}</p>
                      <p className="text-sm text-gray-600">
                        {isLinked ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  
                  {isLinked ? (
                    <button
                      onClick={() => handleUnlink(provider)}
                      disabled={processing === provider}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <Unlink className="h-4 w-4" />
                      <span>Unlink</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLink(provider)}
                      disabled={processing === provider}
                      className="flex items-center space-x-2 text-[#006F6A] hover:text-[#005a55] disabled:opacity-50"
                    >
                      <Link className="h-4 w-4" />
                      <span>Link</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-blue-800 text-sm">
              Linking accounts allows you to sign in faster and share information across platforms.
            </p>
          </div>
        </div>
      )}
    </BaseSection>
  );
};

export default LinkedAccounts;