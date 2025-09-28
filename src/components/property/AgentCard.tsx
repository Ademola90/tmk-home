import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMessageCircle, FiStar } from "react-icons/fi";
// import type { Property } from "../../types/property";
import Button from "../common/Button";
import type { Property } from "../../types/property";

interface AgentCardProps {
  agent: Property["agent"];
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Contact Agent
        </h3>
        <p className="text-muted-foreground">
          Get in touch for more information
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          {agent.avatar ? (
            <img
              src={agent.avatar || "/placeholder.svg"}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-primary">
              {agent.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground">
            {agent.name}
          </h4>
          <p className="text-muted-foreground">Licensed Real Estate Agent</p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              4.9 (127 reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <FiPhone className="w-5 h-5" />
          <span>{agent.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-muted-foreground">
          <FiMail className="w-5 h-5" />
          <span>{agent.email}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full">
          <FiPhone className="w-4 h-4 mr-2" />
          Call Agent
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          <FiMail className="w-4 h-4 mr-2" />
          Send Email
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          <FiMessageCircle className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-sm text-muted-foreground">Properties Sold</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
