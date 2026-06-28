import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import Features from "../../components/landing/Features/Features";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import CTA from "../../components/landing/CTA/CTA";
import Footer from "../../components/landing/Footer/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer/>
    </>
  );
}

export default LandingPage;