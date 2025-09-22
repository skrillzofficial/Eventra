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
            {/* Checkout */}
            <Route path="/checkout/one" element={<CheckoutOne />} />
            <Route path="/checkout/two" element={<CheckoutTwo />} />
            {/* Auth */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </CheckoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;