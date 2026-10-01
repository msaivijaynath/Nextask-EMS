const defaultEmployees = [
  {
    employee_id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "123",
    role: "Senior Full Stack Dev",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    phone: "+1 (555) 234-5678",
    joinDate: "12 Jan 2024",
    taskNumber: {
      active: 1,
      completed: 1,
      failed: 0,
      new_task: 1,
    },
    tasks: [
      {
        id: "TSK-101",
        task_title: "Implement OAuth 2.0 Auth Flow",
        task_description: "Integrate Google and GitHub single-sign-on (SSO) with JWT session refresh and rate-limiting security guards.",
        task_date: "2026-10-05",
        task_priority: "Urgent",
        category: "Development",
        status: "new",
        active: false,
        completed: false,
        failed: false,
        new_task: true,
        created_at: "2026-09-28",
      },
      {
        id: "TSK-102",
        task_title: "Database Performance Tuning",
        task_description: "Optimize slow PostgreSQL aggregate queries, add composite indexes on task logs, and profile connection pooling.",
        task_date: "2026-10-08",
        task_priority: "High",
        category: "Database",
        status: "active",
        active: true,
        completed: false,
        failed: false,
        new_task: false,
        created_at: "2026-09-25",
      },
      {
        id: "TSK-103",
        task_title: "CI/CD Pipeline Automated Testing",
        task_description: "Configured GitHub Actions workflow for linting, Vitest unit test suite, and automated staging deployment.",
        task_date: "2026-09-22",
        task_priority: "Medium",
        category: "DevOps",
        status: "completed",
        active: false,
        completed: true,
        failed: false,
        new_task: false,
        completed_at: "2026-09-22",
        notes: "All 48 test suites passed with 94% code coverage.",
      },
    ],
  },
  {
    employee_id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "123",
    role: "Product Manager",
    department: "Product",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    phone: "+1 (555) 345-6789",
    joinDate: "03 Mar 2023",
    taskNumber: {
      active: 1,
      completed: 1,
      failed: 1,
      new_task: 1,
    },
    tasks: [
      {
        id: "TSK-201",
        task_title: "Q4 Product Roadmap & OKRs",
        task_description: "Synthesize customer feedback from beta cohort, align key deliverables with engineering bandwidth, and draft Q4 targets.",
        task_date: "2026-10-10",
        task_priority: "High",
        category: "Strategy",
        status: "new",
        active: false,
        completed: false,
        failed: false,
        new_task: true,
        created_at: "2026-09-29",
      },
      {
        id: "TSK-202",
        task_title: "Client Stakeholder Sync",
        task_description: "Lead sprint demo with enterprise pilot clients, document requested customization requests, and update roadmap.",
        task_date: "2026-10-04",
        task_priority: "Medium",
        category: "Product",
        status: "active",
        active: true,
        completed: false,
        failed: false,
        new_task: false,
        created_at: "2026-09-27",
      },
      {
        id: "TSK-203",
        task_title: "Monthly Revenue & Metric Review",
        task_description: "Prepared monthly active user (MAU) charts and churn cohort breakdown for executive leadership presentation.",
        task_date: "2026-09-20",
        task_priority: "High",
        category: "Analytics",
        status: "completed",
        active: false,
        completed: true,
        failed: false,
        new_task: false,
        completed_at: "2026-09-20",
        notes: "Shared slide deck with leadership team.",
      },
      {
        id: "TSK-204",
        task_title: "Vendor Tooling Procurement",
        task_description: "Negotiated enterprise SLA terms with monitoring vendor before annual contract renewal deadline.",
        task_date: "2026-09-15",
        task_priority: "Low",
        category: "Operations",
        status: "failed",
        active: false,
        completed: false,
        failed: true,
        new_task: false,
        failed_reason: "Vendor pricing exceeded allocated quarterly budget.",
      },
    ],
  },
  {
    employee_id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    password: "123",
    role: "Backend Architect",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    phone: "+1 (555) 456-7890",
    joinDate: "15 Aug 2023",
    taskNumber: {
      active: 2,
      completed: 1,
      failed: 0,
      new_task: 1,
    },
    tasks: [
      {
        id: "TSK-301",
        task_title: "Event-Driven Message Queue Setup",
        task_description: "Implement RabbitMQ / Kafka worker microservice to decouple asynchronous video and image processing tasks.",
        task_date: "2026-10-07",
        task_priority: "Urgent",
        category: "Architecture",
        status: "new",
        active: false,
        completed: false,
        failed: false,
        new_task: true,
        created_at: "2026-09-30",
      },
      {
        id: "TSK-302",
        task_title: "Redis Caching Layer Implementation",
        task_description: "Wrap high-frequency analytics endpoints with Redis cache invalidate-on-write strategy to cut response time under 40ms.",
        task_date: "2026-10-03",
        task_priority: "High",
        category: "Backend",
        status: "active",
        active: true,
        completed: false,
        failed: false,
        new_task: false,
        created_at: "2026-09-26",
      },
      {
        id: "TSK-303",
        task_title: "API Security Audit & Penetration Fixes",
        task_description: "Patched potential CORS and CSRF vulnerabilities highlighted in external third-party security pen-test report.",
        task_date: "2026-09-18",
        task_priority: "Urgent",
        category: "Security",
        status: "completed",
        active: false,
        completed: true,
        failed: false,
        new_task: false,
        completed_at: "2026-09-18",
        notes: "Zero high/medium vulnerabilities remaining.",
      },
      {
        id: "TSK-304",
        task_title: "Microservice Health Check Metrics",
        task_description: "Expose Prometheus scrape endpoints with Grafana dashboard visualizations for CPU, memory, and error rates.",
        task_date: "2026-10-09",
        task_priority: "Medium",
        category: "DevOps",
        status: "active",
        active: true,
        completed: false,
        failed: false,
        new_task: false,
        created_at: "2026-09-28",
      }
    ],
  },
  {
    employee_id: "EMP004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    password: "123",
    role: "Lead Product Designer",
    department: "Design",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    phone: "+1 (555) 567-8901",
    joinDate: "05 Nov 2023",
    taskNumber: {
      active: 1,
      completed: 2,
      failed: 0,
      new_task: 1,
    },
    tasks: [
      {
        id: "TSK-401",
        task_title: "Design System 2.0 Tokens & Figma Kit",
        task_description: "Audit typography, color contrast, and create accessible component library in Figma for dark & light modes.",
        task_date: "2026-10-06",
        task_priority: "High",
        category: "UI/UX",
        status: "new",
        active: false,
        completed: false,
        failed: false,
        new_task: true,
        created_at: "2026-09-29",
      },
      {
        id: "TSK-402",
        task_title: "Interactive Prototype for Mobile App",
        task_description: "Build micro-animated prototype in Figma showcasing the multi-step onboarding and instant biometric login.",
        task_date: "2026-10-02",
        task_priority: "Medium",
        category: "Mobile",
        status: "active",
        active: true,
        completed: false,
        failed: false,
        new_task: false,
        created_at: "2026-09-24",
      },
      {
        id: "TSK-403",
        task_title: "User Journey Usability Testing",
        task_description: "Conducted 8 moderated usability interviews with customers to identify checkout friction points.",
        task_date: "2026-09-19",
        task_priority: "Medium",
        category: "Research",
        status: "completed",
        active: false,
        completed: true,
        failed: false,
        new_task: false,
        completed_at: "2026-09-19",
        notes: "Delivered findings report with 6 high-impact design recommendations.",
      },
      {
        id: "TSK-404",
        task_title: "Marketing Landing Page Refresh",
        task_description: "Completed high-converting 3D glassmorphic hero illustrations and interactive pricing calculator.",
        task_date: "2026-09-12",
        task_priority: "High",
        category: "Marketing",
        status: "completed",
        active: false,
        completed: true,
        failed: false,
        new_task: false,
        completed_at: "2026-09-12",
        notes: "Approved by marketing director.",
      },
    ],
  },
  {
    employee_id: "EMP005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    password: "123",
    role: "Sales & Growth Director",
    department: "Sales",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    phone: "+1 (555) 678-9012",
    joinDate: "20 Feb 2024",
    taskNumber: {
      active: 1,
      completed: 1,
      failed: 1,
      new_task: 1,
    },
    tasks: [
      {
        id: "TSK-501",
        task_title: "Enterprise Deal Closing & Contract Review",
        task_description: "Finalize annual subscription agreement terms with Fortune 500 prospect, coordinating with legal counsel.",
        task_date: "2026-10-04",
        task_priority: "Urgent",
        category: "Sales",
        status: "new",
        active: false,
        completed: false,
        failed: false,
        new_task: true,
        created_at: "2026-09-30",
      },
      {
        id: "TSK-502",
        task_title: "Outbound Growth Campaign Setup",
        task_description: "Configure multi-touch email sequencing in HubSpot targeting VP of Engineering personas with customized value propositions.",
        task_date: "2026-10-08",
        task_priority: "Medium",
        category: "Growth",
        status: "active",
        active: true,
        completed: false,
        failed: false,
        new_task: false,
        created_at: "2026-09-27",
      },
      {
        id: "TSK-503",
        task_title: "Q3 Sales Pipeline Retrospective",
        task_description: "Presented win-loss analysis and deal cycle duration insights to the executive board.",
        task_date: "2026-09-24",
        task_priority: "High",
        category: "Analytics",
        status: "completed",
        active: false,
        completed: true,
        failed: false,
        new_task: false,
        completed_at: "2026-09-24",
        notes: "Achieved 118% of quarterly quota target.",
      },
      {
        id: "TSK-504",
        task_title: "Regional Sales Conference Booth",
        task_description: "Secure premier sponsor booth and organize logistics for annual TechExpo convention.",
        task_date: "2026-09-14",
        task_priority: "Medium",
        category: "Events",
        status: "failed",
        active: false,
        completed: false,
        failed: true,
        new_task: false,
        failed_reason: "Event booth registration closed early due to full capacity.",
      },
    ],
  },
];

