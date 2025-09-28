"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    title: "3+ Years of Excellence",
    description:
      "With over 3 years in the industry, we've amassed a wealth of knowledge and experience.",
  },
  {
    title: "Happy Clients",
    description:
      "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.",
  },
  {
    title: "Industry Recognition",
    description:
      "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
    featured: true,
  },
];

const OurAchievements = () => {
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
            Our Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`bg-gray-800 rounded-xl p-8 ${
                achievement.featured
                  ? "border-2 border-blue-500"
                  : "border border-gray-700"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{achievement.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;
