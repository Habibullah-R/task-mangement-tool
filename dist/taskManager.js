"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.markTaskStatus = markTaskStatus;
exports.listTasks = listTasks;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const FILE_PATH = node_path_1.default.resolve(process.cwd(), "task.json");
async function loadTasks() {
    try {
        const data = await promises_1.default.readFile(FILE_PATH, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        if (error.code === "ENOENT")
            return [];
        if (error instanceof SyntaxError) {
            console.warn("Warning: tasks.json was corrupted or empty, Starting fresh");
            return [];
        }
        throw error;
    }
}
async function saveTasks(tasks) {
    await promises_1.default.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}
async function addTask(description) {
    if (!description || description.trim() === "") {
        console.error("Error: Task description cannot be empty.");
        return;
    }
    const tasks = await loadTasks();
    const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
    const now = new Date().toISOString();
    const newId = maxId + 1;
    const newTask = {
        id: newId,
        description: description,
        status: "todo",
        created_at: now,
        updated_at: now,
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newId})`);
}
async function updateTask(id, newDescription) {
    if (!id || !newDescription || newDescription.trim() === "") {
        console.error("Error: New description cannot be empty.");
        return;
    }
    const tasks = await loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        console.error(`Error: Task with ID ${id} not found.`);
        return;
    }
    task.description = newDescription.trim();
    task.updated_at = new Date().toISOString();
    await saveTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
}
async function deleteTask(id) {
    if (!id)
        return;
    const tasks = await loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
        console.error(`Error: Task with ID ${id} not found.`);
        return;
    }
    tasks.splice(index, 1);
    await saveTasks(tasks);
    console.log(`Task deleted successfully (ID: ${id})`);
}
async function markTaskStatus(id, status) {
    if (!id || !status)
        return;
    const tasks = await loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        console.error(`Error: Task with ID ${id} not found.`);
        return;
    }
    task.status = status;
    task.updated_at = new Date().toISOString();
    await saveTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`);
}
async function listTasks(filterStatus) {
    const tasks = await loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    const filteredTasks = filterStatus
        ? tasks.filter((t) => t.status === filterStatus)
        : tasks;
    if (filteredTasks.length === 0) {
        console.log(`No tasks found with status '${filterStatus}'.`);
        return;
    }
    console.log('\n--- Task List ---');
    for (const task of filteredTasks) {
        const statusBadge = `[${task.status}]`.padEnd(14, ' ');
        console.log(`ID: ${task.id.toString().padEnd(4, ' ')} ${statusBadge} ${task.description} (Updated: ${task.updated_at})`);
    }
    console.log('-----------------\n');
}
