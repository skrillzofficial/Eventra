// src/components/Account/Sections/BaseSection.jsx
import React, { useState, useEffect } from 'react';
import { accountService } from '../../../services/AccountService';
import { useAuth } from '../../Context/AuthContext';

const BaseSection = ({ config, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [config.apiEndpoint]);

  const fetchData = async () => {
    if (!config.apiEndpoint) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Use the appropriate service method based on endpoint
      let result;
      switch (config.apiEndpoint) {
        case 'profile':
          result = await accountService.getProfile();
          break;
        case 'payment-methods':
          result = await accountService.getPaymentMethods();
          break;
        case 'communication-preferences':
          result = await accountService.getCommunicationPrefs();
          break;
        case 'linked-accounts':
          result = await accountService.getLinkedAccounts();
          break;
        default:
          // Fallback to generic fetch for custom endpoints
          result = await accountService.fetchData(config.apiEndpoint);
      }
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#006F6A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error: {error}</p>
        <button 
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return children({ data, fetchData, user });
};

export default BaseSection;