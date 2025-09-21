import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const Events = () => {
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
        setEvents(data.data || data.events || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="events section" id="events">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              Upcoming Events
            </h2>
            <p className="text-[#777777] max-w-2xl mx-auto">
              Stay ahead with what's happening next
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white border border-[#6BABA9] rounded-[25px] border-b-6 shadow-md"
              >
                <div className="h-48 bg-gray-300 "></div>
                <div className="p-6 ">
                  <div className="h-6 "></div>
                  <div className="h-4 "></div>
                  <div className="h-4 bg-[#6BABA9] rounded-tl-[25.44px] rounded-tr-[25.44px"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="events section" id="events">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-red-600">Error loading events: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="events section" id="events">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay ahead with what's happening next
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 6).map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#6BABA9] border-b-7"
              >
                {/* Event Image */}
                <div className="h-55 overflow-hidden">
                  <img
                    src={event.image || "/api/placeholder/300/200"}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/006F6A/ffffff?text=Event+Image";
                    }}
                  />
                </div>

                {/* Event Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#4A4A4A] mb-2">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-3 mb-2">
                    {/* Location */}
                    <div className="flex items-center text-[#777777]">
                      <MapPin className="h-4 w-4 mr-2 text-[#006F6A]" />
                      <span className="text-sm">
                        {event.location || "Location TBA"}
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      {/* Date */}
                      <div className="flex items-center text-[#777777]">
                        <Calendar className="h-4 w-4 mr-2 text-[#006F6A]" />
                        <span className="text-sm">
                          {event.date ? formatDate(event.date) : "Date TBA"}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center text-[#777777]">
                        <Clock className="h-4 w-4 text-[#006F6A]" />
                        <span className="text-sm">
                          {event.time || "Time TBA"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#006F6A]">
                      {event.price === 0 || !event.price
                        ? "FREE"
                        : `$${event.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}`}
                    </div>
                    <button className="bg-white text-[#006F6A] border-2 border-#004D49 px-4 py-2 rounded-md hover:bg-[#006F6A] hover:text-white transition-colors text-sm font-medium">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Upcoming Events
              </h3>
              <p className="text-gray-600">
                There are no events scheduled at the moment. Check back later
                for updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
