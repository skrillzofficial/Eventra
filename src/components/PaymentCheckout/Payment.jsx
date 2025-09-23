import { useState, useEffect } from "react";
import { ChevronLeft, Clock, Shield, CreditCard, Bitcoin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./../Context/CheckoutContext";
import PaystackPayment from "./PaystackPayment";
import CryptoPayment from "./CryptoPayment";
import PaymentStatus from "./PaymentStatus";

const Payment = () => {
  const navigate = useNavigate();
  const { userDetails, calculateTotal, ticketQuantities, clearCart } = useCheckout();
  
  const [paymentMethod, setPaymentMethod] = useState("paystack"); 
  const [paymentStatus, setPaymentStatus] = useState("idle"); 
  const [timeLeft, setTimeLeft] = useState(600); 

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || paymentStatus === "success") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, paymentStatus]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentStatus("success");
    clearCart(); 
  };

  const handlePaymentError = (error) => {
    setPaymentStatus("error");
    console.error("Payment error:", error);
  };

  const orderSummary = {
    total: calculateTotal(),
    currency: "USD",
    tickets: ticketQuantities,
    userEmail: userDetails.email,
    userName: `${userDetails.firstName} ${userDetails.lastName}`
  };

  if (paymentStatus === "success") {
    return <PaymentStatus type="success" orderData={orderSummary} />;
  }

  if (paymentStatus === "error") {
    return (
      <PaymentStatus 
        type="error" 
        onRetry={() => setPaymentStatus("idle")} 
        orderData={orderSummary}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/checkout/two")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-1">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Payment</h1>
            <div className="flex items-center text-red-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4 p-4 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-blue-800 text-sm">
                  Complete your payment within {formatTime(timeLeft)} to secure your tickets
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Payment Method
              </h2>

              {/* Payment Method Selection */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Paystack Option */}
                  <button
                    onClick={() => setPaymentMethod("paystack")}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      paymentMethod === "paystack"
                        ? "border-[#006F6A] bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <CreditCard className="h-6 w-6 text-[#006F6A] mr-2" />
                      <span className="font-semibold">Pay with Naira</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Secure payment via Paystack (NGN)
                    </p>
                  </button>

                  {/* Crypto Option */}
                  <button
                    onClick={() => setPaymentMethod("crypto")}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      paymentMethod === "crypto"
                        ? "border-[#006F6A] bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Bitcoin className="h-6 w-6 text-orange-500 mr-2" />
                      <span className="font-semibold">Pay with Crypto</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Bitcoin, Ethereum, USDT, USDC
                    </p>
                  </button>
                </div>
              </div>

              {/* Payment Component */}
              {paymentMethod === "paystack" ? (
                <PaystackPayment
                  orderSummary={orderSummary}
                  userDetails={userDetails}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              ) : (
                <CryptoPayment
                  orderSummary={orderSummary}
                  userDetails={userDetails}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    Your payment is secure and encrypted. We do not store your payment details.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                RAVECULTION
              </h3>

              <div className="space-y-3 mb-6">
                {ticketQuantities.regular > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{ticketQuantities.regular} x Regular</span>
                    <span>$ {ticketQuantities.regular}</span>
                  </div>
                )}
                {ticketQuantities.vip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{ticketQuantities.vip} x VIP</span>
                    <span>$ {ticketQuantities.vip}</span>
                  </div>
                )}
                {ticketQuantities.vvip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{ticketQuantities.vvip} x VVIP</span>
                    <span>$ {ticketQuantities.vvip}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                  <span>Fee</span>
                  <span>$ 5</span>
                </div>

                <div className="flex justify-between text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>$ {calculateTotal() - 5}</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-6">
                Discount codes are now added at payment step.
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>TOTAL</span>
                  <span>$ {calculateTotal()}</span>
                </div>
                {paymentMethod === "paystack" && (
                  <div className="text-sm text-gray-600 mt-1">
                    ≈ ₦{(calculateTotal() * 1600).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Contact Info Summary */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-sm mb-2">Contact Information</h4>
                <p className="text-sm text-gray-600">
                  {userDetails.firstName} {userDetails.lastName}
                </p>
                <p className="text-sm text-gray-600">{userDetails.email}</p>
                <p className="text-sm text-gray-600">{userDetails.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;