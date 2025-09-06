// Task Scheduler System
// Implement your types and classes here

enum Priority {
    Low,
    Medium,
    High
}

interface Task {
    id: string;
    title: string;
    priority: Priority;
    dueDate: Date;
    status: 'pending' | 'completed' | 'failed';
}

type TaskHandler = (task: Task) => Promise<void>;

class TaskScheduler {
    private tasks: Task[] = [];
    private handlers: Map<Priority, TaskHandler> = new Map();

    // Function overloads for addTask
    addTask(task: Task & { priority: Priority.High }): void;
    addTask(task: Task & { priority: Priority.Medium }): void;
    addTask(task: Task & { priority: Priority.Low }): void;
    addTask(task: Task): void {
        this.tasks.push(task);
    }

    registerHandler(priority: Priority, handler: TaskHandler): void {
        this.handlers.set(priority, handler);
    }

    async executeTasks(): Promise<void> {
        const sortedTasks = this.sortTasksByPriority();
        
        for (const task of sortedTasks) {
            const handler = this.handlers.get(task.priority);
            if (handler) {
                try {
                    await handler(task);
                    task.status = 'completed';
                } catch (error) {
                    task.status = 'failed';
                    console.error(`Failed to execute task ${task.id}:`, error);
                }
            } else {
                console.warn(`No handler registered for priority ${Priority[task.priority]}`);
            }
        }
    }

    private sortTasksByPriority(): Task[] {
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
