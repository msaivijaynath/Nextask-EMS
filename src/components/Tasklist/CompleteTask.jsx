import { useContext } from "react";
import { Authcontext } from "../../context/Authprovider";
import { IconCalendar, IconCheckCircle } from "../common/Icons";

const CompleteTask = ({ data, employeeId, onSelectTask }) => {
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

  const handleReopen = (e) => {
    e.stopPropagation();
    if (window.confirm("Reopen task back to In-Progress?")) {
      updateTaskStatus(employeeId, data.id || data.task_title, "active");
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
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Completed
          </span>
        </div>

        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {data.task_title}
        </h3>

        <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {data.task_description}
        </p>

        {data.notes && (
          <div className="mt-3 p-2 rounded-lg bg-gray-950 border border-gray-800 text-xs text-gray-300">
            <span className="text-gray-400 font-medium">Notes: </span>
            {data.notes}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-mono">
          <span className="flex items-center gap-1">
            <IconCalendar className="w-3.5 h-3.5 text-gray-400" /> Due: {data.task_date}
          </span>
          <span className="text-[11px] text-emerald-400">Done</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 py-1.5 px-3 rounded-lg bg-gray-800 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5">
            <IconCheckCircle className="w-3.5 h-3.5" /> Finished
          </div>
          <button
            onClick={handleReopen}
            className="py-1.5 px-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium transition cursor-pointer"
          >
            Reopen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;
