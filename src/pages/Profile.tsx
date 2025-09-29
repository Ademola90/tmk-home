import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiCamera,
} from "react-icons/fi";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = useAuthStore();
  const { addToast } = useToastStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Real estate enthusiast looking for the perfect investment property.",
  });

  const handleSave = () => {
    setIsEditing(false);
    addToast("Profile updated successfully!", "success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/luxury-real-estate-banner.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
                    <FiCamera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {formData.name}
                    </h1>
                    <p className="text-muted-foreground">
                      Member since January 2024
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                    className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <FiSave className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    ) : (
                      <>
                        <FiEdit2 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      <FiUser className="inline w-4 h-4 mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    ) : (
                      <p className="text-foreground font-medium">
                        {formData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      <FiMail className="inline w-4 h-4 mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    ) : (
                      <p className="text-foreground font-medium">
                        {formData.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      <FiPhone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    ) : (
                      <p className="text-foreground font-medium">
                        {formData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      <FiMapPin className="inline w-4 h-4 mr-2" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    ) : (
                      <p className="text-foreground font-medium">
                        {formData.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  ) : (
                    <p className="text-foreground">{formData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-muted-foreground">Properties Owned</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-muted-foreground">Favorites</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Active Transactions</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="py-12" />

      <Footer />
    </div>
  );
};

export default Profile;
