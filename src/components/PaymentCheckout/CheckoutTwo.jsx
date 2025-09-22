import { useState, useEffect } from "react";
import { ChevronLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./../Context/CheckoutContext";
import { useAuth } from "./../Context/AuthContext";

const CheckoutTwo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    ticketQuantities,
    userDetails,
    updateUserDetails,
    calculateSubtotal,
    calculateTotalFees,
    calculateTotal,
    hasTicketsSelected,
  } = useCheckout();

  const [timeLeft, setTimeLeft] = useState(600);
  const [errors, setErrors] = useState({});

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user && !userDetails.firstName) {
      updateUserDetails("firstName", user.firstName || "");
      updateUserDetails("lastName", user.lastName || "");
      updateUserDetails("email", user.email || "");
      updateUserDetails("confirmEmail", user.email || "");
    }
  }, [user, userDetails, updateUserDetails]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!userDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!userDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!userDetails.confirmEmail.trim()) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (userDetails.email !== userDetails.confirmEmail) {
      newErrors.confirmEmail = "Email addresses do not match";
    }

    if (!userDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Proceed to payment
    navigate("/payment");
  };

  const handleInputChange = (field, value) => {
    updateUserDetails(field, value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!hasTicketsSelected) {
    navigate("/checkout/one");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/checkout/one")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-1">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
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
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4 p-4 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-blue-800 text-sm">
                  We have reserved your tickets. Please complete checkout within{" "}
                  {formatTime(timeLeft)} to secure your tickets
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      value={userDetails.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={userDetails.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm email address
                  </label>
                  <input
                    type="email"
                    value={userDetails.confirmEmail}
                    onChange={(e) =>
                      handleInputChange("confirmEmail", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] ${
                      errors.confirmEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Confirm email address"
                  />
                  {errors.confirmEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number
                  </label>
                  <div className="flex">
                    <select className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#006F6A]">
                      <option>+234</option>
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`flex-1 px-3 py-2 border border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="7088305667"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Send ticket to different email addresses?
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="emailOption"
                        checked={!userDetails.sendToDifferentEmail}
                        onChange={() =>
                          updateUserDetails("sendToDifferentEmail", false)
                        }
                        className="h-4 w-4 text-[#006F6A] focus:ring-[#006F6A]"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Tickets will only be sent to the email address you
                        provide here
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="emailOption"
                        checked={userDetails.sendToDifferentEmail}
                        onChange={() =>
                          updateUserDetails("sendToDifferentEmail", true)
                        }
                        className="h-4 w-4 text-[#006F6A] focus:ring-[#006F6A]"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                  </div>
                </div>
              </form>
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
                    <span>
                      $ {(ticketQuantities.regular * 10).toLocaleString()}
                    </span>
                  </div>
                )}
                {ticketQuantities.vip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{ticketQuantities.vip} x VIP</span>
                    <span>
                      $ {(ticketQuantities.vip * 20).toLocaleString()}
                    </span>
                  </div>
                )}
                {ticketQuantities.vvip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{ticketQuantities.vvip} x VVIP</span>
                    <span>
                      $ {(ticketQuantities.vvip * 30).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                  <span>Fee</span>
                  <span>$ {calculateTotalFees().toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>$ {calculateSubtotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-6">
                Discount codes are now added at payment step.
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>TOTAL</span>
                  <span>$ {calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#006F6A] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#005a55] transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTwo;
