# 🚀 TaskFlow — MERN Task Management System

TaskFlow is a simple and modern **Task Management System** built using the **MERN Stack**.

It allows users to create, view, update, and delete tasks while tracking task progress through a clean dashboard.

---

## 📌 Features

* ✅ Create new tasks
* 📋 View all tasks
* ✏️ Edit existing tasks
* 🗑️ Delete tasks
* 🔄 Update task status
* 📊 Dashboard with task statistics
* 📈 Overall task completion progress
* 🗓️ Display task creation date
* 🎨 Clean and responsive UI
* 🔌 REST API integration
* 💾 MongoDB database integration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Other

* CORS
* dotenv
* Git & GitHub

---

## 🏗️ Project Structure

```text
TaskFlow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── task.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔄 CRUD Operations

TaskFlow implements the four basic CRUD operations:

| Operation | HTTP Method | API Endpoint | Purpose                 |
| --------- | ----------- | ------------ | ----------------------- |
| Create    | POST        | `/tasks`     | Create a new task       |
| Read      | GET         | `/tasks`     | Get all tasks           |
| Update    | PUT         | `/tasks/:id` | Update an existing task |
| Delete    | DELETE      | `/tasks/:id` | Delete a task           |

---

## 🔁 Application Flow

```text
                 React Frontend
                       │
                       │ HTTP Requests
                       ↓
                Express.js API
                       │
                       ↓
                   Mongoose
                       │
                       ↓
                   MongoDB
                       │
                       ↓
                JSON Response
                       │
                       ↓
                React Dashboard
```

---

## 📊 Dashboard

The TaskFlow dashboard displays:

* Total number of tasks
* Pending tasks
* Tasks currently in progress
* Completed tasks
* Overall completion percentage
* Complete task list

The progress percentage is calculated based on completed tasks:

```text
Progress = (Completed Tasks / Total Tasks) × 100
```

---

## 📝 Task Fields

Each task contains:

```text
Title
Description
Status
Created Date
```

Available statuses:

* Pending
* In Progress
* Completed

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/nency-parmar/TaskFlow.git
```

### 2. Navigate to the project

```bash
cd TaskFlow
```

---

### 3. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URI=mongodb://localhost:27017/task_manager
```

Start the backend:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5001
```

---

### 4. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

## 🗄️ MongoDB Setup

TaskFlow currently uses **local MongoDB**.

Make sure MongoDB is running on your system before starting the backend.

The application connects using:

```text
mongodb://localhost:27017/task_manager
```

You can use **MongoDB Compass** to view the stored tasks.

---

## 🔐 Environment Variables

The backend uses an environment variable for the MongoDB connection.

Example:

```env
MONGODB_URI=mongodb://localhost:27017/task_manager
```

```text
.env
node_modules/
```
---

## 🚀 Future Improvements

Some features planned for future versions:

* 🔍 Search tasks
* 🎯 Filter tasks by status
* 📅 Sort tasks by date
* 🔔 Task reminders
* 👤 User authentication
* 🔒 Protected routes
* 🌙 Dark mode
* 📱 Improved mobile experience

---

## 👩‍💻 Author

**Nency Parmar**

B.Tech Computer Science & Engineering
---

## ⭐ If You Like This Project

If you find TaskFlow useful, consider giving the repository a ⭐ on GitHub!
