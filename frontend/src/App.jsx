import { useEffect, useRef, useState } from 'react';
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const dashboardRef = useRef(null);
  // Fetch all tasks
  const fetchTasks = async () => {

    try {

      const response = await fetch(
        "http://localhost:5001/tasks"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);

    } catch (error) {

      console.log("Fetch Error:", error);

    }

  };
  // Edit Task
  const handleEdit = (task) => {

    setEditingTask(task);
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

  };
  // Add New Task
  const handleAddTask = () => {

    setEditingTask(null);
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }
  // After Create / Update
  const handleFormSuccess = async () => {

    await fetchTasks();

    setEditingTask(null);
    setShowForm(false);

    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

  };

  // Back to Dashboard
  const handleBackToDashboard = () => {

    setEditingTask(null);
    setShowForm(false);

    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

  };

  // Delete task
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5001/tasks/${id}`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      alert("Task Deleted Successfully!");
      fetchTasks();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };
  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);
  // Statistics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const progress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  return (
    <div
      className="dashboard-layout"
      ref={dashboardRef}
    >
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            ✓
          </div>
          <span>TaskFlow</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${!showForm ? "active" : ""}`}
            onClick={handleBackToDashboard}
          >
            <span>▦</span>
            Dashboard
          </button>
          <button
            className={`nav-item ${showForm && !editingTask ? "active" : ""}`}
            onClick={handleAddTask}
          >
            <span>＋</span>
            Create Task
          </button>
        </nav>
      </aside>
      {/* Main Dashboard */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <p className="welcome-text">
              Welcome back!
            </p>
            <h1>
              {showForm
                ? editingTask
                  ? "Edit Task"
                  : "Create New Task"
                : "Dashboard"}
            </h1>
            <p>
              {showForm
                ? editingTask
                  ? "Update your task details."
                  : "Add a new task and stay organized."
                : "Organize your work and stay productive."
              }
            </p>
          </div>
          <button
            className="dashboard-add-btn"
            onClick={
              showForm
                ? handleBackToDashboard
                : handleAddTask
            }
          >
            {showForm
              ? "← Back to Dashboard"
              : "+ Add New Task"}
          </button>
        </header>
        {/* Create / Edit Task Page */}
        {showForm ? (
          <div ref={formRef}>
            <TaskForm
              fetchTasks={fetchTasks}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              onSuccess={handleFormSuccess}
            />
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-top">
                  <span>Total Tasks</span>
                  <span className="stat-icon">☷</span>
                </div>
                <h2>{totalTasks}</h2>
                <p>All your tasks</p>
              </div>
              <div className="stat-card pending">
                <div className="stat-top">
                  <span>Pending</span>
                  <span className="stat-icon">◷</span>
                </div>
                <h2>{pendingTasks}</h2>
                <p>Tasks to complete</p>
              </div>
              <div className="stat-card progress">
                <div className="stat-top">
                  <span>In Progress</span>
                  <span className="stat-icon">↗</span>
                </div>
                <h2>{inProgressTasks}</h2>
                <p>Currently working</p>
              </div>
              <div className="stat-card completed">
                <div className="stat-top">
                  <span>Completed</span>
                  <span className="stat-icon">✓</span>
                </div>
                <h2>{completedTasks}</h2>
                <p>Tasks completed</p>
              </div>
            </div>
            {/* Progress Card */}
            <div className="progress-card">
              <div className="progress-card-header">
                <div>
                  <h2>Overall Progress</h2>
                  <p>
                    Keep going, you're doing great!
                  </p>
                </div>
                <strong>{progress}%</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`
                  }}
                />
              </div>
            </div>
            {/* Task List */}
            <section className="tasks-section">
              <div className="section-heading">
                <div>
                  <h2>My Tasks</h2>
                  <p>
                    Manage your daily tasks.
                  </p>
                </div>
                <span className="task-count">
                  {tasks.length} Tasks
                </span>
              </div>
              <TaskList
                tasks={tasks}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
export default App;