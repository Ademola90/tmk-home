import { motion } from "framer-motion";
import { FiTwitter } from "react-icons/fi";
import teamone from "../../../assets/teamone.jpg";
import teamtwo from "../../../assets/teamtwo.png";
import teamthree from "../../../assets/teamthree.png";
import teamfour from "../../../assets/teamfour.png";

const teamMembers = [
  {
    id: 1,
    name: "Ademola Abdullahi",
    role: "Founder",
    image: teamone,
    greeting: "Say Hello 👋",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Chief Real Estate Officer",
    image: teamtwo,
    greeting: "Say Hello 👋",
  },
  {
    id: 3,
    name: "David Brown",
    role: "Head of Property Management",
    image: teamthree,
    greeting: "Say Hello 👋",
  },
  {
    id: 4,
    name: "Michael Turner",
    role: "Legal Counsel",
    image: teamfour,
    greeting: "Say Hello 👋",
    featured: true,
  },
];

const TeamSection = () => {
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
            Meet the TMK Team
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            At TMK, our success is driven by the dedication and expertise of our
            team. Get to know the people behind our mission to make your real
            estate dreams a reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`text-center ${
                member.featured ? "border-2 border-blue-500 rounded-xl p-4" : ""
              }`}
            >
              <div className="relative mb-6">
                <img
                  src={
                    member.image ||
                    `/placeholder.svg?height=200&width=200&query=${member.name} professional headshot`
                  }
                  alt={member.name}
                  className="w-48 h-48 rounded-lg mx-auto object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors duration-300">
                    <FiTwitter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-400 mb-4">{member.role}</p>

              <button className="bg-gray-800 hover:bg-gray-700 text-purple-400 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center mx-auto">
                <span className="mr-2">{member.greeting}</span>
                <div className="bg-purple-600 p-1 rounded">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
