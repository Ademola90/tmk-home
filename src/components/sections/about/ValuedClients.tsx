import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const clients = [
  {
    id: 1,
    name: "ABC Corporation",
    since: "Since 2019",
    domain: "Domain",
    category: "Commercial Real Estate",
    categoryType: "Luxury Home Development",
    testimonial:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
    visitWebsite: true,
  },
  {
    id: 2,
    name: "GreenTech Enterprises",
    since: "Since 2018",
    domain: "Domain",
    category: "Commercial Real Estate",
    categoryType: "Retail Space",
    testimonial:
      "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
    visitWebsite: true,
  },
];

const ValuedClients = () => {
  // Remove unused state and navigation functions

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
            Our Valued Clients
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            At TMK, we have had the privilege of working with a diverse range of
            clients across various industries. Here are some of the clients
            we've had the pleasure of serving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">
                    {client.since}
                  </div>
                  <h3 className="text-2xl font-bold">{client.name}</h3>
                </div>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  <FiExternalLink className="w-5 h-5" />
                  <span className="ml-2 text-sm">Visit Website</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">
                    {client.domain}
                  </div>
                  <div className="text-white">{client.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Category</div>
                  <div className="text-white">{client.categoryType}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">
                  What They Said 😊
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {client.testimonial}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remove navigation since we're showing all clients */}
      </div>
    </section>
  );
};

export default ValuedClients;
