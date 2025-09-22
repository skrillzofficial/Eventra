import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./../Context/CheckoutContext";
import { useEvents } from "./../Context/EventContext";

const CheckoutOne = () => {
  const navigate = useNavigate();
  const {
    event,
    ticketQuantities,
    updateQuantity,
    calculateSubtotal,
    calculateTotalFees,
    calculateTotal,
    hasTicketsSelected,
  } = useCheckout();

  // Get event data from context or use the one from checkout
  const { getEventById } = useEvents();
  const eventData = event || (event?.id && getEventById(event.id));

  // Define ticket types with dynamic pricing from the event
  const ticketTypes = [
    {
      id: "regular",
      name: "Regular",
      price: eventData?.price || 10,
      fee: 2, 
    },
    {
      id: "vip",
      name: "VIP",
      price:
        eventData?.vipPrice || (eventData?.price ? eventData.price * 2 : 20),
      fee: 2,
    },
    {
      id: "vvip",
      name: "VVIP",
      price:
        eventData?.vvipPrice ||
        (eventData?.price ? eventData.price * 3 : 30),
      fee: 2,
    },
  ];

  // Handle back navigation safely
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/discover"); // Fallback route
    }
  };

  // Handle continue to checkout
  const handleContinue = () => {
    if (hasTicketsSelected) {
      navigate("/checkout/two");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-1">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Event Info Banner */}
        {eventData && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {eventData.title}
            </h2>
            <p className="text-gray-600">
              {eventData.date && new Date(eventData.date).toLocaleDateString()}{" "}
              • {eventData.location}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ticket Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Choose Tickets
              </h2>

              {/* Ticket Selection */}
              <div className="space-y-6">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {ticket.name}
                        </h3>
                        <p className="text-2xl font-bold text-[#006F6A] mt-1">
                          ${ticket.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Includes ${ticket.fee} fee
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          This ticket admits one
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              ticket.id,
                              Math.max(
                                0,
                                (ticketQuantities[ticket.id] || 0) - 1
                              )
                            )
                          }
                          disabled={(ticketQuantities[ticket.id] || 0) === 0}
                          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="text-lg font-semibold min-w-[40px] text-center">
                          {ticketQuantities[ticket.id] || 0}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              ticket.id,
                              (ticketQuantities[ticket.id] || 0) + 1
                            )
                          }
                          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Discount codes are now added at payment step
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {eventData ? eventData.title.toUpperCase() : "ORDER SUMMARY"}
              </h3>

              <div className="space-y-3 mb-4">
                {ticketTypes.map(
                  (ticket) =>
                    (ticketQuantities[ticket.id] || 0) > 0 && (
                      <div
                        key={ticket.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {ticketQuantities[ticket.id] || 0}x {ticket.name}
                        </span>
                        <span className="text-[#006F6A] font-medium">
                          $
                          {(
                            (ticketQuantities[ticket.id] || 0) * ticket.price
                          ).toLocaleString()}
                        </span>
                      </div>
                    )
                )}

                {(ticketQuantities.regular > 0 ||
                  ticketQuantities.vip > 0 ||
                  ticketQuantities.vvip > 0) && (
                  <>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                      <span>Fee</span>
                      <span className="text-[#006F6A] font-medium">
                        ${calculateTotalFees().toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                      <span>Subtotal</span>
                      <span className="text-[#006F6A] font-medium">
                        ${calculateSubtotal().toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {ticketQuantities.regular > 0 ||
              ticketQuantities.vip > 0 ||
              ticketQuantities.vvip > 0 ? (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center font-bold">
                    <span>TOTAL</span>
                    <span className="text-lg text-[#006F6A]">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <p className="text-sm text-gray-500 text-center py-2">
                    Select tickets to see total
                  </p>
                </div>
              )}

              <button
                onClick={handleContinue}
                disabled={!hasTicketsSelected}
                className="w-full bg-[#006F6A] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#005a55] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Continue to Checkout
              </button>

              {!hasTicketsSelected && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  Please select at least one ticket to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOne;
