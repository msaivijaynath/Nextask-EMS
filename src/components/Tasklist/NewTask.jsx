import { useContext } from "react";
import { Authcontext } from "../../context/Authprovider";
import { IconCalendar, IconCheck, IconXCircle } from "../common/Icons";

const NewTask = ({ data, employeeId, onSelectTask }) => {
  const { updateTaskStatus } = useContext(Authcontext);

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  const handleAccept = (e) => {
    e.stopPropagation();
    updateTaskStatus(employeeId, data.id || data.task_title, "active");
  };

  const handleDecline = (e) => {
    e.stopPropagation();
    const reason = window.prompt("Reason for declining task:", "Schedule conflict");
    if (reason !== null) {
      updateTaskStatus(employeeId, data.id || data.task_title, "failed", {
        failed_reason: reason || "Declined by employee",
      });
    }
  };

  return (
    <div
      onClick={() => onSelectTask && onSelectTask(data)}
      className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-800 hover:border-gray-700 flex flex-col justify-between h-full min-h-[260px] transition cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${getPriorityBadge(
                data.task_priority
              )}`}
            >
              {data.task_priority || "Normal"}
            </span>
            {data.category && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                {data.category}
              </span>
            )}
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
            New
          </span>
        </div>

        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {data.task_title}
        </h3>

        <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
          {data.task_description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-mono">
          <span className="flex items-center gap-1">
            <IconCalendar className="w-3.5 h-3.5 text-gray-400" /> Due: {data.task_date}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <IconCheck className="w-3.5 h-3.5" /> Accept
          </button>
          <button
            onClick={handleDecline}
            title="Decline task"
            className="py-1.5 px-2.5 rounded-lg bg-gray-800 hover:bg-red-950/40 text-gray-300 hover:text-red-300 text-xs transition cursor-pointer"
          >
            <IconXCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
