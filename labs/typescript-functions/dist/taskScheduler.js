"use strict";
// Task Scheduler System
// Implement your types and classes here
var Priority;
(function (Priority) {
    Priority[Priority["Low"] = 0] = "Low";
    Priority[Priority["Medium"] = 1] = "Medium";
    Priority[Priority["High"] = 2] = "High";
})(Priority || (Priority = {}));
class TaskScheduler {
    constructor() {
        this.tasks = [];
        this.handlers = new Map();
    }
    addTask(task) {
        this.tasks.push(task);
    }
    registerHandler(priority, handler) {
        this.handlers.set(priority, handler);
    }
    async executeTasks() {
        const sortedTasks = this.sortTasksByPriority();
        for (const task of sortedTasks) {
            const handler = this.handlers.get(task.priority);
            if (handler) {
                try {
                    await handler(task);
                    task.status = 'completed';
                }
                catch (error) {
                    task.status = 'failed';
                    console.error(`Failed to execute task ${task.id}:`, error);
                }
            }
            else {
                console.warn(`No handler registered for priority ${Priority[task.priority]}`);
            }
        }
    }
    sortTasksByPriority() {
        return [...this.tasks].sort((a, b) => b.priority - a.priority);
    }
}
// Test implementation
async function runDemo() {
    const scheduler = new TaskScheduler();
    // Register handlers
    scheduler.registerHandler(Priority.High, async (task) => {
        console.log(`Executing High Priority Task: ${task.title}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    scheduler.registerHandler(Priority.Medium, async (task) => {
        console.log(`Executing Medium Priority Task: ${task.title}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    scheduler.registerHandler(Priority.Low, async (task) => {
        console.log(`Executing Low Priority Task: ${task.title}`);
        await new Promise(resolve => setTimeout(resolve, 200));
    });
    // Add tasks
    scheduler.addTask({
        id: '1',
        title: 'Critical System Update',
        priority: Priority.High,
        dueDate: new Date(),
        status: 'pending'
    });
    scheduler.addTask({
        id: '2',
        title: 'Data Backup',
        priority: Priority.Medium,
        dueDate: new Date(),
        status: 'pending'
    });
    scheduler.addTask({
        id: '3',
        title: 'Log Cleanup',
        priority: Priority.Low,
        dueDate: new Date(),
        status: 'pending'
    });
    // Execute tasks
    await scheduler.executeTasks();
}
runDemo().catch(console.error);
