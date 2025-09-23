// components/Onboarding.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onboardingQuestions } from "../components/Data/onboardingQuestions";
import { ArrowLeft, ArrowRight } from "lucide-react";
import onboardingImage from "../assets/AboutHeroimg.jpg";

const Onboarding = ({ user }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = onboardingQuestions[currentStep];
  const progress = ((currentStep + 1) / onboardingQuestions.length) * 100;

  useEffect(() => {
    if (currentQuestion) {
      if (!answers[currentQuestion.id]) {
        if (currentQuestion.type === "multi-select") {
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: [] }));
        } else if (currentQuestion.type === "range") {
          // Initialize as simple min and max values instead of object
          setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: {
              min: currentQuestion.options.min.toString(),
              max: (currentQuestion.options.min + 500).toString(),
            },
          }));
        } else {
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: "" }));
        }
      }
    }
  }, [currentStep, currentQuestion]);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const isCurrentStepValid = () => {
    const answer = answers[currentQuestion.id];

    if (currentQuestion.required) {
      if (!answer) return false;

      if (currentQuestion.type === "range") {
        // Validate that both min and max exist and are valid numbers
        return (
          answer.min !== undefined &&
          answer.min !== "" &&
          answer.max !== undefined &&
          answer.max !== "" &&
          !isNaN(parseInt(answer.min)) &&
          !isNaN(parseInt(answer.max)) &&
          parseInt(answer.min) <= parseInt(answer.max)
        );
      }

      if (Array.isArray(answer)) return answer.length > 0;
      return answer.toString().trim() !== "";
    }

    return true;
  };

  const handleNext = async () => {
    if (currentStep < onboardingQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login again.");
        return;
      }

      console.log("Sending onboarding data...");
      console.log("Answers:", answers);

      const response = await fetch(
        "https://ecommerce-backend-tb8u.onrender.com/api/v1/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers }),
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        console.log("Onboarding completed successfully");

        const currentUserData = JSON.parse(
          localStorage.getItem("user") || "{}"
        );
        const updatedUser = {
          ...currentUserData,
          onboardingCompleted: true,
          preferences: data.user?.preferences || answers,
          ...data.user,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/profile");
      } else {
        throw new Error(
          data.message || data.error || "Failed to complete onboarding"
        );
      }
    } catch (error) {
      console.error("Onboarding error details:", error);
      if (
        error.message.includes("404") ||
        error.message.includes("User not found")
      ) {
        setError("Authentication issue. Please try logging in again.");
      } else if (error.message.includes("Network error")) {
        setError(
          "Network connection issue. Please check your internet and try again."
        );
      } else {
        setError(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const renderInput = () => {
    const currentAnswer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case "multi-select":
        return (
          <div className="grid grid-cols-1 gap-3 mt-6">
            {currentQuestion.options.map((option) => (
              <label
                key={option}
                className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors bg-white"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 text-green-600 rounded focus:ring-green-500 accent-green-600"
                  checked={currentAnswer?.includes(option) || false}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(currentAnswer || []), option]
                      : (currentAnswer || []).filter((item) => item !== option);
                    handleAnswerChange(newValue);
                  }}
                />
                <span className="ml-3 text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case "single-select":
        return (
          <div className="space-y-3 mt-6">
            {currentQuestion.options.map((option) => (
              <label
                key={option}
                className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors bg-white"
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  className="h-5 w-5 text-green-600 focus:ring-green-500 accent-green-600"
                  checked={currentAnswer === option}
                  onChange={() => handleAnswerChange(option)}
                />
                <span className="ml-3 text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case "range":
        const currentRange = currentAnswer || {
          min: currentQuestion.options.min.toString(),
          max: (currentQuestion.options.min + 500).toString(),
        };

        return (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum {currentQuestion.unit || "Value"}
                </label>
                <div className="flex items-center">
                  {currentQuestion.unit === "USD" && (
                    <span className="mr-2 text-gray-500">$</span>
                  )}
                  <input
                    type="number"
                    min={currentQuestion.options.min}
                    max={currentQuestion.options.max}
                    value={currentRange.min}
                    onChange={(e) => {
                      handleAnswerChange({
                        ...currentRange,
                        min: e.target.value,
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-200"
                    placeholder={`Min: ${currentQuestion.options.min}`}
                  />
                  {currentQuestion.unit && currentQuestion.unit !== "USD" && (
                    <span className="ml-2 text-gray-500">{currentQuestion.unit}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum {currentQuestion.unit || "Value"}
                </label>
                <div className="flex items-center">
                  {currentQuestion.unit === "USD" && (
                    <span className="mr-2 text-gray-500">$</span>
                  )}
                  <input
                    type="number"
                    min={currentQuestion.options.min}
                    max={currentQuestion.options.max}
                    value={currentRange.max}
                    onChange={(e) => {
                      handleAnswerChange({
                        ...currentRange,
                        max: e.target.value,
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-200"
                    placeholder={`Max: ${currentQuestion.options.max}`}
                  />
                  {currentQuestion.unit && currentQuestion.unit !== "USD" && (
                    <span className="ml-2 text-gray-500">{currentQuestion.unit}</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Display the selected range */}
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Selected range: </span>
              <span className="font-medium text-green-600">
                {currentQuestion.unit === "USD" ? "$" : ""}
                {currentRange.min || "0"}
                {currentQuestion.unit && currentQuestion.unit !== "USD" ? currentQuestion.unit : ""}
                {" - "}
                {currentQuestion.unit === "USD" ? "$" : ""}
                {currentRange.max || "0"}
                {currentQuestion.unit && currentQuestion.unit !== "USD" ? currentQuestion.unit : ""}
              </span>
            </div>
          </div>
        );

      case "number":
        return (
          <div className="mt-6">
            <div className="flex items-center max-w-xs">
              {currentQuestion.unit === "USD" && (
                <span className="mr-2 text-gray-500">$</span>
              )}
              <input
                type="number"
                min={currentQuestion.options.min}
                max={currentQuestion.options.max}
                value={currentAnswer || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors bg-white"
                placeholder={`Enter a number between ${currentQuestion.options.min} and ${currentQuestion.options.max}`}
              />
              {currentQuestion.unit && currentQuestion.unit !== "USD" && (
                <span className="ml-2 text-gray-500">{currentQuestion.unit}</span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Range: {currentQuestion.options.min} - {currentQuestion.options.max}
              {currentQuestion.unit ? ` ${currentQuestion.unit}` : ""}
            </div>
          </div>
        );

      default:
        return <div className="mt-4 text-red-500">Unknown question type</div>;
    }
  };

  if (!onboardingQuestions || onboardingQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500">No onboarding questions found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <img
            src={onboardingImage}
            alt="Welcome to Eventra"
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {onboardingQuestions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome to Eventra
            </h1>
            <p className="text-gray-600">
              Help us personalize your experience, {user?.firstName || "there"}!
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Question Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion?.question}
              {currentQuestion?.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </h2>
            {currentQuestion ? (
              renderInput()
            ) : (
              <div className="text-gray-500">Loading question...</div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentStepValid() || loading}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </span>
              ) : currentStep === onboardingQuestions.length - 1 ? (
                "Complete Setup"
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;