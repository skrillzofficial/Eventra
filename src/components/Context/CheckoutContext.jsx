import { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext();

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}

export function CheckoutProvider({ children }) {
  const [event, setEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({
    regular: 0,
    vip: 0,
    vvip: 0,
  });

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    sendToDifferentEmail: false,
  });

  // ticket prices based on event data
  const getTicketPrices = () => {
    if (!event) {
      return {
        regular: 10,
        vip: 20,
        vvip: 30,
      };
    }

    return {
      regular: event.price || 10,
      vip: event.vipPrice || (event.price ? event.price * 2 : 20),
      vvip: event.vvipPrice || (event.price ? event.price * 3 : 30),
    };
  };

  // Fixed fees as in CheckoutOne
  const fees = {
    regular: 2, 
    vip: 5,     
    vvip: 10,    
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedEvent = localStorage.getItem("checkoutEvent");
    const savedQuantities = localStorage.getItem("checkoutQuantities");
    const savedUserDetails = localStorage.getItem("checkoutUserDetails");

    if (savedEvent && savedEvent !== "null") {
      setEvent(JSON.parse(savedEvent));
    }
    if (savedQuantities) {
      setTicketQuantities(JSON.parse(savedQuantities));
    }
    if (savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("checkoutEvent", JSON.stringify(event));
  }, [event]);

  useEffect(() => {
    localStorage.setItem(
      "checkoutQuantities",
      JSON.stringify(ticketQuantities)
    );
  }, [ticketQuantities]);

  useEffect(() => {
    localStorage.setItem("checkoutUserDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  // Set event for checkout
  const setCheckoutEvent = (eventData) => {
    setEvent(eventData);
  };

  // Update quantity with direct value
  const updateQuantity = (type, quantity) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [type]: Math.max(0, quantity),
    }));
  };

  // Update quantity with increment/decrement operation
  const updateQuantityByOperation = (type, operation) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [type]:
        operation === "increment"
          ? prev[type] + 1
          : Math.max(0, prev[type] - 1),
    }));
  };

  const updateUserDetails = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateSubtotal = () => {
    const prices = getTicketPrices();
    return Object.keys(ticketQuantities).reduce((total, type) => {
      return total + ticketQuantities[type] * prices[type];
    }, 0);
  };

  const calculateTotalFees = () => {
    return Object.keys(ticketQuantities).reduce((total, type) => {
      return total + ticketQuantities[type] * fees[type];
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalFees();
  };

  const hasTicketsSelected = Object.values(ticketQuantities).some(
    (qty) => qty > 0
  );

  // Get individual ticket price for display
  const getTicketPrice = (type) => {
    const prices = getTicketPrices();
    return prices[type] || 0;
  };

  // Reset ticket quantities to 0
  const resetTickets = () => {
    setTicketQuantities({ regular: 0, vip: 0, vvip: 0 });
  };

  const clearCheckoutData = () => {
    setEvent(null);
    setTicketQuantities({ regular: 0, vip: 0, vvip: 0 });
    setUserDetails({
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      sendToDifferentEmail: false,
    });
    localStorage.removeItem("checkoutEvent");
    localStorage.removeItem("checkoutQuantities");
    localStorage.removeItem("checkoutUserDetails");
  };

  const value = {
    // Event state
    event,
    setEvent: setCheckoutEvent,
    
    // Ticket states
    ticketQuantities,
    userDetails,
    ticketPrices: getTicketPrices(),
    fees,
    
    // Functions
    updateQuantity,
    updateQuantityByOperation,
    updateUserDetails,
    calculateSubtotal,
    calculateTotalFees,
    calculateTotal,
    hasTicketsSelected,
    getTicketPrice,
    resetTickets,
    clearCheckoutData,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}