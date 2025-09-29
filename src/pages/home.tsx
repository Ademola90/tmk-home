import Navbar from "../components/nav/Navbar";
import HeroSection from "../components/sections/HeroSection";
// import FeaturedProperties from "../components/sections/FeaturedProperties";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import Footer from "../components/sections/Footer";
import FeaturedProperties from "../components/sections/FeaturesSection";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;

// import Navbar from "../components/nav/Navbar";

// // import AuthButton from "../components/common/AuthButton";
// // import { useAuthStore } from "../store/useAuthStore";
// import HeroSection from "../components/sections/HeroSection";

// const Home = () => {
//   // const { isAuthenticated, user } = useAuthStore();

//   return (
//     <div>
//       <section>
//         <Navbar />
//       </section>

//       <main className="">
//         <HeroSection />
//         <section></section>

//       </main>
//     </div>
//   );
// };

// export default Home;
