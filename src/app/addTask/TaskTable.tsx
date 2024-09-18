"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    const handleChange = (field: keyof Task, value: any) => {
        setNewTask(prevTask => ({
            ...prevTask,
            [field]: value
        }));
    };

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
        <div className="overflow-x-auto bg-white shadow-md rounded p-4 sm:ml-0">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Done</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map(task => (
                        <React.Fragment key={task.id}>
                            <tr>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={(e) => handleCheckboxChange(task.id!, e.target.checked)}
                                        className="form-checkbox"
                                    />
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">{task.taskName}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{task.assignedTo}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{task.status}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{task.progress}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{task.priority}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{task.due}</td>
                                <td className="px-4 py-4 whitespace-nowrap flex space-x-2">
                                    <button
                                        onClick={() => startEditing(task)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id!)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => toggleExpand(task.id!)}
                                        className="bg-gray-500 text-white px-2 py-1 rounded"
                                    >
                                        {expandedTask === task.id ? 'Hide Details' : 'Show Details'}
                                    </button>
                                </td>
                            </tr>
                            {expandedTask === task.id && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-4 whitespace-nowrap">
                                        <div className="bg-gray-100 p-4 rounded">
                                            <h3 className="text-lg font-semibold">Task Details</h3>
                                            <p><strong>Additional Details:</strong> Task specifics can be displayed here.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    <tr>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <input
                                type="checkbox"
                                checked={newTask.done}
                                onChange={(e) => handleChange('done', e.target.checked)}
                                className="form-checkbox mr-2"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={newTask.taskName}
                                onChange={(e) => handleChange('taskName', e.target.value)}
                                className="form-input p-2 border rounded w-full"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Assigned To"
                                value={newTask.assignedTo}
                                onChange={(e) => handleChange('assignedTo', e.target.value)}
                                className="form-input p-2 border rounded w-full"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <select
                                value={newTask.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="form-select p-2 border rounded w-full"
                            >
                                <option value="">Select Status</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Progress"
                                value={newTask.progress}
                                onChange={(e) => handleChange('progress', e.target.value)}
                                className="form-input p-2 border rounded w-full"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <select
                                value={newTask.priority}
                                onChange={(e) => handleChange('priority', e.target.value)}
                                className="form-select p-2 border rounded w-full"
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <input
                                type="date"
                                value={newTask.due}
                                onChange={(e) => handleChange('due', e.target.value)}
                                className="form-input p-2 border rounded w-full"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <button
                                onClick={addOrUpdateTask}
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                {editTaskId !== null ? 'Update Task' : 'Add Task'}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
