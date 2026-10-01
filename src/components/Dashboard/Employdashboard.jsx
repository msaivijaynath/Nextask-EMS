import { useState } from "react";
import Header from "../other/Header";
import TaskListNumber from "../other/TaskListNumber";
import TaskList from "../Tasklist/TaskList";

const Employdashboard = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] p-4 sm:p-6 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <Header data={data} subtitle="Workspace" />

        {/* Dynamic Metric Stat Cards */}
        <TaskListNumber
          data={data}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Task List Grid with search, filter, and interactive cards */}
        <TaskList
          data={data}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Footer info */}
      <footer className="mt-10 pt-4 border-t border-[#1F2937] text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>NexTask EMS • {data?.name || "Employee"}</div>
        <div className="text-[11px] text-slate-500">Local State Synced</div>
      </footer>
    </div>
  );
};

export default Employdashboard;
