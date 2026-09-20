import fs from "node:fs/promises";
import path from "node:path";
import { TaskStatus, Task } from "./types";

const FILE_PATH = path.resolve(process.cwd(), "tasks.json");

async function loadTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data) as Task[];
  } catch (error: any) {
    if (error.code === "ENOENT") return [];
    if (error instanceof SyntaxError) {
      console.warn(
        "Warning: tasks.json was corrupted or empty, Starting fresh",
      );
      return [];
    }
    throw error;
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

export async function addTask(description: string): Promise<void> {
  if (!description || description.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    return;
  }
  const tasks = await loadTasks();
  const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
  const now = new Date().toISOString();
  const newId = maxId + 1;

  const newTask: Task = {
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

export async function updateTask(
  id: number,
  newDescription: string,
): Promise<void> {
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

export async function deleteTask(id: number): Promise<void> {
  if (!id) return;
  const tasks = await loadTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    console.error(`Error: Task with ID ${id} not found.`);
    return;
  }
  tasks.splice(index,1)
  await saveTasks(tasks);
  console.log(`Task deleted successfully (ID: ${id})`);
}


export async function markTaskStatus(id: number, status: TaskStatus): Promise<void> {
    if(!id || !status) return; 
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


export async function listTasks(filterStatus?: TaskStatus): Promise<void> {
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
    console.log(
      `ID: ${task.id.toString().padEnd(4, ' ')} ${statusBadge} ${task.description} (Updated: ${task.updated_at})`
    );
  }
  console.log('-----------------\n');
}