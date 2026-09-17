import { useEffect, useState } from "react";

export default function TaskForm({ fetchTasks, editingTask, setEditingTask, onSuccess }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || "");
            setStatus(editingTask.status);
        }
    }, [editingTask]);

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            status
        };
        try {
            let response;
            if (editingTask) {
                // UPDATE EXISTING TASK
                response = await fetch(
                    `http://localhost:5001/tasks/${editingTask._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(taskData)
                    }
                );
            } else {
                // CREATE NEW TASK
                response = await fetch(
                    "http://localhost:5001/tasks",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(taskData)
                    }
                );
            }
            if (!response.ok) {
                throw new Error("Operation failed");
            } alert(
                editingTask
                    ? "Task Updated Successfully!"
                    : "Task Created Successfully!"
            );
            await onSuccess();
            setTitle("");
            setDescription("");
            setStatus("Pending");
            if (setEditingTask) {
                setEditingTask(null);
            }
        } catch (error) {
            console.log("Error:", error);
            alert("Something went wrong!");
        }
    };

    // Reset Form
    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setStatus("Pending");
        setEditingTask(null);
        onSuccess();
    };

    return (
        <div className="task-page">
            <div className="task-form-container">

                {/* Header */}
                <div className="task-form-header">
                    <div className="header-icon">
                        <span>✓</span>
                    </div>

                    <div>
                        <h1>
                            {editingTask ? "Edit Task" : "Create New Task"}
                        </h1>
                        <p>
                            {editingTask
                                ? "Update your task details."
                                : "Add a task and stay organized with TaskFlow."
                            }
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="task-form-card">

                    <div className="form-title">
                        <h2>Task Details</h2>
                        <p>Fill in the information below.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Title */}
                        <div className="form-group">
                            <label htmlFor="title">
                                Task Title <span>*</span>
                            </label>

                            <input
                                id="title"
                                type="text"
                                placeholder="e.g. Learn MongoDB"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="description">
                                Description
                            </label>

                            <textarea
                                id="description"
                                placeholder="Describe what you need to do..."
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                rows="4"
                            />
                        </div>

                        {/* Status */}
                        <div className="form-group">
                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="create-btn"
                            >
                                <span>{editingTask ? "✓" : "+"}</span>
                                {editingTask ? " Update Task" : " Create Task"}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}