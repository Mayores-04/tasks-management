import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks'; // Adjust to your backend URL

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization as string;

    try {
        const { id } = req.query;

        // Ensure 'id' is defined and of type string
        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        if (req.method === 'PATCH') {
            // Update a task
            const { title, description, deadline } = req.body;

            if (!title || !description) {
                return res.status(400).json({ message: 'Title and description are required' });
            }

            const response = await axios.patch(`${API_URL}/${id}`, {
                title,
                description,
                deadline,
            }, {
                headers: {
                    Authorization: token,
                },
            });

            res.status(200).json(response.data);
        } else if (req.method === 'DELETE') {
            // Delete a task
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            res.status(200).json(response.data);
        } else {
            res.setHeader('Allow', ['PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error:', error);
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json({ message: error.response.data.message || 'An error occurred' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export default handler;
