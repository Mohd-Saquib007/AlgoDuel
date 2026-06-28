import HeroContent from "./HeroContent";
import HeroCard from "./HeroCard";

import BackgroundGlow from "./BackgroundGlow";
import BackgroundGrid from "./BackgroundGrid";

import Container from "../../layout/Container";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1E1E1E_75%)]" />
      <BackgroundGrid />

      <BackgroundGlow />

      <Container>

        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">

          <HeroContent />

          <HeroCard />

        </div>

      </Container>

    </section>
  );
}

export default Hero;