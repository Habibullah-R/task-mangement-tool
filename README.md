# 📋 Task Tracker CLI

A lightweight, zero-dependency Command Line Interface (CLI) application built with **Node.js** and **TypeScript** to track and manage your daily tasks directly from your terminal.

This project is an implementation of the [Roadmap.sh Task Tracker Project](https://roadmap.sh/projects/task-tracker).

---

## ✨ Features

- **Add Tasks**: Automatically assigns auto-incrementing unique IDs and timestamps (`createdAt`, `updatedAt`).
- **Update Tasks**: Edit descriptions of existing tasks while updating the timestamp.
- **Delete Tasks**: Remove any task by its ID.
- **Status Tracking**: Mark tasks as `todo`, `in-progress`, or `done`.
- **Flexible Listing**: List all tasks or filter specifically by status (`todo`, `in-progress`, `done`).
- **Automatic File Persistence**: Stores tasks cleanly in a formatted `tasks.json` file in the current directory.
- **Zero Runtime Dependencies**: Built entirely with native Node.js APIs (`node:fs/promises`, `node:path`, and `process`).

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system:
```bash
node -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Habibullah-R/task-mangement-tool.git
   cd "task-mangement-tool"
   ```

2. **Install development dependencies:**
   ```bash
   npm install
   ```

3. **Build the TypeScript project:**
   ```bash
   npm run build
   ```

4. **Link the CLI globally:**
   ```bash
   npm link
   ```
   > 💡 *Now `task-cli` is accessible from any terminal window on your computer!*

---

## 📖 Command Reference & Examples

### 1. Add a new task
```bash
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)
```

### 2. List tasks
```bash
# List all tasks
task-cli list

# List only tasks marked as todo
task-cli list todo

# List only tasks currently in-progress
task-cli list in-progress

# List all completed tasks
task-cli list done
```

### 3. Update a task description
```bash
task-cli update 1 "Buy groceries and cook dinner"
# Output: Task 1 updated successfully.
```

### 4. Mark task status
```bash
# Mark as in-progress
task-cli mark-in-progress 1
# Output: Task 1 marked as in-progress.

# Mark as done
task-cli mark-done 1
# Output: Task 1 marked as done.
```

### 5. Delete a task
```bash
task-cli delete 1
# Output: Task deleted successfully (ID: 1)
```

### 6. View help
```bash
task-cli help
```

---

## 🗂️ Task Data Structure

Tasks are persisted in `tasks.json` in the current working directory with the following structure:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "created_at": "2026-09-20T12:00:00.000Z",
    "updated_at": "2026-09-20T12:00:00.000Z"
  }
]
```

---

## 🛠️ Uninstallation

If you ever want to remove the global `task-cli` shortcut from your machine:
```bash
npm unlink
```


