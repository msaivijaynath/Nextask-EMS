import { createContext, useEffect, useState, useCallback } from "react";
import { Getlocalstorage, recalculateTaskNumbers, resetAllDataToDefault } from "../utils/Localstorage";
import ToastContainer from "../components/common/ToastContainer";

export const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [userdata, setUserdata] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'employee' | null
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const showToast = useCallback((message, type = "success", title = "") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initialize storage safely once on mount
  useEffect(() => {
    const { employeesdata, admindata } = Getlocalstorage();
    setUserdata(employeesdata || []);
    setAdminData(admindata || []);

    const storedSession = localStorage.getItem("loggedinuser");
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        if (parsed?.role === "admin") {
          setUserRole("admin");
          setLoggedInUser(admindata[0] || { name: "Alex Morgan", role: "Administrator" });
        } else if (parsed?.role === "employee" && parsed?.data) {
          // Match with latest updated employee record
          const currentEmp = (employeesdata || []).find(
            (e) => e.employee_id === parsed.data.employee_id || e.email === parsed.data.email
          );
          setUserRole("employee");
          setLoggedInUser(currentEmp || parsed.data);
        }
      } catch (err) {
        console.error("Failed to restore auth session:", err);
      }
    }
  }, []);

  // Helper to persist updated employee list and update reactive loggedInUser state
  const persistEmployees = useCallback((updatedEmployees) => {
    setUserdata(updatedEmployees);
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));

    // Update loggedInUser if an employee is currently logged in
    setLoggedInUser((prev) => {
      if (!prev || !prev.employee_id) return prev;
      const updatedMatch = updatedEmployees.find((e) => e.employee_id === prev.employee_id);
      if (updatedMatch) {
        localStorage.setItem(
          "loggedinuser",
          JSON.stringify({ role: "employee", data: updatedMatch })
        );
        return updatedMatch;
      }
      return prev;
    });
  }, []);

  // Handle Login
  const handleLogin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check Admin
    const isAdmin =
      (cleanEmail === "admin@example.com" || cleanEmail === "admin@gmail.com") &&
      cleanPass === "123";

    if (isAdmin) {
      const adminObj = adminData[0] || { name: "Alex Morgan", email: "admin@example.com" };
      setUserRole("admin");
      setLoggedInUser(adminObj);
      localStorage.setItem("loggedinuser", JSON.stringify({ role: "admin", data: adminObj }));
      showToast(`Welcome back, ${adminObj.name}!`, "success", "Admin Login");
      return true;
    }

    // Check Employee
    const foundEmployee = userdata.find(
      (e) => e.email.toLowerCase() === cleanEmail && e.password === cleanPass
    );

    if (foundEmployee) {
      setUserRole("employee");
      setLoggedInUser(foundEmployee);
      localStorage.setItem(
        "loggedinuser",
        JSON.stringify({ role: "employee", data: foundEmployee })
      );
      showToast(`Welcome back, ${foundEmployee.name}!`, "success", "Employee Login");
      return true;
    }

    showToast("Invalid email or password. Try one-click demo login below.", "error", "Auth Failed");
    return false;
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedinuser");
    setUserRole(null);
    setLoggedInUser(null);
    showToast("You have been safely signed out.", "info", "Logged Out");
  };

  // Create / Assign Task
  const createTask = (taskData) => {
    const { task_asignto, task_title, task_description, task_date, task_priority, category } = taskData;

    const targetEmp = userdata.find(
      (emp) =>
        emp.name.trim().toLowerCase() === task_asignto.trim().toLowerCase() ||
        emp.employee_id.toLowerCase() === task_asignto.trim().toLowerCase()
    );

    if (!targetEmp) {
      showToast(`Employee "${task_asignto}" not found.`, "error", "Task Assignment Failed");
      return false;
    }

    const taskId = `TSK-${Math.floor(100 + Math.random() * 900)}`;
    const newTask = {
      id: taskId,
      task_title: task_title.trim(),
      task_description: task_description.trim(),
      task_date: task_date || new Date().toISOString().split("T")[0],
      task_priority: task_priority || "Medium",
      category: category || "General",
      status: "new",
      active: false,
      completed: false,
      failed: false,
      new_task: true,
      created_at: new Date().toISOString().split("T")[0],
    };

    const updatedEmployees = userdata.map((emp) => {
      if (emp.employee_id === targetEmp.employee_id) {
        const updatedTasks = [newTask, ...(emp.tasks || [])];
        return {
          ...emp,
          tasks: updatedTasks,
          taskNumber: recalculateTaskNumbers(updatedTasks),
        };
      }
      return emp;
    });

    persistEmployees(updatedEmployees);
    showToast(`Task "${task_title}" assigned to ${targetEmp.name}`, "success", "Task Created");
    return true;
  };

  // Update Task Status (Accept, Complete, Fail, Reopen, Edit)
  const updateTaskStatus = (employeeId, taskId, newStatus, extraData = {}) => {
    const updatedEmployees = userdata.map((emp) => {
      if (emp.employee_id === employeeId) {
        const updatedTasks = (emp.tasks || []).map((task) => {
          if (task.id === taskId || task.task_title === taskId) {
            const updated = {
              ...task,
              ...extraData,
              status: newStatus,
              new_task: newStatus === "new",
              active: newStatus === "active",
              completed: newStatus === "completed",
              failed: newStatus === "failed",
            };
            if (newStatus === "completed") {
              updated.completed_at = new Date().toISOString().split("T")[0];
            }
            return updated;
          }
          return task;
        });

        return {
          ...emp,
          tasks: updatedTasks,
          taskNumber: recalculateTaskNumbers(updatedTasks),
        };
      }
      return emp;
    });

    persistEmployees(updatedEmployees);

    const statusLabels = {
      active: "accepted & marked In-Progress",
      completed: "marked as Completed 🎉",
      failed: "marked as Failed",
      new: "reset to New",
    };

    showToast(`Task ${statusLabels[newStatus] || newStatus}`, "success", "Status Updated");
  };

  // Delete Task
  const deleteTask = (employeeId, taskId) => {
    const updatedEmployees = userdata.map((emp) => {
      if (emp.employee_id === employeeId) {
        const updatedTasks = (emp.tasks || []).filter(
          (task) => task.id !== taskId && task.task_title !== taskId
        );
        return {
          ...emp,
          tasks: updatedTasks,
          taskNumber: recalculateTaskNumbers(updatedTasks),
        };
      }
      return emp;
    });

    persistEmployees(updatedEmployees);
    showToast("Task permanently removed.", "info", "Task Deleted");
  };

  // Add Employee
  const addEmployee = (empData) => {
    const newId = `EMP00${userdata.length + 1}`;
    const newEmp = {
      employee_id: newId,
      name: empData.name.trim(),
      email: empData.email.trim().toLowerCase(),
      password: empData.password || "123",
      role: empData.role || "Team Member",
      department: empData.department || "Engineering",
      avatar:
        empData.avatar ||
        `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80`,
      phone: empData.phone || "+1 (555) 000-1122",
      joinDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      taskNumber: { active: 0, completed: 0, failed: 0, new_task: 0 },
      tasks: [],
    };

    const updated = [...userdata, newEmp];
    persistEmployees(updated);
    showToast(`Employee ${newEmp.name} onboarded successfully!`, "success", "Employee Added");
    return newEmp;
  };

  // Update Employee
  const updateEmployee = (employeeId, updatedFields) => {
    const updated = userdata.map((emp) => {
      if (emp.employee_id === employeeId) {
        return { ...emp, ...updatedFields };
      }
      return emp;
    });
    persistEmployees(updated);
    showToast("Employee details updated.", "success", "Employee Updated");
  };

  // Delete Employee
  const deleteEmployee = (employeeId) => {
    const target = userdata.find((e) => e.employee_id === employeeId);
    const updated = userdata.filter((emp) => emp.employee_id !== employeeId);
    persistEmployees(updated);
    showToast(`Employee ${target?.name || employeeId} deleted.`, "info", "Employee Removed");
  };

  // Reset demo data
  const handleResetData = () => {
    const { employeesdata, admindata } = resetAllDataToDefault();
    setUserdata(employeesdata);
    setAdminData(admindata);
    if (userRole === "employee") {
      setLoggedInUser(employeesdata[0]);
    }
    showToast("System database reset to initial demo state.", "info", "Data Reset");
  };

  return (
    <Authcontext.Provider
      value={{
        userdata,
        setUserdata,
        adminData,
        userRole,
        setUserRole,
        loggedInUser,
        setLoggedInUser,
        handleLogin,
        handleLogout,
        createTask,
        updateTaskStatus,
        deleteTask,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        handleResetData,
        showToast,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Authcontext.Provider>
  );
};

export default Authprovider;
