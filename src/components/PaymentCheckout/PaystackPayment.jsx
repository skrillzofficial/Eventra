import { useState } from "react";
import { CreditCard, Mail, AlertCircle } from "lucide-react";

const PaystackPayment = ({ orderSummary, userDetails, onSuccess, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const handlePaystackPayment = () => {
    // Validate required fields
    if (!userDetails.email) {
      onError("Email address is required");
      return;
    }

    if (!userDetails.firstName || !userDetails.lastName) {
      onError("Full name is required");
      return;
    }

    // Check if Paystack key is configured
    const paystackKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
    if (!paystackKey || paystackKey === 'pk_test_...' || paystackKey === 'pk_live_...') {
      onError("Payment configuration error. Please contact support.");
      return;
    }

    setIsProcessing(true);
    
    // Check if Paystack is loaded
    if (typeof window.PaystackPop === 'undefined') {
      setIsProcessing(false);
      onError("Payment service loading failed. Please refresh the page.");
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: userDetails.email,
        amount: orderSummary.total * 100, // Convert to kobo
        currency: "NGN",
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: `${userDetails.firstName} ${userDetails.lastName}`,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: userDetails.phone || "",
            },
          ],
          order_id: `RAVE-${Date.now()}`,
          discount_code: discountCode,
          event_name: "RAVECULTION",
        },
        callback: function (response) {
          setIsProcessing(false);
          console.log("Payment successful:", response);
          onSuccess({
            method: "paystack",
            reference: response.reference,
            amount: orderSummary.total,
            currency: "NGN",
            transaction_id: response.transaction,
          });
        },
        onClose: function () {
          setIsProcessing(false);
          onError("Payment was cancelled");
        },
      });
      
      handler.openIframe();
    } catch (error) {
      setIsProcessing(false);
      console.error("Paystack error:", error);
      onError("Payment initialization failed. Please try again.");
    }
  };

  // Debug info (remove in production)
  const isTestKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY?.startsWith('pk_test');

  return (
    <div className="space-y-6">
      {/* Debug info - remove in production */}
      {isTestKey && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">TEST MODE</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            Using Paystack test environment. Use test card: 4123450131001381
          </p>
        </div>
      )}

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-green-600 mr-2" />
          <span className="font-medium text-green-800">Secure Naira Payment</span>
        </div>
        <p className="text-sm text-green-700 mt-1">
          You will be redirected to Paystack for secure payment processing.
        </p>
      </div>

      {/* Discount Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount Code (Optional)
        </label>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A]"
          placeholder="Enter discount code"
        />
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Amount in USD:</span>
          <span className="font-semibold">$ {orderSummary.total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Amount in Naira:</span>
          <span className="font-semibold">
            ₦{(orderSummary.total * 1600).toLocaleString()}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Exchange rate: $1 ≈ ₦1,600
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePaystackPayment}
        disabled={isProcessing || !userDetails.email}
        className="w-full bg-[#006F6A] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#005a55] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Initializing Payment...
          </>
        ) : (
          `Pay ₦${(orderSummary.total * 1600).toLocaleString()}`
        )}
      </button>

      <div className="flex items-center text-sm text-gray-600">
        <Mail className="h-4 w-4 mr-2" />
        <span>Tickets will be sent to: {userDetails.email}</span>
      </div>
    </div>
  );
};

export default PaystackPayment;