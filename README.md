# NexTask — Enterprise Employee & Task Management System (EMS)

A modern, high-performance, dark-mode Employee and Task Management System built with **React 19**, **Vite**, and custom **Glassmorphism CSS Design Tokens**.

---

## 🌟 Key Features & Enhancements

### 1. 👑 Executive Admin Portal
- **Company Task Matrix & Kanban Board**:
  - Switch between **Table View**, **Interactive Kanban Board** (New, In-Progress, Completed, Failed lanes), and **Team Matrix View**.
  - Search by task title, description, category, or employee name.
  - Multi-dimensional filters: Filter by Employee, Status, Priority (Urgent, High, Medium, Low).
  - Quick action controls: Change task status directly or delete deliverables.
  - **CSV Report Export**: Download full organizational deliverables and task metrics report.
- **Task Delegation Hub (`CreateTask`)**:
  - Assign deliverables to employees via interactive dropdown with names, roles, and departments.
  - Priority pills (`Urgent (P0)`, `High (P1)`, `Medium (P2)`, `Low (P3)`).
  - Category selector with custom tags.
  - Quick 1-click **Task Templates** (Hotfix, UI Design, Sales Review, Security Audit).
- **Team Directory & Employee Onboarding (`EmployeeManagement`)**:
  - View all team members with department badges, contact info, and active task stats.
  - Onboard new employees with immediate login capability.
  - Edit employee profiles or remove members.
  - "Inspect Assigned Tasks" modal to review deliverables for any employee.

---

### 2. 💼 Employee Workspace Dashboard
- **Interactive KPI Stat Cards**:
  - Real-time counters for **New Assigned**, **In-Progress**, **Completed**, and **Failed** tasks.
  - Interactive click-to-filter capability on each card.
  - Deliverable Completion Rate & Progress Score bar.
- **Task Lifecycle & Actions**:
  - **New Tasks**: Accept task (moves to In-Progress) or Decline with reason.
  - **In-Progress Tasks**: Mark Done (with optional completion outcome notes) or Report Roadblock / Fail.
  - **Completed Tasks**: View delivery notes, completion date, or reopen if revisions needed.
  - **Failed Tasks**: View roadblock explanation and 1-click Retry/Resume task.
- **Search, Filter & Sorting**:
  - Real-time text search, priority filter, category filter, and due-date sorting.
  - Detailed Task Modal view.

---

### 3. 🔐 Smart Authentication & Demo Access
- **1-Click Demo Login Chips** on the Login screen:
  - 👑 **Admin**: `admin@example.com` / `123`
  - 👨‍💻 **John Doe** (Senior Dev): `john.doe@example.com` / `123`
  - 📊 **Jane Smith** (Product Manager): `jane.smith@example.com` / `123`
  - 🎨 **Emily Davis** (Lead Designer): `emily.davis@example.com` / `123`
  - 📈 **David Wilson** (Sales Director): `david.wilson@example.com` / `123`
- Show/Hide password toggle.
- Non-destructive LocalStorage synchronization with reactive state updates.
- Animated Toast Notification system for actions and state feedback.

---

## 🚀 Getting Started

```bash
# Navigate to project directory
cd ems

# Install dependencies
npm install

# Run the development server
npm run dev
```
