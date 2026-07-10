import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Container from "../../layout/Container";

function CTA() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br' from-[#141414] to-[#252526]/30 p-12 text-center shadow-2xl">
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-['Sora'] text-4xl font-black tracking-tight sm:text-5xl uppercase">
              Ready to <span className="text-[#A3FF12]">Prove Your Skills?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400">
              Join thousands of developers competing in real-time coding battles, solve challenging algorithmic matrices, and claim your spot on the global leaderboard.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate(isLoggedIn ? "/battle" : "/login")}
                className="font-bold px-8 py-3.5 transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Start Battling
              </Button>

              <Button 
                variant="secondary"
                onClick={() => navigate(isLoggedIn ? "/problems" : "/login")}
                className="font-semibold border border-white/10 px-8 py-3.5 transition duration-200 hover:bg-white/5 hover:text-white active:scale-[0.98]"
              >
                Explore Problems
              </Button>
            </div>
          </div>

          {/* Core Cyberpunk Background Radial Accents */}
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-[#A3FF12]/5 blur-3xl" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>
      </Container>
    </section>
  );
}

export default CTA;