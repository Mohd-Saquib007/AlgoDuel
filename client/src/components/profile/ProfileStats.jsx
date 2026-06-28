function ProfileStats() {
  const stats = [
    {
      title: "Problems Solved",
      value: "127",
    },
    {
      title: "Battle Wins",
      value: "48",
    },
    {
      title: "Win Rate",
      value: "65%",
    },
    {
      title: "Current Streak",
      value: "14 Days",
    },
  ];

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="rounded-2xl border border-white/10 bg-[#252526] p-6"
        >

          <p className="text-gray-400">
            {stat.title}
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            {stat.value}
          </h2>

        </div>

      ))}

    </div>
  );
}

export default ProfileStats;