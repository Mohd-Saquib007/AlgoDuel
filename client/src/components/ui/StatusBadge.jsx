function StatusBadge({ status }) {
  const colors = {
    accepted: "bg-green-500",
    running: "bg-yellow-400",
    wrong: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2.5 h-2.5 rounded-full ${colors[status]}`}
      />

      <span className="capitalize text-sm text-gray-300">
        {status}
      </span>
    </div>
  );
}

export default StatusBadge;