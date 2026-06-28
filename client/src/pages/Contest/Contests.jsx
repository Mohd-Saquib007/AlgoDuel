import ContestCard from "../../components/contest/ContestCard";

const upcoming = [
  {
    title: "Weekly Challenge #12",
    type: "Upcoming",
    date: "12 July 2026",
    duration: "2 Hours",
    participants: "1,250 Registered",
    buttonText: "Register",
  },
  {
    title: "Saturday Night Contest",
    type: "Upcoming",
    date: "15 July 2026",
    duration: "90 Minutes",
    participants: "860 Registered",
    buttonText: "Register",
  },
];

const live = [
  {
    title: "AlgoDuel Round #5",
    type: "Live",
    date: "Live Now",
    duration: "Ends in 52 mins",
    participants: "632 Competing",
    buttonText: "Enter Contest",
  },
];

const past = [
  {
    title: "June Challenge",
    type: "Past",
    date: "28 June 2026",
    duration: "2 Hours",
    participants: "1,900 Participants",
    buttonText: "View Results",
  },
];

function ContestSection({
  title,
  contests,
}) {
  return (
    <section className="mt-16">

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {contests.map((contest) => (
          <ContestCard
            key={contest.title}
            {...contest}
          />
        ))}

      </div>

    </section>
  );
}

function Contests() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] px-6 py-10 text-white">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold">
          🏆 Contests
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-400">
          Participate in coding contests, improve your rating,
          and compete against developers around the globe.
        </p>

        <ContestSection
          title="Upcoming Contests"
          contests={upcoming}
        />

        <ContestSection
          title="Live Contests"
          contests={live}
        />

        <ContestSection
          title="Past Contests"
          contests={past}
        />

      </div>

    </div>
  );
}

export default Contests;