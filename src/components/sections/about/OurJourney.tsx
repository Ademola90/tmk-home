import { motion } from "framer-motion";
import abouthero from "../../../assets/abouthero.png";

const stats = [
  {
    number: "200+",
    label: "Happy Customers",
  },
  {
    number: "10k+",
    label: "Properties For Clients",
  },
  {
    number: "16+",
    label: "Years of Experience",
  },
];

const OurJourney = () => {
  return (
    <section className="py-20 bg-gray-900 text-white  px-5 md:px-10 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we've
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={abouthero}
              alt="Hand holding house model"
              className="max-w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
