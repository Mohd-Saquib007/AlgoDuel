import Hero from "../../components/landing/Hero/Hero";
import Features from "../../components/landing/Features/Features";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import CTA from "../../components/landing/CTA/CTA";

function LandingPage() {
  return (
    <div className="space-y-20 bg-[#1E1E1E] text-white overflow-hidden pb-12">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
}

export default LandingPage;