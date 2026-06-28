import StatusBadge from "../../../ui/StatusBadge";

function BattleStatus() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Alex</span>

        <StatusBadge status="accepted" />
      </div>

      <div className="flex justify-between">
        <span>Sarah</span>

        <StatusBadge status="running" />
      </div>
    </div>
  );
}

export default BattleStatus;