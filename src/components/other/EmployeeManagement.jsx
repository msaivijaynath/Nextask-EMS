import { useContext, useState } from "react";
import { Authcontext } from "../../context/Authprovider";
import Avatar from "../common/Avatar";
import {
  IconBuilding,
  IconClose,
  IconEdit,
  IconMail,
  IconPhone,
  IconPlus,
  IconSearch,
  IconTrash,
} from "../common/Icons";

const EmployeeManagement = () => {
  const { userdata, addEmployee, deleteEmployee, updateEmployee } = useContext(Authcontext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [inspectedEmp, setInspectedEmp] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "123",
    role: "",
    department: "Engineering",
    phone: "+1 (555) 000-0000",
    avatar: "",
  });

  const employees = userdata || [];
  const departments = Array.from(new Set(employees.map((e) => e.department).filter(Boolean)));

  const filteredEmployees = employees.filter((emp) => {
    if (selectedDept !== "all" && emp.department !== selectedDept) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = emp.name.toLowerCase().includes(q);
      const matchEmail = emp.email.toLowerCase().includes(q);
      const matchRole = emp.role.toLowerCase().includes(q);
      const matchDept = emp.department.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchRole && !matchDept) return false;
    }
    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    addEmployee({
      ...formData,
      avatar:
        formData.avatar ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80`,
    });

    setShowAddModal(false);
    setFormData({
      name: "",
      email: "",
      password: "123",
      role: "",
      department: "Engineering",
      phone: "+1 (555) 000-0000",
      avatar: "",
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingEmp) return;
    updateEmployee(editingEmp.employee_id, editingEmp);
    setEditingEmp(null);
  };

  return (
    <div className="space-y-5">
      {/* Control Header */}
      <div className="bg-[#111827] rounded-xl p-4 sm:p-5 border border-[#1F2937] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        <div>
          <h2 className="text-base font-bold text-white">Employee Directory</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Team roster, roles, department alignment, and onboarding.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 sm:w-48">
            <IconSearch className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
          >
            <option value="all" className="bg-[#111827]">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d} className="bg-[#111827]">
                {d}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <IconPlus className="w-3.5 h-3.5" /> Onboard Member
          </button>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredEmployees.map((emp) => {
          const empTasks = emp.tasks || [];
          const completedCount = empTasks.filter((t) => t.completed || t.status === "completed").length;
          const activeCount = empTasks.filter((t) => t.active || t.status === "active").length;
          const newCount = empTasks.filter((t) => t.new_task || t.status === "new").length;
          const failedCount = empTasks.filter((t) => t.failed || t.status === "failed").length;

          return (
            <div
              key={emp.employee_id}
              className="bg-[#111827] rounded-xl p-4 sm:p-5 border border-[#1F2937] hover:border-[#374151] transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={emp.name}
                      src={emp.avatar}
                      className="w-11 h-11 text-sm font-semibold"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{emp.name}</h3>
                      <p className="text-xs text-slate-400">{emp.role}</p>
                      <span className="text-[10px] text-slate-500 font-mono">ID: {emp.employee_id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingEmp(emp)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1F2937] transition cursor-pointer"
                      title="Edit"
                    >
                      <IconEdit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Remove employee ${emp.name}?`)) {
                          deleteEmployee(emp.employee_id);
                        }
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition cursor-pointer"
                      title="Delete"
                    >
                      <IconTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3.5 space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-slate-400">
                    <IconMail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <IconBuilding className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{emp.department}</span>
                  </div>
                  {emp.phone && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <IconPhone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{emp.phone}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#1F2937] grid grid-cols-4 gap-1.5 text-center text-xs">
                  <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1F2937]">
                    <div className="font-bold text-blue-400">{newCount}</div>
                    <div className="text-[10px] text-slate-400">New</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1F2937]">
                    <div className="font-bold text-amber-400">{activeCount}</div>
                    <div className="text-[10px] text-slate-400">Active</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1F2937]">
                    <div className="font-bold text-emerald-400">{completedCount}</div>
                    <div className="text-[10px] text-slate-400">Done</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1F2937]">
                    <div className="font-bold text-rose-400">{failedCount}</div>
                    <div className="text-[10px] text-slate-400">Failed</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectedEmp(emp)}
                className="w-full mt-3 py-1.5 px-3 rounded-lg bg-[#1F2937] hover:bg-[#374151] text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
              >
                Inspect Assigned Tasks ({empTasks.length}) →
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111827] w-full max-w-md rounded-xl p-6 border border-[#374151] shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#1F2937] transition cursor-pointer"
            >
              <IconClose className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-white mb-1">Onboard Team Member</h2>
            <p className="text-xs text-slate-400 mb-4">Add a new employee to the directory.</p>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white font-mono font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Dev"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Engineering" className="bg-[#111827]">Engineering</option>
                    <option value="Product" className="bg-[#111827]">Product</option>
                    <option value="Design" className="bg-[#111827]">Design</option>
                    <option value="Sales" className="bg-[#111827]">Sales</option>
                    <option value="Marketing" className="bg-[#111827]">Marketing</option>
                    <option value="Operations" className="bg-[#111827]">Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#1F2937] text-slate-300 text-xs font-medium hover:bg-[#374151] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition cursor-pointer shadow-sm"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT */}
      {editingEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111827] w-full max-w-md rounded-xl p-6 border border-[#374151] shadow-2xl relative">
            <button
              onClick={() => setEditingEmp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#1F2937] transition cursor-pointer"
            >
              <IconClose className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-white mb-1">Edit Employee Profile</h2>
            <p className="text-xs text-slate-400 mb-4">Update member details.</p>

            <form onSubmit={handleEditSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingEmp.name}
                  onChange={(e) => setEditingEmp({ ...editingEmp, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editingEmp.email}
                    onChange={(e) => setEditingEmp({ ...editingEmp, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                  <input
                    type="text"
                    required
                    value={editingEmp.password}
                    onChange={(e) => setEditingEmp({ ...editingEmp, password: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white font-mono font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={editingEmp.role}
                    onChange={(e) => setEditingEmp({ ...editingEmp, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                  <select
                    value={editingEmp.department}
                    onChange={(e) => setEditingEmp({ ...editingEmp, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B0F19] border border-[#1F2937] text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Engineering" className="bg-[#111827]">Engineering</option>
                    <option value="Product" className="bg-[#111827]">Product</option>
                    <option value="Design" className="bg-[#111827]">Design</option>
                    <option value="Sales" className="bg-[#111827]">Sales</option>
                    <option value="Marketing" className="bg-[#111827]">Marketing</option>
                    <option value="Operations" className="bg-[#111827]">Operations</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEmp(null)}
                  className="px-3 py-1.5 rounded-lg bg-[#1F2937] text-slate-300 text-xs font-medium hover:bg-[#374151] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition cursor-pointer shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT */}
      {inspectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111827] w-full max-w-2xl max-h-[85vh] rounded-xl p-6 border border-[#374151] shadow-2xl flex flex-col relative overflow-hidden">
            <button
              onClick={() => setInspectedEmp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#1F2937] transition cursor-pointer"
            >
              <IconClose className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#1F2937]">
              <Avatar
                name={inspectedEmp.name}
                src={inspectedEmp.avatar}
                className="w-10 h-10 text-xs font-semibold"
              />
              <div>
                <h2 className="text-base font-bold text-white">{inspectedEmp.name} — Task Board</h2>
                <p className="text-xs text-slate-400">
                  {inspectedEmp.role} • {inspectedEmp.department}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {(inspectedEmp.tasks || []).length > 0 ? (
                (inspectedEmp.tasks || []).map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className="p-3 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{t.task_title}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1F2937] text-slate-300">
                        {t.status || (t.completed ? "Completed" : t.active ? "In-Progress" : t.failed ? "Failed" : "New")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{t.task_description}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                      <span>Due: {t.task_date}</span>
                      <span>Priority: {t.task_priority}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">No tasks currently assigned.</div>
              )}
            </div>

            <div className="pt-3.5 border-t border-[#1F2937] flex justify-end">
              <button
                onClick={() => setInspectedEmp(null)}
                className="px-3.5 py-1.5 rounded-lg bg-[#1F2937] text-white text-xs font-medium hover:bg-[#374151] transition cursor-pointer"
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

export default EmployeeManagement;
