import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBell, FiGlobe, FiMoon, FiSun, FiShield } from "react-icons/fi";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import { useThemeStore } from "../store/useThemeStore";
import { useToastStore } from "../store/useToastStore";

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { addToast } = useToastStore();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    language: "en",
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
    addToast("Settings updated successfully", "success");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>

          {/* Notifications */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <FiBell className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium text-foreground">
                    Email Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive email updates about your properties
                  </div>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium text-foreground">
                    Push Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get push notifications on your device
                  </div>
                </div>
                <button
                  onClick={() => handleToggle("pushNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-foreground">
                    Marketing Emails
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive promotional emails and offers
                  </div>
                </div>
                <button
                  onClick={() => handleToggle("marketingEmails")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.marketingEmails ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.marketingEmails
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <FiShield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                Security
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium text-foreground">
                    Two-Factor Authentication
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <button
                  onClick={() => handleToggle("twoFactorAuth")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-foreground">
                    Change Password
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Update your password regularly
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              {isDarkMode ? (
                <FiMoon className="w-6 h-6 text-primary" />
              ) : (
                <FiSun className="w-6 h-6 text-primary" />
              )}
              <h2 className="text-2xl font-semibold text-foreground">
                Appearance
              </h2>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-foreground">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FiGlobe className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                Language & Region
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
