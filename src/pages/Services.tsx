"use client";

import { motion } from "framer-motion";
import {
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiHome,
  FiFileText,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import { useEffect } from "react";

const services = [
  {
    icon: FiSearch,
    title: "Property Search",
    description:
      "Access our extensive database of properties. Use advanced filters to find exactly what you're looking for, whether it's location, price range, or property type.",
    features: [
      "Advanced Search Filters",
      "Virtual Tours",
      "Neighborhood Insights",
      "Property Comparisons",
    ],
    image: "/property-search-service.jpg",
  },
  {
    icon: FiShield,
    title: "Secure Transactions",
    description:
      "Our escrow system ensures your funds are protected throughout the transaction process. Buy and sell with confidence knowing your money is secure.",
    features: [
      "Escrow Protection",
      "Secure Payment Gateway",
      "Transaction Tracking",
      "Fraud Prevention",
    ],
    image: "/secure-transaction-service.jpg",
  },
  {
    icon: FiTrendingUp,
    title: "Investment Advisory",
    description:
      "Get expert advice on property investments. Our team analyzes market trends and provides insights to help you make informed investment decisions.",
    features: [
      "Market Analysis",
      "ROI Calculations",
      "Portfolio Management",
      "Investment Strategies",
    ],
    image: "/investment-advisory-service.jpg",
  },
  {
    icon: FiHome,
    title: "Property Management",
    description:
      "Comprehensive property management services for landlords. We handle everything from tenant screening to maintenance and rent collection.",
    features: [
      "Tenant Screening",
      "Rent Collection",
      "Maintenance Coordination",
      "Financial Reporting",
    ],
    image: "/property-management-service.jpg",
  },
  {
    icon: FiFileText,
    title: "Legal Assistance",
    description:
      "Navigate the complex legal aspects of real estate with our expert legal team. We ensure all documentation is proper and compliant.",
    features: [
      "Contract Review",
      "Title Verification",
      "Legal Documentation",
      "Compliance Checks",
    ],
    image: "/legal-assistance-service.jpg",
  },
  {
    icon: FiUsers,
    title: "Consultation Services",
    description:
      "One-on-one consultation with our real estate experts. Get personalized advice tailored to your specific needs and goals.",
    features: [
      "Personal Consultation",
      "Market Insights",
      "Property Valuation",
      "Negotiation Support",
    ],
    image: "/consultation-service.jpg",
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/real-estate-services-hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Comprehensive real estate solutions designed to make your property
              journey seamless and successful
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        service.image ||
                        `/placeholder.svg?height=200&width=400&query=${service.title}`
                      }
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-primary/90 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/modern-office-consultation.jpg')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact us today to learn more about how our services can help you
              achieve your real estate goals.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
