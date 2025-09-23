import { CheckCircle, XCircle, ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentStatus = ({ type, onRetry, orderData }) => {
  const navigate = useNavigate();

  if (type === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your tickets for <strong>RAVECULTION</strong> have been confirmed.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-600 mb-2">Order Total</div>
            <div className="text-2xl font-bold text-gray-900">
              ${orderData.total}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Confirmation sent to: {orderData.userEmail}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#006F6A] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#005a55] transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.print()}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-semibold hover:bg-gray-50 transition-colors"
            >
              Print Tickets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          There was an issue processing your payment. Please try again.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-[#006F6A] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#005a55] transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/checkout/two")}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;