import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, ArrowLeft } from "lucide-react";
import { useEvents } from "../Context/EventContext";
import { useCheckout } from "../Context/CheckoutContext";
import { useAuth } from "../Context/AuthContext"; 
const EventDetails = () => {
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
    getEventById,
  } = useEvents();
  
  const { setEvent: setCheckoutEvent, resetTickets } = useCheckout();
  const { user, isAuthenticated } = useAuth(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = () => {
      if (!id || id === "undefined") {
        setError("No event ID provided in URL");
        setLoading(false);
        return;
      }

      if (eventsLoading) {
        return;
      }

      if (eventsError) {
        setError(`Error loading events: ${eventsError}`);
        setLoading(false);
        return;
      }

      const foundEvent = getEventById(id);

      if (foundEvent) {
        setEvent(foundEvent);
        setError(null);
      } else {
        setError(`Event with ID "${id}" not found.`);
      }

      setLoading(false);
    };

    loadEvent();
  }, [id, events, eventsLoading, eventsError, getEventById]);

  const handlePurchaseTickets = () => {
    if (!event) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // If authenticated, proceed with purchase
    proceedToCheckout();
  };

  const proceedToCheckout = () => {
    // Reset any previous ticket selections
    resetTickets();
    
    // Set the current event in checkout context
    setCheckoutEvent(event);
    
    // Navigate to checkout page
    navigate('/checkout/one');
  };

  const handleSignUp = () => {
    setShowAuthModal(false);
    navigate('/signup', { 
      state: { 
        fromEvent: true,
        eventId: event?.id,
        returnTo: `/events/${event?.id}`
      } 
    });
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    navigate('/login', { 
      state: { 
        fromEvent: true,
        eventId: event?.id,
        returnTo: `/events/${event?.id}`
      } 
    });
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatPrice = (price) => {
    if (!price) return "$0.00";
    if (typeof price === "number") return `$${price.toFixed(2)}`;
    if (typeof price === "string") {
      return price.startsWith("$") ? price : `$${price}`;
    }
    return "$0.00";
  };

  if (eventsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading event: {error || "Event not found"}</p>
          <p className="text-sm text-gray-600 mt-2">
            Requested ID: {id || "undefined"}
          </p>
          <button
            onClick={() => navigate("/discover")}
            className="mt-4 px-4 py-2 bg-[#006F6A] text-white rounded-lg"
          >
            Back to All Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#006F6A] mb-6 hover:underline"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-80 w-full">
            <img
              src={
                event.image ||
                "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin
                    className="text-[#006F6A] mt-1 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-700">
                      {event.location || "Venue to be announced"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar
                    className="text-[#006F6A] mt-1 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">Date</h3>
                    <p className="text-gray-700">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock
                    className="text-[#006F6A] mt-1 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">Time</h3>
                    <p className="text-gray-700">
                      {event.time || "Time to be announced"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Ticket Information
                </h3>
                <p className="text-2xl font-bold text-[#006F6A] mb-4">
                  {formatPrice(event.price)}
                </p>
                
                {/* Show user info if authenticated */}
                {isAuthenticated && (
                  <div className="mb-3 p-2 bg-green-50 rounded-md">
                    <p className="text-sm text-green-700">
                     {user?.username || user?.email}
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={handlePurchaseTickets}
                  className="w-full py-3 bg-[#006F6A] text-white font-semibold rounded-lg hover:bg-[#005a57] transition-colors"
                >
                  {isAuthenticated ? "Purchase Tickets" : "Sign In to Purchase Tickets"}
                </button>
                
                {!isAuthenticated && (
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    You need an account to purchase tickets
                  </p>
                )}
              </div>
            </div>

            {event.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Sign In Required
            </h3>
            <p className="text-gray-600 mb-6">
              You need to create an account or sign in to purchase tickets for this event.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleSignUp}
                className="w-full py-3 bg-[#006F6A] text-white font-semibold rounded-lg hover:bg-[#005a57] transition-colors"
              >
                Create New Account
              </button>
              
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-white text-[#006F6A] font-semibold rounded-lg border border-[#006F6A] hover:bg-gray-50 transition-colors"
              >
                Sign In to Existing Account
              </button>
              
              <button
                onClick={handleCloseModal}
                className="w-full py-2 text-gray-600 font-medium rounded-lg hover:text-gray-800 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;