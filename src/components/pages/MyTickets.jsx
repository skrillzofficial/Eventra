import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import Nav from "../Nav";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's tickets
  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://ecommerce-backend-tb8u.onrender.com/api/v1/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets || data.data || []);
      } else {
        setTickets(getSampleTickets());
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets(getSampleTickets());
    } finally {
      setLoading(false);
    }
  };

  // Sample data
  const getSampleTickets = () => [
    {
      id: 1,
      eventName: "Tech Conference 2024: Future of AI",
      status: "active",
      venue: "Convention Center Downtown",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      ticketType: "VIP Pass",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      eventName: "Summer Music Festival",
      status: "active",
      venue: "Central Park Amphitheater",
      date: "July 22, 2024",
      time: "2:00 PM - 11:00 PM",
      ticketType: "General Admission",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1501281667305-0d4ebdb4c6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "past":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cover DiscoverHeroimg bg-center bg-fixed">
        <Nav />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center DiscoverHeroimg bg-fixed">
      <Nav />

      {/* Main content with semi-transparent overlay */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header with glass effect */}
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Tickets
            </h1>
            <p className="text-gray-700">
              Manage and view all your event tickets in one place
            </p>
          </div>

          {/* Tickets List */}
          <div className="space-y-6">
            {tickets.length === 0 ? (
              <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                <div className="text-gray-400 text-6xl mb-4">🎫</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tickets yet
                </h3>
                <p className="text-gray-700">
                  You haven't purchased any tickets yet.
                </p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden hover:bg-white/95 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Event Image */}
                      <div className="lg:w-48 lg:h-32 w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={ticket.image}
                          alt={ticket.eventName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Ticket Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {ticket.eventName}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              {ticket.status.charAt(0).toUpperCase() +
                                ticket.status.slice(1)}
                            </span>
                          </div>
                          <div className="mt-2 sm:mt-0 text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {ticket.price}
                            </div>
                            <div className="text-sm text-gray-600">
                              {ticket.ticketType}
                            </div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-700">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{ticket.venue}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">{ticket.date}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">{ticket.time}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200/50">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            View Ticket
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            Download PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Ticket Stats */}
          {tickets.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20">
                <div className="text-2xl font-bold text-gray-900">
                  {tickets.filter((t) => t.status === "active").length}
                </div>
                <div className="text-gray-700">Active Tickets</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20">
                <div className="text-2xl font-bold text-gray-900">
                  {tickets.filter((t) => t.status === "upcoming").length}
                </div>
                <div className="text-gray-700">Upcoming Events</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20">
                <div className="text-2xl font-bold text-gray-900">
                  $
                  {tickets.reduce(
                    (sum, ticket) =>
                      sum + parseInt(ticket.price.replace("$", "") || 0),
                    0
                  )}
                </div>
                <div className="text-gray-700">Total Spent</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
