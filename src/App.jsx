import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import { CheckoutProvider } from "./components/Context/CheckoutContext";
import "./App.css";
import LandingPage from "./components/pages/LandingPage";
import AboutPage from "./components/pages/AboutPage";
import DiscoverEvent from "./components/pages/DiscoverEvent";
import ContactPage from "./components/pages/ContactPage";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import ProfilePage from "./components/pages/ProfilePage";
import EventDetails from "./components/pages/EventDetails";
import CheckoutOne from "./components/PaymentCheckout/CheckoutOne";
import CheckoutTwo from "./components/PaymentCheckout/CheckoutTwo";
import Payment from "./components/PaymentCheckout/Payment"; // Add this import
import PaymentStatus from "./components/PaymentCheckout/PaymentStatus"; // Add this import
import Onboarding from "./Auth/OnBoarding";
import MyTickets from "./components/pages/MyTickets";
import Account from "./components/pages/Account";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CheckoutProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/discover" element={<DiscoverEvent />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/event-details/:id" element={<EventDetails />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/account" element={<Account />} />
            
            {/* Checkout Flow */}
            <Route path="/checkout/one" element={<CheckoutOne />} />
            <Route path="/checkout/two" element={<CheckoutTwo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/status" element={<PaymentStatus />} />
            
            {/* Auth */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </CheckoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;