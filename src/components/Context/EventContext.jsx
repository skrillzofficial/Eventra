import React, { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const eventsArray = data.events || data.data || data.items || data;

        if (Array.isArray(eventsArray)) {
          const normalizedEvents = eventsArray.map((event) => ({
            ...event,
            id:
              event.id?.toString() ||
              event._id?.toString() ||
              Math.random().toString(),
          }));

          setEvents(normalizedEvents);
          localStorage.setItem("events", JSON.stringify(normalizedEvents));
        } else {
          throw new Error("API response is not an array");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);

        // Fallback to localStorage if API fails
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      } finally {
        setLoading(false);
      }
    };

    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
      setLoading(false);
    } else {
      fetchEvents();
    }
  }, []);

  const getEventById = (id) => {
    if (!id) return null;
    const searchId = id.toString();
    return events.find(
      (event) =>
        event.id?.toString() === searchId || event._id?.toString() === searchId
    );
  };

  const value = {
    events,
    loading,
    error,
    getEventById,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
