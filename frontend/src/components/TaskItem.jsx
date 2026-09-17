export default function TaskItem({ task, onDelete, onEdit }) {
    const statusClass = task.status
        .toLowerCase()
        .replace(/\s+/g, "-");
    return (
        <div className="task-item">
            {/* Task Header */}
            <div className="task-item-header">
                <div
                    className={`task-checkbox ${task.status === "Completed"
                        ? "checked"
                        : ""
                        }`}
                >
                    {task.status === "Completed" ? "✓" : "○"}
                </div>
                <div className="task-content">
                    <h3
                        className={
                            task.status === "Completed"
                                ? "completed-task"
                                : ""
                        }
                    >
                        {task.title}
                    </h3>
                    <p>
                        {task.description ||
                            "No description provided"}
                    </p>
                </div>
                <span className={`status-badge ${statusClass}`}>
                    {task.status}
                </span>
            </div>
            {/* Footer */}
            <div className="task-item-footer">
                <div className="task-date">
                    <span>📅</span>
                    Created:{" "}
                    {task.createdAt
                        ? new Date(
                            task.createdAt
                        ).toLocaleDateString()
                        : "No date"}
                </div>
                <div className="task-actions">
                    <button
                        className="edit-btn"
                        onClick={() => onEdit(task)}
                    >
                        ✏️ Edit
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task._id)}
                    >
                        🗑 Delete
                    </button>
                </div>
            </div>
        </div>
    );
}