const defaultAdmin = [
  {
    employee_id: "ADMIN001",
    name: "Alex Morgan",
    email: "admin@example.com",
    password: "123",
    role: "System Administrator & HR Director",
    department: "Executive",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    phone: "+1 (555) 100-9999",
  },
];

export const recalculateTaskNumbers = (tasks = []) => {
  const counts = { active: 0, completed: 0, failed: 0, new_task: 0 };
  tasks.forEach((t) => {
    if (t.status === "completed" || t.completed) {
      counts.completed++;
    } else if (t.status === "failed" || t.failed) {
      counts.failed++;
    } else if (t.status === "active" || t.active) {
      counts.active++;
    } else {
      counts.new_task++;
    }
  });
  return counts;
};

export const Setlocalstorage = (force = false) => {
  if (force || !localStorage.getItem("Employees")) {
    localStorage.setItem("Employees", JSON.stringify(defaultEmployees));
  }
  if (force || !localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(defaultAdmin));
  }
};

export const Getlocalstorage = () => {
  if (!localStorage.getItem("Employees") || !localStorage.getItem("admin")) {
    Setlocalstorage(true);
  }

  try {
    const employeesdata = JSON.parse(localStorage.getItem("Employees")) || [];
    const admindata = JSON.parse(localStorage.getItem("admin")) || [];
    return { employeesdata, admindata };
  } catch (err) {
    console.error("Error reading localStorage:", err);
    Setlocalstorage(true);
    return { employeesdata: defaultEmployees, admindata: defaultAdmin };
  }
};

export const resetAllDataToDefault = () => {
  localStorage.setItem("Employees", JSON.stringify(defaultEmployees));
  localStorage.setItem("admin", JSON.stringify(defaultAdmin));
  return { employeesdata: defaultEmployees, admindata: defaultAdmin };
};