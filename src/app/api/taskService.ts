import axios from 'axios';

const addTask = async (title: string, description: string, completed: boolean) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post('http://localhost:5000/api/tasks', {
            title,
            description,
            completed,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

export default addTask;
