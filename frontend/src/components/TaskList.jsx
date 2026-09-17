import TaskItem from "./TaskItem";
export default function TaskList({
    tasks,
    onDelete,
    onEdit
}) {
    if (tasks.length === 0) {
        return (
            <div className="empty-task">
                <h2>No Tasks Found</h2>
                <p>Create your first task to get started.</p>
            </div>
        );
    }
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}