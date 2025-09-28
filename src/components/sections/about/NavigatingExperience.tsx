"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discover a World of Possibilities",
    description:
      "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location.",
  },
  {
    step: "02",
    title: "Narrowing Down Your Choices",
    description:
      "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
  {
    step: "03",
    title: "Personalized Guidance",
    description:
      "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away, ready to assist you.",
  },
  {
    step: "04",
    title: "See It for Yourself",
    description:
      "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
  },
  {
    step: "05",
    title: "Making Informed Decisions",
    description:
      "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed.",
  },
  {
    step: "06",
    title: "Getting the Best Deal",
    description:
      "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
  },
];

const NavigatingExperience = () => {
  return (
    <section className="py-20 bg-gray-900 text-white  px-5 md:px-10 lg:px-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Navigating the TMK Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            At TMK, we've designed a straightforward process to help you find
            and purchase your dream property with ease. Here's a step-by-step
            guide to how it all works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors duration-300"
            >
              <div className="text-purple-400 text-sm font-semibold mb-2">
                Step {step.step}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigatingExperience;
