import React from "react";
import { MapPin, Calendar, Clock, ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../components/Context/EventContext";

const Tickets = () => {
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();

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

  const formatPrice = (price) => {
    if (!price) return "$0.00";
    if (typeof price === "number") return `$${price.toFixed(2)}`;
    if (typeof price === "string") {
      return price.startsWith("$") ? price : `$${price}`;
    }
    return "$0.00";
  };

  const handleGetTickets = (eventId) => {
    navigate(`/event-details/${eventId}`);
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
      <div className="w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 px-2 mb-6">
        <div className="flex gap-2">
          <p className="bg-[#000000] p-2 lg:py-3 lg:px-4 rounded-lg text-white flex items-center gap-1 text-[12px] cursor-pointer">
            All Events <ChevronDown size={16} />
          </p>
          <p className="border border-[#171717] p-2 lg:py-3 lg:px-4 rounded-lg text-black flex items-center gap-1 text-[12px] cursor-pointer">
            Price <ChevronDown size={16} />
          </p>
          <p className="border border-[#8A8A8A] p-2 lg:py-3 lg:px-4 rounded-lg text-black flex items-center gap-1 text-[12px] cursor-pointer">
            Date <ChevronDown size={16} />
          </p>
        </div>
        <div className="border border-[#8A8A8A] p-2 lg:py-3 lg:px-4 lg:w-[30%] rounded-lg text-black flex items-center gap-2 text-[12px]">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search Events"
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col rounded-xl overflow-hidden bg-white shadow-lg border border-[#6BABA9] border-b-8"
              >
                {/* Mobile Layout */}
                <div className="lg:hidden p-3">
                  <div className="relative h-48 w-full">
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center space-y-1 z-10">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={`mobile-perf-${i}`}
                          className="w-2 h-2 rounded-tr-full rounded-br-full border border-gray-200 bg-white"
                        ></div>
                      ))}
                    </div>

                    <div className="h-full relative overflow-hidden">
                      <img
                        src={
                          event.image ||
                          "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        }
                        alt={event.title || "Event"}
                        className="w-full h-full rounded-r-xl object-cover"
                      />
                      <div className="absolute top-15 right-0 w-10 h-20 bg-white rounded-tl-full rounded-bl-full"></div>
                    </div>
                  </div>

                  <div className="p-6">
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
                      <button
                        onClick={() => handleGetTickets(event.id)}
                        className="px-4 py-2 bg-white text-[#006F6A] font-semibold rounded-lg border-2 border-[#006F6A] text-sm hover:bg-[#006F6A] hover:text-white transition-colors"
                      >
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex lg:flex-row h-70">
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
                      <button
                        onClick={() => handleGetTickets(event.id)}
                        className="px-4 py-2 bg-white text-[#006F6A] font-semibold rounded-lg border-2 border-[#006F6A] text-sm hover:bg-[#006F6A] hover:text-white transition-colors"
                      >
                        Get Tickets
                      </button>
                    </div>
                  </div>

                  <div className="relative w-1/2">
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center space-y-1 z-10">
                      {Array.from({ length: 23 }).map((_, i) => (
                        <div
                          key={`desktop-perf-${i}`}
                          className="w-2 h-2 rounded-tr-full rounded-br-full border border-gray-200 bg-white"
                        ></div>
                      ))}
                    </div>

                    <div className="h-full relative overflow-hidden">
                      <img
                        src={
                          event.image ||
                          "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        }
                        alt={event.title || "Event"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-25 right-0 w-10 h-20 bg-white rounded-tl-full rounded-bl-full"></div>
                    </div>
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
