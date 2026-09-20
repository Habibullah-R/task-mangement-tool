#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskManager_1 = require("./taskManager");
// Slice the first two items (node executable path and script file path)
const args = process.argv.slice(2);
const command = args[0];
function printHelp() {
    console.log(`
Task Tracker CLI

Usage:
  task-cli <command> [arguments]

Commands:
  add <description>                     Add a new task
  update <id> <description>             Update a task description
  delete <id>                           Delete a task
  mark-in-progress <id>                 Mark a task as in-progress
  mark-done <id>                        Mark a task as done
  list                                  List all tasks
  list <todo|in-progress|done>          List tasks filtered by status
  help                                  Show this help message

Examples:
  task-cli add "Buy groceries"
  task-cli update 1 "Buy groceries and cook dinner"
  task-cli mark-in-progress 1
  task-cli mark-done 1
  task-cli list
  task-cli list done
  task-cli delete 1
`);
}
async function main() {
    if (!command || command === 'help' || command === '--help' || command === '-h') {
        printHelp();
        return;
    }
    switch (command) {
        case 'add': {
            const description = args[1];
            if (!description) {
                console.error('Error: Please provide a description for the task.');
                console.log('Example: task-cli add "Buy groceries"');
                return;
            }
            await (0, taskManager_1.addTask)(description);
            break;
        }
        case 'update': {
            const id = parseInt(args[1], 10);
            const newDescription = args[2];
            if (isNaN(id) || !newDescription) {
                console.error('Error: Please provide a valid task ID and a new description.');
                console.log('Example: task-cli update 1 "New task description"');
                return;
            }
            await (0, taskManager_1.updateTask)(id, newDescription);
            break;
        }
        case 'delete': {
            const id = parseInt(args[1], 10);
            if (isNaN(id)) {
                console.error('Error: Please provide a valid task ID.');
                console.log('Example: task-cli delete 1');
                return;
            }
            await (0, taskManager_1.deleteTask)(id);
            break;
        }
        case 'mark-in-progress': {
            const id = parseInt(args[1], 10);
            if (isNaN(id)) {
                console.error('Error: Please provide a valid task ID.');
                console.log('Example: task-cli mark-in-progress 1');
                return;
            }
            await (0, taskManager_1.markTaskStatus)(id, 'in-progress');
            break;
        }
        case 'mark-done': {
            const id = parseInt(args[1], 10);
            if (isNaN(id)) {
                console.error('Error: Please provide a valid task ID.');
                console.log('Example: task-cli mark-done 1');
                return;
            }
            await (0, taskManager_1.markTaskStatus)(id, 'done');
            break;
        }
        case 'list': {
            const statusArg = args[1]?.toLowerCase();
            if (!statusArg) {
                await (0, taskManager_1.listTasks)();
                return;
            }
            if (['todo', 'in-progress', 'done'].includes(statusArg)) {
                await (0, taskManager_1.listTasks)(statusArg);
            }
            else {
                console.error(`Error: Unknown status filter "${statusArg}".`);
                console.log('Valid filters are: todo, in-progress, done');
            }
            break;
        }
        default: {
            console.error(`Error: Unknown command "${command}".`);
            printHelp();
            break;
        }
    }
}
main().catch((error) => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
});
