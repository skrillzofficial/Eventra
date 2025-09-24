import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import loogin from "../assets/LogIn.jpg";
import google from "../assets/google.png";
import Brandlogo from "../assets/Logo image.png";
import logo1 from "../assets/Logo image 1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    rememberme: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        login: rememberedEmail,
        rememberme: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (!formData.login.trim() || !formData.password.trim()) {
    setError("Please fill in all fields");
    setLoading(false);
    return;
  }

  const result = await login({
    login: formData.login.trim(),
    password: formData.password,
  });

  console.log("Login result:", result);

  if (result.success) {
    if (formData.rememberme) {
      localStorage.setItem("rememberedEmail", formData.login.trim());
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    // Check onboarding status
    const needsOnboarding = !result.data.onboardingCompleted;
    console.log("Needs onboarding:", needsOnboarding);
    
    if (needsOnboarding) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  } else {
    setError(result.error);
  }

  setLoading(false);
};
  // Handle Google login
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col lg:flex-row">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-16 mt-10 lg:mt-0">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-y-8 mb-6">
            <Link to="/">
              <div className="flex items-center">
                <div className="flex relative">
                  <img
                    className="h-3 w-auto absolute right-4 top-3"
                    src={logo1}
                    alt="Eventra logo detail"
                  />
                  <img className="h-5 w-auto" src={Brandlogo} alt="Eventra Logo" />
                </div>
                <span className="ml-2 text-xl font-bold text-[#000000]">
                  Eventra
                </span>
              </div>
            </Link>
          </div>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Continue with the email address you used to create your account
          </p>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                Email address or Username
              </label>
              <div className="mt-1">
                <input
                  id="login"
                  name="login"
                  type="text"
                  value={formData.login}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm block w-full border-2 border-gray-300 rounded-md focus:ring-[#006F6A] focus:border-[#006F6A] transition-colors"
                  placeholder="Enter your email or username"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="py-2 px-3 pr-10 text-sm block w-full border-2 border-gray-300 rounded-md focus:ring-[#006F6A] focus:border-[#006F6A] transition-colors"
                  placeholder="Enter your password"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  name="rememberme"
                  type="checkbox"
                  checked={formData.rememberme}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 rounded text-[#006F6A] focus:ring-[#006F6A] accent-[#006F6A] cursor-pointer"
                  disabled={loading}
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#006F6A] hover:text-[#005a55] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !formData.login.trim() || !formData.password.trim()}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006F6A] hover:bg-[#005a55] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <div className="flex gap-2 items-center">
                  <img src={google} alt="Google" className="w-4 h-4" />
                  <span>Continue with Google</span>
                </div>
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                New User?{" "}
                <Link 
                  to="/signup" 
                  className="text-[#006F6A] hover:text-[#005a55] font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={loogin}
            alt="Login illustration"
            className="w-full h-full hidden lg:block object-cover md:rounded-l-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;