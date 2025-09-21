import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";

const Tickets = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ecommerce-backend-tb8u.onrender.com/api/v1/events"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Extract events array from response
        const eventsArray = data.events || data.data || data.items || data;

        if (Array.isArray(eventsArray)) {
          setEvents(eventsArray);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Format price to always have $ sign
  const formatPrice = (price) => {
    if (!price) return "$0.00";

    // If price is a number, format it
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }

    // If price is a string, ensure it has $ sign
    if (typeof price === "string") {
      return price.startsWith("$") ? price : `$${price}`;
    }

    return "$0.00";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading events: {error}</p>
          <p className="text-sm text-gray-600 mt-2">
            Please check the API endpoint and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col lg:flex-row rounded-xl overflow-hidden bg-white shadow-lg border border-[#6BABA9] border-b-8  h-70"
              >
                {/* Left Section*/}
                <div className="flex-1 p-6 w-1/2">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {event.title || "Event Title"}
                    </h2>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="text-[#006F6A] flex-shrink-0"
                        size={16}
                      />
                      <span className="text-sm text-gray-700">
                        {event.location || "Event Location"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar
                        className="text-[#006F6A] flex-shrink-0"
                        size={16}
                      />
                      <span className="text-sm text-gray-700">
                        {formatDate(event.date) || "Event Date"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock
                        className="text-[#006F6A] flex-shrink-0"
                        size={16}
                      />
                      <span className="text-sm text-gray-700">
                        {event.time || "Event Time"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-[#006F6A]">
                      {formatPrice(event.price)}
                    </span>
                    <button className="px-4 py-2 bg-white text-[#006F6A] font-semibold rounded-lg border-2 border-[#006F6A] text-sm">
                      Get Tickets
                    </button>
                  </div>
                </div>

                {/* Right Section */}
                <div className="relative w-1/2">
                  {/* Ticket perforation effect */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center space-y-1 z-10">
                    {Array.from({ length: 23 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-tr-full rounded-br-full border border-gray-200 bg-white"
                      ></div>
                    ))}
                  </div>

                  {/* Image with ticket cut effect */}
                  <div className="h-full relative overflow-hidden">
                    <img
                      src={
                        event.image ||
                        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={event.title || "Event"}
                      className="w-full h-full object-cover"
                    />

                    {/* Cut corner effects */}

                    <div className="absolute top-25 right-0 w-10 h-20 bg-white rounded-tl-full rounded-bl-full"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">
                No events available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
