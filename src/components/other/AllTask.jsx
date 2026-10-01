import { useContext, useState, useMemo } from "react";
import { Authcontext } from "../../context/Authprovider";
import {
  IconCalendar,
  IconCheckCircle,
  IconClose,
  IconDownload,
  IconKanban,
  IconSearch,
  IconTable,
  IconTrash,
  IconUser,
  IconXCircle,
} from "../common/Icons";
import Avatar from "../common/Avatar";

const AllTask = () => {
  const { userdata, updateTaskStatus, deleteTask } = useContext(Authcontext);

  const [viewMode, setViewMode] = useState("table"); // 'table' | 'kanban' | 'workload'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedTaskModal, setSelectedTaskModal] = useState(null);

  const employees = userdata || [];

  const allTasksWithEmp = useMemo(() => {
    const list = [];
    employees.forEach((emp) => {
      (emp.tasks || []).forEach((t) => {
        list.push({
          ...t,
          employeeId: emp.employee_id,
          employeeName: emp.name,
          employeeAvatar: emp.avatar,
          employeeDepartment: emp.department,
          employeeRole: emp.role,
        });
      });
    });
    return list;
  }, [employees]);

  const totalTasksCount = allTasksWithEmp.length;
  const newTasksCount = allTasksWithEmp.filter((t) => t.new_task || t.status === "new").length;
  const activeTasksCount = allTasksWithEmp.filter((t) => t.active || t.status === "active").length;
  const completedTasksCount = allTasksWithEmp.filter((t) => t.completed || t.status === "completed").length;
  const failedTasksCount = allTasksWithEmp.filter((t) => t.failed || t.status === "failed").length;

  const filteredTasks = useMemo(() => {
    return allTasksWithEmp.filter((task) => {
      if (selectedEmployee !== "all" && task.employeeId !== selectedEmployee) return false;
      if (selectedStatus === "new" && !task.new_task && task.status !== "new") return false;
      if (selectedStatus === "active" && !task.active && task.status !== "active") return false;
      if (selectedStatus === "completed" && !task.completed && task.status !== "completed") return false;
      if (selectedStatus === "failed" && !task.failed && task.status !== "failed") return false;

      if (
        selectedPriority !== "all" &&
        task.task_priority?.toLowerCase() !== selectedPriority.toLowerCase()
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.task_title?.toLowerCase().includes(q);
        const matchesEmp = task.employeeName?.toLowerCase().includes(q);
        const matchesCat = task.category?.toLowerCase().includes(q);
        const matchesDesc = task.task_description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesEmp && !matchesCat && !matchesDesc) return false;
      }

      return true;
    });
  }, [allTasksWithEmp, selectedEmployee, selectedStatus, selectedPriority, searchQuery]);

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

  const renderStatusBadge = (task) => {
    if (task.completed || task.status === "completed") {
      return (
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium px-2 py-0.5 rounded inline-flex items-center gap-1">
          <IconCheckCircle className="w-3 h-3 text-emerald-400" /> Completed
        </span>
      );
    }
    if (task.failed || task.status === "failed") {
      return (
        <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-medium px-2 py-0.5 rounded inline-flex items-center gap-1">
          <IconXCircle className="w-3 h-3 text-red-400" /> Failed
        </span>
      );
    }
    if (task.active || task.status === "active") {
      return (
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-medium px-2 py-0.5 rounded inline-flex items-center gap-1">
          In-Progress
        </span>
      );
    }
    return (
      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-medium px-2 py-0.5 rounded inline-flex items-center gap-1">
        New
      </span>
    );
  };

  const handleExportCSV = () => {
    if (allTasksWithEmp.length === 0) {
      alert("No task data to export.");
      return;
    }

    const headers = ["Task ID", "Title", "Assignee", "Department", "Priority", "Category", "Due Date", "Status"];
    const rows = allTasksWithEmp.map((t) => [
      t.id || "N/A",
      `"${(t.task_title || "").replace(/"/g, '""')}"`,
      `"${t.employeeName}"`,
      `"${t.employeeDepartment}"`,
      t.task_priority || "Normal",
      t.category || "General",
      t.task_date || "",
      t.status || (t.completed ? "completed" : t.active ? "active" : t.failed ? "failed" : "new"),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Tasks_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-gray-900 rounded-xl p-3.5 border border-gray-800">
          <div className="text-gray-400 text-xs font-medium">Total Deliverables</div>
          <div className="text-xl font-bold text-white mt-0.5">{totalTasksCount}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3.5 border border-gray-800">
          <div className="text-gray-400 text-xs font-medium">New Tasks</div>
          <div className="text-xl font-bold text-blue-400 mt-0.5">{newTasksCount}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3.5 border border-gray-800">
          <div className="text-gray-400 text-xs font-medium">In-Progress</div>
          <div className="text-xl font-bold text-amber-400 mt-0.5">{activeTasksCount}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3.5 border border-gray-800">
          <div className="text-gray-400 text-xs font-medium">Completed</div>
          <div className="text-xl font-bold text-emerald-400 mt-0.5">{completedTasksCount}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3.5 border border-gray-800 col-span-2 sm:col-span-1">
          <div className="text-gray-400 text-xs font-medium">Failed</div>
          <div className="text-xl font-bold text-red-400 mt-0.5">{failedTasksCount}</div>
        </div>
      </div>

      {/* Main Table & Controls */}
      <div className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-800">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4 pb-3.5 border-b border-gray-800">
          {/* View switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "table"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <IconTable className="w-3.5 h-3.5" /> Table
            </button>

            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "kanban"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <IconKanban className="w-3.5 h-3.5" /> Kanban
            </button>

            <button
              onClick={() => setViewMode("workload")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "workload"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <IconUser className="w-3.5 h-3.5" /> Team Matrix
            </button>
          </div>

          {/* Filters & Export */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-48">
              <IconSearch className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 placeholder-gray-500 font-medium focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 font-medium cursor-pointer focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Assignees</option>
              {employees.map((e) => (
                <option key={e.employee_id} value={e.employee_id}>
                  {e.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 font-medium cursor-pointer focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="active">In-Progress</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
            >
              <IconDownload className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <div className="overflow-x-auto">
            {filteredTasks.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="pb-2.5 pl-2">Task</th>
                    <th className="pb-2.5 px-3">Assignee</th>
                    <th className="pb-2.5 px-3">Category</th>
                    <th className="pb-2.5 px-3">Priority</th>
                    <th className="pb-2.5 px-3">Due Date</th>
                    <th className="pb-2.5 px-3">Status</th>
                    <th className="pb-2.5 pr-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-xs">
                  {filteredTasks.map((task) => (
                    <tr
                      key={`${task.employeeId}-${task.id || task.task_title}`}
                      className="hover:bg-gray-800/40 transition cursor-pointer"
                      onClick={() => setSelectedTaskModal(task)}
                    >
                      <td className="py-3 pl-2 pr-3 max-w-xs">
                        <div className="font-semibold text-white truncate">{task.task_title}</div>
                        <div className="text-[11px] text-gray-400 truncate mt-0.5">{task.task_description}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Avatar name={task.employeeName} src={task.employeeAvatar} className="w-6 h-6 text-[10px]" />
                          <div>
                            <div className="text-gray-200 font-medium">{task.employeeName}</div>
                            <div className="text-[10px] text-gray-500">{task.employeeDepartment}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                          {task.category || "General"}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${getPriorityBadge(task.task_priority)}`}>
                          {task.task_priority || "Normal"}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-gray-300">
                        {task.task_date}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">{renderStatusBadge(task)}</td>
                      <td className="py-3 pr-2 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <select
                            value={task.status || (task.completed ? "completed" : task.active ? "active" : task.failed ? "failed" : "new")}
                            onChange={(e) =>
                              updateTaskStatus(task.employeeId, task.id || task.task_title, e.target.value)
                            }
                            className="px-2 py-1 text-[11px] rounded bg-gray-950 border border-gray-800 text-gray-300 cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="active">In-Progress</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                          </select>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete task "${task.task_title}"?`)) {
                                deleteTask(task.employeeId, task.id || task.task_title);
                              }
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-400 transition cursor-pointer"
                          >
                            <IconTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-400 text-xs">No tasks match criteria.</div>
            )}
          </div>
        )}

        {/* KANBAN VIEW */}
        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 items-start">
            {[
              { id: "new", title: "New Assigned", badgeClass: "bg-blue-500/10 text-blue-400 border border-blue-500/20", items: filteredTasks.filter((t) => t.new_task || t.status === "new") },
              { id: "active", title: "In-Progress", badgeClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20", items: filteredTasks.filter((t) => t.active || t.status === "active") },
              { id: "completed", title: "Completed", badgeClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", items: filteredTasks.filter((t) => t.completed || t.status === "completed") },
              { id: "failed", title: "Failed / Blocked", badgeClass: "bg-red-500/10 text-red-400 border border-red-500/20", items: filteredTasks.filter((t) => t.failed || t.status === "failed") },
            ].map((col) => (
              <div key={col.id} className="bg-gray-950 rounded-xl p-3 border border-gray-800 min-h-[360px] flex flex-col">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-800">
                  <span className="text-xs font-semibold text-white">{col.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${col.badgeClass}`}>
                    {col.items.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
                  {col.items.length > 0 ? (
                    col.items.map((task) => (
                      <div
                        key={`${task.employeeId}-${task.id || task.task_title}`}
                        onClick={() => setSelectedTaskModal(task)}
                        className="bg-gray-900 rounded-lg p-3 border border-gray-800 hover:border-gray-700 transition cursor-pointer space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded uppercase ${getPriorityBadge(task.task_priority)}`}>
                            {task.task_priority}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">{task.task_date}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-white line-clamp-2">{task.task_title}</h4>
                        <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Avatar name={task.employeeName} src={task.employeeAvatar} className="w-5 h-5 text-[9px]" />
                            <span className="truncate max-w-[80px]">{task.employeeName}</span>
                          </div>
                          <div onClick={(e) => e.stopPropagation()}>
                            {col.id === "new" && (
                              <button
                                onClick={() => updateTaskStatus(task.employeeId, task.id || task.task_title, "active")}
                                className="text-[10px] px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 font-medium hover:bg-indigo-600/40"
                              >
                                Start →
                              </button>
                            )}
                            {col.id === "active" && (
                              <button
                                onClick={() => updateTaskStatus(task.employeeId, task.id || task.task_title, "completed")}
                                className="text-[10px] px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-300 font-medium hover:bg-emerald-600/40"
                              >
                                Done ✓
                              </button>
                            )}
                            {col.id === "failed" && (
                              <button
                                onClick={() => updateTaskStatus(task.employeeId, task.id || task.task_title, "active")}
                                className="text-[10px] px-2 py-0.5 rounded bg-amber-600/30 text-amber-300 font-medium hover:bg-amber-600/40"
                              >
                                Retry
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-xs">No tasks in lane</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WORKLOAD VIEW */}
        {viewMode === "workload" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {employees.map((emp) => {
              const empTasks = emp.tasks || [];
              const completed = empTasks.filter((t) => t.completed || t.status === "completed").length;
              const rate = empTasks.length > 0 ? Math.round((completed / empTasks.length) * 100) : 0;

              return (
                <div key={emp.employee_id} className="bg-gray-950 rounded-xl p-4 border border-gray-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={emp.name} src={emp.avatar} className="w-10 h-10 text-xs" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{emp.name}</h4>
                      <p className="text-[11px] text-gray-400">{emp.role} • {emp.department}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                    <div className="p-1.5 rounded bg-gray-900 border border-gray-800">
                      <div className="font-bold text-blue-400">{emp.taskNumber?.new_task ?? 0}</div>
                      <div className="text-[10px] text-gray-400">New</div>
                    </div>
                    <div className="p-1.5 rounded bg-gray-900 border border-gray-800">
                      <div className="font-bold text-amber-400">{emp.taskNumber?.active ?? 0}</div>
                      <div className="text-[10px] text-gray-400">Active</div>
                    </div>
                    <div className="p-1.5 rounded bg-gray-900 border border-gray-800">
                      <div className="font-bold text-emerald-400">{emp.taskNumber?.completed ?? 0}</div>
                      <div className="text-[10px] text-gray-400">Done</div>
                    </div>
                    <div className="p-1.5 rounded bg-gray-900 border border-gray-800">
                      <div className="font-bold text-red-400">{emp.taskNumber?.failed ?? 0}</div>
                      <div className="text-[10px] text-gray-400">Failed</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Completion Score</span>
                      <span className="font-mono text-emerald-300">{rate}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rate}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Task Modal */}
      {selectedTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 border border-gray-700 shadow-2xl relative">
            <button
              onClick={() => setSelectedTaskModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800 transition cursor-pointer"
            >
              <IconClose className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${getPriorityBadge(selectedTaskModal.task_priority)}`}>
                {selectedTaskModal.task_priority} Priority
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                {selectedTaskModal.category || "General"}
              </span>
              {renderStatusBadge(selectedTaskModal)}
            </div>

            <h2 className="text-base font-bold text-white mb-2">{selectedTaskModal.task_title}</h2>

            <div className="flex items-center gap-2.5 mb-3.5 p-2.5 rounded-lg bg-gray-950 border border-gray-800">
              <Avatar name={selectedTaskModal.employeeName} src={selectedTaskModal.employeeAvatar} className="w-7 h-7 text-[10px]" />
              <div>
                <div className="text-xs font-semibold text-white">{selectedTaskModal.employeeName}</div>
                <div className="text-[10px] text-gray-400">{selectedTaskModal.employeeRole} • {selectedTaskModal.employeeDepartment}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-gray-950 border border-gray-800 text-xs text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
              {selectedTaskModal.task_description}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-2.5 rounded bg-gray-800/50 border border-gray-800">
                <div className="text-gray-400 text-[11px] mb-0.5">Due Date</div>
                <div className="font-semibold text-white flex items-center gap-1">
                  <IconCalendar className="w-3.5 h-3.5 text-gray-400" /> {selectedTaskModal.task_date}
                </div>
              </div>
              <div className="p-2.5 rounded bg-gray-800/50 border border-gray-800">
                <div className="text-gray-400 text-[11px] mb-0.5">Created Date</div>
                <div className="font-semibold text-white">{selectedTaskModal.created_at || "N/A"}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  if (window.confirm("Delete deliverable?")) {
                    deleteTask(selectedTaskModal.employeeId, selectedTaskModal.id || selectedTaskModal.task_title);
                    setSelectedTaskModal(null);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-red-950/40 text-red-300 text-xs font-medium hover:bg-red-900/50 transition cursor-pointer flex items-center gap-1.5"
              >
                <IconTrash className="w-3.5 h-3.5" /> Delete
              </button>

              <button
                onClick={() => setSelectedTaskModal(null)}
                className="px-3.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;
