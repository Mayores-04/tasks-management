"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Task interface
interface Task {
    id?: number;
    done: boolean;
    taskName: string;
    assignedTo: string;
    status: string;
    progress: string;
    priority: string;
    due: string;
}

interface TaskTableProps {
    userId: string;
}

const TaskTable: React.FC<TaskTableProps> = ({ userId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        done: false,
        taskName: '',
        assignedTo: '',
        status: '',
        progress: '',
        priority: '',
        due: '',
    });
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [expandedTask, setExpandedTask] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch tasks for the current user
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/tasks/${userId}`);
                setTasks(response.data);
            } catch (err) {
                setError('Failed to fetch tasks');
                console.error('Error fetching tasks:', err);
            }
        };

        fetchTasks();
    }, [userId]);

    // Handle form field changes
    const handleChange = (field: keyof Task, value: any) => {
        setNewTask(prevTask => ({
            ...prevTask,
            [field]: value
        }));
    };

    // Add or update a task
    const addOrUpdateTask = async () => {
        if (newTask.taskName.trim() === '' || newTask.due.trim() === '') {
            alert('Task Name and Due Date are required');
            return;
        }

        if (editTaskId !== null) {
            try {
                await axios.put(`/api/tasks/${editTaskId}`, newTask);
                setTasks(tasks.map(task =>
                    task.id === editTaskId
                        ? { ...newTask, id: editTaskId }
                        : task
                ));
                setEditTaskId(null); 
            } catch (err) {
                console.error('Failed to update task:', err);
            }
        } else {
            try {
                const response = await axios.post(`/api/tasks/${userId}`, newTask);
                setTasks([...tasks, { ...newTask, id: response.data.id }]);
            } catch (err) {
                console.error('Failed to add task:', err);
            }
        }

        setNewTask({
            done: false,
            taskName: '',
            assignedTo: '',
            status: '',
            progress: '',
            priority: '',
            due: '',
        });
    };

    const deleteTask = async (taskId: number) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };

    const toggleExpand = (taskId: number) => {
        setExpandedTask(expandedTask === taskId ? null : taskId);
    };

    const startEditing = (task: Task) => {
        setEditTaskId(task.id!);
        setNewTask(task);
    };

    // Handle checkbox change
    const handleCheckboxChange = async (taskId: number, checked: boolean) => {
        try {
            await axios.patch(`/api/tasks/${taskId}`, { done: checked });
            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, done: checked } : task
            ));
        } catch (err) {
            console.error('Failed to update task status:', err);
        }
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded p-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col space-y-4 md:flex-row md:flex-wrap">
                {tasks.map(task => (
                    <div key={task.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <div className="border rounded p-4 shadow-md bg-gray-100">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{task.taskName}</h3>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={(e) => handleCheckboxChange(task.id!, e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span>Done</span>
                                </label>
                            </div>
                            <p>Assigned To: {task.assignedTo}</p>
                            <p>Status: {task.status}</p>
                            <p>Progress: {task.progress}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Due: {task.due}</p>
                            <div className="flex space-x-2 mt-2">
                                <button onClick={() => startEditing(task)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                    Edit
                                </button>
                                <button onClick={() => deleteTask(task.id!)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                                <button onClick={() => toggleExpand(task.id!)} className="bg-gray-500 text-white px-2 py-1 rounded">
                                    {expandedTask === task.id ? 'Hide Details' : 'Show Details'}
                                </button>
                            </div>
                        </div>
                        {expandedTask === task.id && (
                            <div className="mt-2">
                                <h3 className="text-lg font-semibold">Task Details</h3>
                                <p><strong>Additional Details:</strong> Task specifics can be displayed here.</p>
                            </div>
                        )}
                    </div>
                ))}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                    <div className="border rounded p-4 shadow-md bg-gray-200 ">
                        <h3 className="font-semibold text-black">Add New Task</h3>
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={newTask.done}
                                    onChange={(e) => handleChange('done', e.target.checked)}
                                    className="form-checkbox text-black"
                                />
                                <span>Done</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={newTask.taskName}
                                onChange={(e) => handleChange('taskName', e.target.value)}
                                className="form-input p-2 border rounded w-full text-black"
                            />
                            <input
                                type="text"
                                placeholder="Assigned To"
                                value={newTask.assignedTo}
                                onChange={(e) => handleChange('assignedTo', e.target.value)}
                                className="form-input p-2 border rounded w-full text-black"
                            />
                            <select
                                value={newTask.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="form-select p-2 border rounded w-full text-black"
                            >
                                <option className="text-black" value="">Select Status</option>
                                <option className="text-black" value="Not Started">Not Started</option>
                                <option className="text-black" value="In Progress">In Progress</option>
                                <option className="text-black" value="Completed">Completed</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Progress"
                                value={newTask.progress}
                                onChange={(e) => handleChange('progress', e.target.value)}
                                className="form-input p-2 border rounded w-full text-black"
                            />
                            <select
                                value={newTask.priority}
                                onChange={(e) => handleChange('priority', e.target.value)}
                                className="form-select p-2 border rounded w-full text-black"
                            >
                                <option className="text-black" value="">Select Priority</option>
                                <option className="text-black" value="Low">Low</option>
                                <option className="text-black" value="Medium">Medium</option>
                                <option className="text-black" value="High">High</option>
                            </select>
                            <input
                                type="date"
                                value={newTask.due}
                                onChange={(e) => handleChange('due', e.target.value)}
                                className="form-input p-2 border rounded w-full text-black"
                            />
                            <button
                                onClick={addOrUpdateTask}
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                {editTaskId !== null ? 'Update Task' : 'Add Task'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;
