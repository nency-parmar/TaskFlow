
import TaskList from "../components/TaskList";

export default function Dashboard({
    tasks,
    onDelete,
    onEdit,
    onAddTask
}) {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    );

    const pendingTasks = tasks.filter(
        (task) => task.status !== "Completed"
    );

    const progress = totalTasks
        ? Math.round(
            (completedTasks.length / totalTasks) * 100
        )
        : 0;

    return (
        <div className="dashboard-layout">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="brand">
                    <div className="brand-icon">
                        ✓
                    </div>

                    <span>TaskFlow</span>
                </div>

                <nav className="sidebar-nav">

                    <button className="nav-item active">
                        <span>▦</span>
                        Dashboard
                    </button>

                    <button
                        className="nav-item"
                        onClick={onAddTask}
                    >
                        <span>☷</span>
                        Tasks
                    </button>

                    <button className="nav-item">
                        <span>✓</span>
                        Daily Checklist
                    </button>

                    <button className="nav-item">
                        <span>▥</span>
                        Analytics
                    </button>

                    <button className="nav-item">
                        <span>▤</span>
                        Reports
                    </button>

                    <button className="nav-item">
                        <span>⚙</span>
                        Settings
                    </button>

                </nav>

            </aside>

            {/* Main Content */}
            <main className="dashboard-main">

                {/* Header */}
                <header className="dashboard-header">

                    <div>
                        <p className="welcome-text">
                            Welcome back! 👋
                        </p>

                        <h1>Dashboard</h1>

                        <p>
                            Overview of your tasks and progress.
                        </p>
                    </div>

                    <button
                        className="dashboard-add-btn"
                        onClick={onAddTask}
                    >
                        + Add New Task
                    </button>

                </header>

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

                        <h2>{pendingTasks.length}</h2>

                        <p>Tasks to complete</p>
                    </div>

                    <div className="stat-card completed">
                        <div className="stat-top">
                            <span>Completed</span>
                            <span className="stat-icon">✓</span>
                        </div>

                        <h2>{completedTasks.length}</h2>

                        <p>Tasks completed</p>
                    </div>

                    <div className="stat-card progress">
                        <div className="stat-top">
                            <span>Progress</span>
                            <span className="stat-icon">↗</span>
                        </div>

                        <h2>{progress}%</h2>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${progress}%`
                                }}
                            />
                        </div>
                    </div>

                </div>

                {/* Task Sections */}
                <div className="dashboard-sections">

                    {/* Pending */}
                    <section className="dashboard-section">

                        <div className="section-header">
                            <div>
                                <h2>Pending Tasks</h2>
                                <p>
                                    Tasks waiting to be completed
                                </p>
                            </div>

                            <span className="section-count pending-count">
                                {pendingTasks.length}
                            </span>
                        </div>

                        <TaskList
                            tasks={pendingTasks}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />

                    </section>

                    {/* Completed */}
                    <section className="dashboard-section">

                        <div className="section-header">
                            <div>
                                <h2>Completed Tasks</h2>
                                <p>
                                    Great work! Keep it up.
                                </p>
                            </div>

                            <span className="section-count completed-count">
                                {completedTasks.length}
                            </span>
                        </div>

                        <TaskList
                            tasks={completedTasks}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />

                    </section>

                </div>

            </main>

        </div>
    );
}