import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization as string | undefined;

    try {
        if (req.method === 'POST') {
            const { title, description, completed } = req.body;

            // Basic validation for required fields
            if (!title || !description) {
                return res.status(400).json({ message: 'Title and description are required' });
            }

            // Pass the token to the backend service
            const response = await axios.post(API_URL, {
                title,
                description,
                completed,
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });

            // Return the response data from the backend service
            return res.status(201).json(response.data);
        } else if (req.method === 'GET') {
            // Fetch tasks from the backend service
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });

            // Return the response data from the backend service
            return res.status(200).json(response.data);
        } else {
            // Handle methods other than POST or GET
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error:', error);

        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || 'An error occurred with the request'
            });
        } else {
            // Handle other errors
            return res.status(500).json({
                message: 'An unexpected error occurred'
            });
        }
    }
};


export default handler;
