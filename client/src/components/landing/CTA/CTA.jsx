import Button from "../../ui/Button";
import Container from "../../layout/Container";

function CTA() {
  return (
    <section className="py-28">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#252526] to-[#1B1B1B] p-12 text-center">

          <h2 className="font-['Sora'] text-5xl font-bold">
            Ready to{" "}
            <span className="text-[#A3FF12]">
              Prove Your Skills?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Join thousands of developers competing in real-time coding battles,
            solve challenging problems, and climb the leaderboard.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Button>
              Start Battling
            </Button>

            <Button variant="secondary">
              Explore Problems
            </Button>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default CTA;