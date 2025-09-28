"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    id: 1,
    question: "How does the escrow system work?",
    answer:
      "Our escrow system holds your funds securely until all conditions of the property purchase are met. This protects both buyers and sellers throughout the transaction process.",
  },
  {
    id: 2,
    question: "What fees are associated with using TMK?",
    answer:
      "We charge a small transaction fee for completed purchases. There are no fees for browsing properties or creating an account. All fees are clearly disclosed before any transaction.",
  },
  {
    id: 3,
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule viewings directly through the property listing page. Our agents will coordinate with you to find a convenient time for the viewing.",
  },
  {
    id: 4,
    question: "Is my personal information secure?",
    answer:
      "Yes, we use industry-standard encryption and security measures to protect your personal and financial information. Your privacy is our top priority.",
  },
  {
    id: 5,
    question: "Can I sell my property on TMK?",
    answer:
      "Yes! Contact our team to list your property. We'll help you create an attractive listing and connect you with qualified buyers.",
  },
];

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#fff] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full bg-[#000] rounded-xl p-6 text-left hover:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#fff] pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === faq.id ? (
                    <FiMinus className="w-5 h-5 text-[#155DFC] flex-shrink-0" />
                  ) : (
                    <FiPlus className="w-5 h-5 text-[#155DFC] flex-shrink-0" />
                  )}
                </div>

                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-gray-200 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
