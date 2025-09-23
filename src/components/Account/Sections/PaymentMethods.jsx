// src/components/Account/Sections/PaymentMethods.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, CreditCard } from 'lucide-react';
import BaseSection from './BaseSection';
import { accountService } from '../../../services/AccountService';

const PaymentMethods = ({ config }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      await accountService.addPaymentMethod(formData, token);
      setShowAddForm(false);
      setFormData({});
      // BaseSection will automatically refetch data
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment method?')) return;

    try {
      const token = localStorage.getItem('token');
      await accountService.deletePaymentMethod(id, token);
      // BaseSection will automatically refetch data
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BaseSection config={config}>
      {({ data, fetchData }) => (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Add New Card Form */}
          {showAddForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Add New Card</h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="px-3 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="px-3 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-3 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-[#006F6A] text-white px-4 py-2 rounded-md disabled:opacity-50"
                  >
                    Add Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Payment Methods List */}
          <div className="space-y-4">
            {data?.paymentMethods?.map((method) => (
              <div key={method.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">**** **** **** {method.last4}</p>
                    <p className="text-sm text-gray-600">{method.brand} • Expires {method.exp_month}/{method.exp_year}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(method.id)}
                    className="p-2 text-gray-600 hover:text-[#006F6A]"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {(!data?.paymentMethods || data.paymentMethods.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No payment methods added yet</p>
              </div>
            )}
          </div>

          {/* Add New Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 text-[#006F6A] hover:text-[#005a55]"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Payment Method</span>
            </button>
          )}
        </div>
      )}
    </BaseSection>
  );
};

export default PaymentMethods;