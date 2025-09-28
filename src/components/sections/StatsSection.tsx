"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      number: 2500,
      suffix: "+",
      label: "Properties Sold",
      description: "Successfully completed transactions",
    },
    {
      number: 5000,
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
    },
    {
      number: 150,
      suffix: "+",
      label: "Expert Agents",
      description: "Professional real estate experts",
    },
    {
      number: 98,
      suffix: "%",
      label: "Success Rate",
      description: "Client satisfaction guarantee",
    },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!isVisible) return;

    const durations = stats.map(() => 2000);
    const startTimes = stats.map(() => Date.now());

    const animate = () => {
      const newCounts = counts.map((count, index) => {
        const progress = Math.min(
          (Date.now() - startTimes[index]) / durations[index],
          1
        );
        return Math.floor(progress * stats[index].number);
      });

      setCounts(newCounts);

      const allDone = newCounts.every(
        (count, index) => count === stats[index].number
      );
      if (!allDone) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Our track record speaks for itself. Join the growing community of
            successful property buyers and sellers who chose our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const count = counts[index];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-accent">
                    {isVisible ? count : 0}
                  </span>
                  <span className="text-5xl md:text-6xl font-bold text-accent">
                    {stat.suffix}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                <p className="text-primary-foreground/70">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 text-primary-foreground/90">
              "The best real estate platform I've ever used. The escrow system
              gave me complete peace of mind, and the agent support was
              exceptional throughout the entire process."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/placeholder.svg?key=testimonial"
                alt="Client testimonial"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-accent">Sarah Mitchell</div>
                <div className="text-primary-foreground/70">
                  Property Buyer, New York
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
