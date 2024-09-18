import axios, { AxiosError } from 'axios'; 

// Sign-Up function
export const signUp = async (userData: { username: string; email: string; password: string }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/signup', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error in API call:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

// Sign-In function
export const signIn = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/signin', credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error in API call:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

// Generic API call function
export const apiCall = async () => {
    try {
        const response = await axios.get('/api/endpoint');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error in API call:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};
