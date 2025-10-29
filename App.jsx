import React, { useState } from "react";

export default function TaskAssignmentApp() {
  // 🔧 Mock data
  const technicians = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Davis" },
  ];

  const unassignedTasksMock = [
    { id: 101, title: "Fix router issue", description: "Customer network down" },
    { id: 102, title: "Replace server hardware", description: "Server overheating" },
    { id: 103, title: "Install firewall", description: "Setup for new client" },
  ];

  const tasksByTechMock = {
    1: [
      { id: 201, title: "Inspect cables", status: "In Progress" },
      { id: 202, title: "Upgrade switches", status: "Pending" },
    ],
    2: [
      { id: 203, title: "Configure VPN", status: "Completed" },
    ],
    3: [],
  };

  // 🔧 State management
  const [unassignedTasks, setUnassignedTasks] = useState(unassignedTasksMock);
  const [selectedTechTasks, setSelectedTechTasks] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🧠 Mock API call simulation
  const handleViewTechTasks = (techId, techName) => {
    const data = tasksByTechMock[techId] || [];
    setSelectedTech(techName);
    setSelectedTechTasks(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTech(null);
    setSelectedTechTasks([]);
  };

  const handleAssignTask = () => {
    alert("Assign Task functionality coming soon!");
  };

  const handleAddNewTask = () => {
    alert("Add New Task functionality coming soon!");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={headerStyle}>
        <h1>Welcome to the Automated Task Assignment System</h1>
      </header>

      {/* Layout */}
      <div style={{ display: "flex", minHeight: "90vh" }}>
        {/* Left Column - Technicians */}
        <aside style={sidebarStyle}>
          <h2>Technicians</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {technicians.map((tech) => (
              <li
                key={tech.id}
                onClick={() => handleViewTechTasks(tech.id, tech.name)}
                style={techItemStyle}
              >
                {tech.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Body - Unassigned Tasks */}
        <main style={mainStyle}>
          <h2>Unassigned Tasks</h2>
          {unassignedTasks.length === 0 ? (
            <p>No unassigned tasks found.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {unassignedTasks.map((task) => (
                <li key={task.id} style={taskItemStyle}>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button style={buttonStyle} onClick={handleAssignTask}>
              Assign Task
            </button>
            <button
              style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
              onClick={handleAddNewTask}
            >
              Add New Task
            </button>
          </div>
        </main>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalStyle}>
            <h3>Tasks Assigned to {selectedTech}</h3>
            {selectedTechTasks.length === 0 ? (
              <p>No tasks assigned.</p>
            ) : (
              <ul>
                {selectedTechTasks.map((task) => (
                  <li key={task.id}>
                    <strong>{task.title}</strong> — {task.status}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleCloseModal} style={{ marginTop: "1rem", ...buttonStyle }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 💅 Inline styles
const headerStyle = {
  backgroundColor: "#004aad",
  color: "white",
  padding: "1rem",
  textAlign: "center",
};

const sidebarStyle = {
  width: "25%",
  backgroundColor: "#f0f0f0",
  padding: "1rem",
  borderRight: "1px solid #ccc",
};

const techItemStyle = {
  padding: "0.5rem",
  marginBottom: "0.3rem",
  cursor: "pointer",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const mainStyle = {
  flex: 1,
  padding: "1rem",
};

const taskItemStyle = {
  backgroundColor: "#fafafa",
  marginBottom: "0.5rem",
  padding: "0.8rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "0.5rem",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "10px",
  width: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
};
