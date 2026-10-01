import { useContext, useState } from "react";
import { Authcontext } from "../../context/Authprovider";
import {
  IconCalendar,
  IconCheck,
  IconUser,
} from "../common/Icons";

const CreateTask = ({ onTaskCreated }) => {
  const { userdata, createTask } = useContext(Authcontext);

  const [task_title, setTask_title] = useState("");
  const [task_date, setTask_date] = useState(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [task_asignto, setTask_asignto] = useState("");
  const [task_priority, setTask_priority] = useState("High");
  const [category, setCategory] = useState("Development");
  const [customCategory, setCustomCategory] = useState("");
  const [task_description, setTask_description] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employees = userdata || [];

  const handleTemplateSelect = (template) => {
    setTask_title(template.title);
    setTask_priority(template.priority);
    setCategory(template.category);
    setTask_description(template.description);
  };

  const templates = [
    {
      label: "Hotfix",
      title: "Investigate and Resolve API Latency Spike",
      priority: "Urgent",
      category: "Development",
      description: "Analyze error logs, trace database query slowdown, and deploy patch.",
    },
    {
      label: "Design Audit",
      title: "Accessibility & Component Design Review",
      priority: "High",
      category: "Design",
      description: "Perform accessibility audit across main dashboard flows and record findings.",
    },
    {
      label: "Client Review",
      title: "Prepare Client Deliverable Deck",
      priority: "Medium",
      category: "Product",
      description: "Compile sprint outcomes and progress metrics into review presentation.",
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    if (!task_title.trim()) {
      alert("Please provide a task title.");
      return;
    }

    const assignedEmployee = task_asignto || (employees.length > 0 ? employees[0].name : "");

    if (!assignedEmployee) {
      alert("Please select an employee to assign this task.");
      return;
    }

    setIsSubmitting(true);

    const finalCategory = category === "Custom" ? customCategory || "General" : category;

    const success = createTask({
      task_asignto: assignedEmployee,
      task_title,
      task_description,
      task_date,
      task_priority,
      category: finalCategory,
    });

    setIsSubmitting(false);

    if (success) {
      setTask_title("");
      setTask_description("");
      setCustomCategory("");
      if (onTaskCreated) onTaskCreated();
    }
  };

  return (
    <div className="bg-[#111827] rounded-xl p-5 sm:p-6 border border-[#1F2937]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#1F2937]">
        <div>
          <h2 className="text-base font-bold text-white">Create & Assign Deliverable</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Assign tasks to team members with tracking deadlines and priority.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium">Quick Fill:</span>
          {templates.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleTemplateSelect(tpl)}
              className="text-xs px-2.5 py-1 rounded bg-[#1F2937] hover:bg-[#374151] text-slate-300 hover:text-white transition cursor-pointer"
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-3.5">
            {/* Task Title */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Database schema migration"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                value={task_title}
                onChange={(e) => setTask_title(e.target.value)}
              />
            </div>

            {/* Assign To */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <IconUser className="w-3.5 h-3.5 text-slate-400" /> Assignee *
              </label>
              <select
                value={task_asignto || (employees[0]?.name || "")}
                onChange={(e) => setTask_asignto(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
              >
                {employees.map((emp) => (
                  <option key={emp.employee_id} value={emp.name} className="bg-[#111827]">
                    {emp.name} — {emp.role} ({emp.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date & Priority Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <IconCalendar className="w-3.5 h-3.5 text-slate-400" /> Due Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
                  value={task_date}
                  onChange={(e) => setTask_date(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Priority
                </label>
                <select
                  value={task_priority}
                  onChange={(e) => setTask_priority(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="Urgent" className="bg-[#111827]">Urgent (P0)</option>
                  <option value="High" className="bg-[#111827]">High (P1)</option>
                  <option value="Medium" className="bg-[#111827]">Medium (P2)</option>
                  <option value="Low" className="bg-[#111827]">Low (P3)</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Category
              </label>
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="Development" className="bg-[#111827]">Development</option>
                  <option value="Design" className="bg-[#111827]">Design</option>
                  <option value="Backend" className="bg-[#111827]">Backend</option>
                  <option value="DevOps" className="bg-[#111827]">DevOps</option>
                  <option value="Product" className="bg-[#111827]">Product</option>
                  <option value="Marketing" className="bg-[#111827]">Marketing</option>
                  <option value="Sales" className="bg-[#111827]">Sales</option>
                  <option value="Custom" className="bg-[#111827]">+ Custom...</option>
                </select>

                {category === "Custom" && (
                  <input
                    type="text"
                    placeholder="Enter category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Description & Scope *
              </label>
              <textarea
                required
                rows="6"
                placeholder="Enter task scope, deliverables, and specifications..."
                className="w-full resize-none rounded-lg p-3 text-xs bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-normal leading-relaxed focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                value={task_description}
                onChange={(e) => setTask_description(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <IconCheck className="w-4 h-4" /> Create Task
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
