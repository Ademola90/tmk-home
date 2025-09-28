import Navbar from "../components/nav/Navbar";
import CallToAction from "../components/sections/about/CallToAction";
import NavigatingExperience from "../components/sections/about/NavigatingExperience";
import OurAchievements from "../components/sections/about/OurAchievements";
import OurJourney from "../components/sections/about/OurJourney";
import OurValues from "../components/sections/about/OurValues";
import TeamSection from "../components/sections/about/TeamSection";
import ValuedClients from "../components/sections/about/ValuedClients";
import Footer from "../components/sections/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <OurJourney />
      <OurValues />
      <OurAchievements />
      <NavigatingExperience />
      <TeamSection />
      <ValuedClients />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default About;

// import React from "react";
// import Navbar from "../components/nav/Navbar";

// const AboutUs = () => {
//   return (
//     <div>
//       <section>
//         <Navbar />
//       </section>
//       <p></p>
//     </div>
//   );
// };

// export default AboutUs;
