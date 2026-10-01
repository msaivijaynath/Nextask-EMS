import { useState } from "react";
import AllTask from "../other/AllTask";
import CreateTask from "../other/CreateTask";
import EmployeeManagement from "../other/EmployeeManagement";
import Header from "../other/Header";
import { IconDashboard, IconPlus, IconUsers } from "../common/Icons";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'create' | 'team'

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] p-4 sm:p-6 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <Header subtitle="Admin Console" />

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white"
                : "bg-[#111827] hover:bg-[#1F2937] text-slate-300 border border-[#1F2937]"
            }`}
          >
            <IconDashboard className="w-4 h-4" /> Deliverables Matrix & Board
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "create"
                ? "bg-indigo-600 text-white"
                : "bg-[#111827] hover:bg-[#1F2937] text-slate-300 border border-[#1F2937]"
            }`}
          >
            <IconPlus className="w-4 h-4" /> Create Deliverable
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "team"
                ? "bg-indigo-600 text-white"
                : "bg-[#111827] hover:bg-[#1F2937] text-slate-300 border border-[#1F2937]"
            }`}
          >
            <IconUsers className="w-4 h-4" /> Employee Directory
          </button>
        </div>

        {/* Active Tab View */}
        <main className="space-y-5">
          {activeTab === "overview" && <AllTask />}
          {activeTab === "create" && (
            <CreateTask onTaskCreated={() => setActiveTab("overview")} />
          )}
          {activeTab === "team" && <EmployeeManagement />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-10 pt-4 border-t border-[#1F2937] text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>NexTask Enterprise EMS</div>
        <div className="text-[11px] text-slate-500">Corporate Management Workspace</div>
      </footer>
    </div>
  );
};

export default Admindashboard;
