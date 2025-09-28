import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-900 text-white  px-5 md:px-10 lg:px-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Real Estate Journey Today
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Your dream property is just a click away. Whether you're looking for
            a new home, a strategic investment, or expert real estate advice,
            TMK is here to assist you every step of the way. Take the first step
            towards your real estate goals and explore our available properties
            or get in touch with our team for personalized assistance.
          </p>

          <Button
            onClick={() => navigate("/properties")}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
          >
            Explore Properties
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
