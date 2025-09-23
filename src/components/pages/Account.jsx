import React, { useState, Suspense } from "react";
import Nav from "../Nav";
import { ChevronDown, ChevronUp } from "lucide-react";
import { menuItems } from "../Data/daTa";
import { useAuth } from "../Context/AuthContext";
import { accountSectionsConfig } from "../Account/AccountSectionsConfig";

// Lazy load section components
const SectionComponents = {
  ContactInfo: React.lazy(() => import("../Account/Sections/ContactInfo")),
  PaymentMethods: React.lazy(() =>
    import("../Account/Sections/PaymentMethods")
  ),
  LinkedAccounts: React.lazy(() =>
    import("../Account/Sections/LinkedAccounts")
  ),
  CommunicationPrefs: React.lazy(() =>
    import("../Account/Sections/CommunicationPrefs")
  ),
  CloseAccount: React.lazy(() => import("../Account/Sections/CloseAccount")),
};

const Account = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(menuItems[0]);
  const { user, loading: authLoading } = useAuth();

  const handleMenuSelect = (item) => {
    setActiveSection(item);
    setIsMobileMenuOpen(false);
  };

  const sectionConfig = accountSectionsConfig[activeSection];
  const SectionComponent = SectionComponents[sectionConfig?.component];

  if (authLoading) {
    return (
      <div className="min-h-screen AboutHeroimg py-8">
        <nav className="AboutHeroimg">
          <Nav />
        </nav>
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-96">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen AboutHeroimg py-8">
      <nav className="AboutHeroimg">
        <Nav />
      </nav>

      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            {/* Mobile Dropdown */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between"
              >
                <span className="font-medium text-gray-700">
                  {activeSection}
                </span>
                {isMobileMenuOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {isMobileMenuOpen && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-1">
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {menuItems.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleMenuSelect(item)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              activeSection === item
                                ? "bg-[#006F6A] text-white font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            } ${
                              item === "Close Account"
                                ? "text-red-600 hover:bg-red-50"
                                : ""
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => setActiveSection(item)}
                          className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                            activeSection === item
                              ? "bg-[#006F6A] text-white font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          } ${
                            item === "Close Account"
                              ? "text-red-600 hover:bg-red-50"
                              : ""
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {activeSection}
              </h2>

              <Suspense
                fallback={
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006F6A]"></div>
                  </div>
                }
              >
                {SectionComponent && sectionConfig ? (
                  <SectionComponent
                    user={user}
                    config={sectionConfig}
                    sectionKey={activeSection}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Section not found</p>
                  </div>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
