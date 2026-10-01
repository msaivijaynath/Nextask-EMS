const TaskListNumber = ({ data, activeFilter, onFilterChange }) => {
  const taskNumber = data?.taskNumber || { new_task: 0, completed: 0, active: 0, failed: 0 };
  const totalTasks =
    (taskNumber.new_task || 0) +
    (taskNumber.active || 0) +
    (taskNumber.completed || 0) +
    (taskNumber.failed || 0);

  const completionRate =
    totalTasks > 0 ? Math.round(((taskNumber.completed || 0) / totalTasks) * 100) : 0;

  const stats = [
    {
      id: "new",
      label: "New Assigned",
      count: taskNumber.new_task ?? 0,
      textColor: "text-blue-400",
      subtext: "Awaiting review",
    },
    {
      id: "active",
      label: "In-Progress",
      count: taskNumber.active ?? 0,
      textColor: "text-amber-400",
      subtext: "Active work",
    },
    {
      id: "completed",
      label: "Completed",
      count: taskNumber.completed ?? 0,
      textColor: "text-emerald-400",
      subtext: "Finished",
    },
    {
      id: "failed",
      label: "Failed / Overdue",
      count: taskNumber.failed ?? 0,
      textColor: "text-red-400",
      subtext: "Roadblocks",
    },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((item) => {
          const isSelected = activeFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onFilterChange && onFilterChange(isSelected ? "all" : item.id)}
              className={`p-4 rounded-xl bg-gray-900 border text-left transition cursor-pointer ${
                isSelected
                  ? "border-indigo-500 bg-gray-800"
                  : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/60"
              }`}
            >
              <div className="text-xs font-medium text-gray-400 mb-1">
                {item.label}
              </div>
              <div className={`text-2xl sm:text-3xl font-bold ${item.textColor} tracking-tight`}>
                {item.count}
              </div>
              <div className="mt-2 text-[11px] text-gray-500 flex items-center justify-between">
                <span>{item.subtext}</span>
                <span className="text-gray-400 font-medium">{isSelected ? "Viewing" : "Filter →"}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Completion Summary Bar */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-gray-300 flex items-center gap-2">
          <span className="font-semibold text-white">Deliverable Progress:</span>
          <span>
            {taskNumber.completed || 0} of {totalTasks} tasks completed ({completionRate}%)
          </span>
        </div>

        <div className="w-full sm:w-64 flex items-center gap-2.5">
          <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="text-xs font-mono text-gray-400 font-medium">{completionRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default TaskListNumber;
