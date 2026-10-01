import { useState, useMemo } from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";
import {
  IconClose,
  IconSearch,
  IconCalendar,
} from "../common/Icons";

const TaskList = ({ data, activeFilter = "all", onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedTaskModal, setSelectedTaskModal] = useState(null);

  const tasks = data?.tasks || [];
  const employeeId = data?.employee_id;

  const categories = useMemo(() => {
    const cats = new Set();
    tasks.forEach((t) => {
      if (t.category) cats.add(t.category);
    });
    return Array.from(cats);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (activeFilter === "new" && !task.new_task && task.status !== "new") return false;
        if (activeFilter === "active" && !task.active && task.status !== "active") return false;
        if (activeFilter === "completed" && !task.completed && task.status !== "completed") return false;
        if (activeFilter === "failed" && !task.failed && task.status !== "failed") return false;

        if (
          priorityFilter !== "all" &&
          task.task_priority?.toLowerCase() !== priorityFilter.toLowerCase()
        ) {
          return false;
        }

        if (categoryFilter !== "all" && task.category !== categoryFilter) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = task.task_title?.toLowerCase().includes(q);
          const matchesDesc = task.task_description?.toLowerCase().includes(q);
          const matchesCat = task.category?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date-asc") {
          return new Date(a.task_date || 0) - new Date(b.task_date || 0);
        }
        if (sortBy === "date-desc") {
          return new Date(b.task_date || 0) - new Date(a.task_date || 0);
        }
        if (sortBy === "priority") {
          const order = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (order[b.task_priority?.toLowerCase()] || 0) - (order[a.task_priority?.toLowerCase()] || 0);
        }
        return 0;
      });
  }, [tasks, activeFilter, priorityFilter, categoryFilter, searchQuery, sortBy]);

  const filterTabs = [
    { id: "all", label: "All Tasks", count: tasks.length },
    { id: "new", label: "New", count: tasks.filter((t) => t.new_task || t.status === "new").length },
    { id: "active", label: "In-Progress", count: tasks.filter((t) => t.active || t.status === "active").length },
    { id: "completed", label: "Completed", count: tasks.filter((t) => t.completed || t.status === "completed").length },
    { id: "failed", label: "Failed", count: tasks.filter((t) => t.failed || t.status === "failed").length },
  ];

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange && onFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-900 text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-52">
            <IconSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 placeholder-gray-500 font-medium focus:border-indigo-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <IconClose className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Priority Select */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 font-medium cursor-pointer focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Category Select */}
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 font-medium cursor-pointer focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-200 font-medium cursor-pointer focus:border-indigo-500 focus:outline-none"
          >
            <option value="default">Sort: Default</option>
            <option value="date-asc">Due (Earliest)</option>
            <option value="date-desc">Due (Latest)</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map((task, idx) => {
            const isNew = task.new_task || task.status === "new";
            const isActive = task.active || task.status === "active";
            const isCompleted = task.completed || task.status === "completed";
            const isFailed = task.failed || task.status === "failed";

            if (isActive) {
              return (
                <AcceptTask
                  key={task.id || idx}
                  data={task}
                  employeeId={employeeId}
                  onSelectTask={setSelectedTaskModal}
                />
              );
            }
            if (isNew) {
              return (
                <NewTask
                  key={task.id || idx}
                  data={task}
                  employeeId={employeeId}
                  onSelectTask={setSelectedTaskModal}
                />
              );
            }
            if (isCompleted) {
              return (
                <CompleteTask
                  key={task.id || idx}
                  data={task}
                  employeeId={employeeId}
                  onSelectTask={setSelectedTaskModal}
                />
              );
            }
            if (isFailed) {
              return (
                <FailedTask
                  key={task.id || idx}
                  data={task}
                  employeeId={employeeId}
                  onSelectTask={setSelectedTaskModal}
                />
              );
            }
            return (
              <NewTask
                key={task.id || idx}
                data={task}
                employeeId={employeeId}
                onSelectTask={setSelectedTaskModal}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-gray-900 rounded-xl p-10 text-center border border-gray-800 flex flex-col items-center justify-center my-4">
          <h3 className="text-sm font-semibold text-white mb-1">No tasks to display</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
            {searchQuery || priorityFilter !== "all" || categoryFilter !== "all" || activeFilter !== "all"
              ? "No tasks match your selected filter criteria."
              : "No tasks are assigned in this section."}
          </p>
          {(searchQuery || priorityFilter !== "all" || categoryFilter !== "all" || activeFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setPriorityFilter("all");
                setCategoryFilter("all");
                onFilterChange && onFilterChange("all");
              }}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Task Details Modal */}
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
              <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-gray-800 text-gray-200">
                {selectedTaskModal.task_priority} Priority
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                {selectedTaskModal.category || "General"}
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-mono bg-gray-950 text-gray-400">
                ID: {selectedTaskModal.id || "N/A"}
              </span>
            </div>

            <h2 className="text-base font-bold text-white mb-3">{selectedTaskModal.task_title}</h2>

            <div className="p-3.5 rounded-lg bg-gray-950 border border-gray-800 text-xs text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
              {selectedTaskModal.task_description}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                <div className="text-gray-400 text-[11px] mb-0.5">Due Date</div>
                <div className="font-semibold text-white flex items-center gap-1">
                  <IconCalendar className="w-3.5 h-3.5 text-gray-400" /> {selectedTaskModal.task_date}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                <div className="text-gray-400 text-[11px] mb-0.5">Assigned To</div>
                <div className="font-semibold text-white">{data?.name}</div>
              </div>
            </div>

            {selectedTaskModal.notes && (
              <div className="p-3 rounded-lg bg-gray-950 border border-emerald-900/40 text-xs text-emerald-300 mb-4">
                <div className="font-semibold text-emerald-200 mb-1">Notes:</div>
                <div>{selectedTaskModal.notes}</div>
              </div>
            )}

            {selectedTaskModal.failed_reason && (
              <div className="p-3 rounded-lg bg-gray-950 border border-red-900/40 text-xs text-red-300 mb-4">
                <div className="font-semibold text-red-200 mb-1">Roadblock Reason:</div>
                <div>{selectedTaskModal.failed_reason}</div>
              </div>
            )}

            <div className="flex justify-end mt-2">
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

export default TaskList;
