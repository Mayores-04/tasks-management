// pages/api/tasks.js or pages/api/tasks/index.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        // Fetch tasks from the database or return mock data
        res.status(200).json({ tasks: [] }); // Example response
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // Handle other HTTP methods
    }
}
import axios from '../api/axios'; // Adjust path if needed

export const getTasks = async () => {
    const response = await axios.get('/tasks');
    return response.data;
};

export const createTask = async (task) => {
    const response = await axios.post('/tasks', task);
    return response.data;
};

// Add other task-related API functions here
