import { motion } from "framer-motion";
import { FiStar, FiAward, FiUsers, FiHeart } from "react-icons/fi";

const values = [
  {
    icon: FiStar,
    title: "Trust",
    description:
      "Trust is the cornerstone of every successful real estate transaction.",
  },
  {
    icon: FiAward,
    title: "Excellence",
    description:
      "We set the bar high for ourselves. From the properties we list to the services we provide.",
  },
  {
    icon: FiUsers,
    title: "Client-Centric",
    description:
      "Your dreams and needs are at the center of our universe. We listen, understand.",
  },
  {
    icon: FiHeart,
    title: "Our Commitment",
    description:
      "We are dedicated to providing you with the highest level of service, professionalism.",
  },
];

const OurValues = () => {
  return (
    <section className="py-20 bg-gray-800 text-white  px-5 md:px-10 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </p>
          </motion.div>

          {/* Right Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                >
                  <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
