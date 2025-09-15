import React, { useState } from "react";
import sms from "../assets/sms.png";
import phone from "../assets/call.png";
import location from "../assets/location.png";

const ContactMessage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, submit data (you would typically send to an API here)
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Clear success message after
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Form */}
          <div className="flex-1">
            <div className="bg-[#F8F6F6] p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#000000] mb-4">
                Send a Message
              </h2>
              <p className="text-[#3F3F3F] mb-8">
                Fill out the form and we'll get back to you.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006F6A] focus:border-[#006F6A] outline-none transition ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#3F3F3F] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006F6A] focus:border-[#006F6A] outline-none transition ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#3F3F3F] mb-2"
                  >
                    Comment or message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Leave a message"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006F6A] focus:border-[#006F6A] outline-none transition ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#006F6A] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#005a55] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Contact Information */}
          <div className="flex-1 lg:mt-0 mt-8">
            <div className="h-full flex items-center">
              <div className="space-y-12 w-full">
                {/* Email Section */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-15 h-15">
                    <img src={sms} alt="Email icon" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#000000] mb-2">
                      Email Us
                    </h4>
                    <p className="text-[#4A4A4A] mb-2">
                      Send us a mail anytime, we'll get back within 24 hours
                    </p>
                    <a
                      href="mailto:Info@yourorg.com"
                      className="text-[#2B8783] font-medium hover:underline"
                    >
                      Info@yourorg.com
                    </a>
                  </div>
                </div>

                {/* Call Section */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-15 h-15">
                    <img src={phone} alt="Phone icon" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#000000] mb-2">
                      Call Us
                    </h4>
                    <p className="text-[#4A4A4A] mb-2">
                      Prefer to talk directly? Reach out during our office hours (Mon-Fri, 9AM-5PM)
                    </p>
                    <a
                      href="tel:+2340000000000"
                      className="text-[#2B8783] font-medium hover:underline"
                    >
                      +234XX XXX XXXX
                    </a>
                  </div>
                </div>

                {/* Visit Section */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-15 h-15">
                    <img src={location} alt="Location icon" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#000000] mb-2">
                      Visit Us
                    </h4>
                    <p className="text-[#4A4A4A] mb-2">
                      Stop by our office to make physical inquiries; we'd love to meet you.
                    </p>
                    <p className="text-[#2B8783]">12th Street, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessage;