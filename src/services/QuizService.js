import { showSessionInvalidAlert } from '../utils/helper';

const API_URL = `${process.env.REACT_APP_API_URL.trim()}/quizQuestion`;

const getQuizQuestion = async (id) => {

    try {
        const token = sessionStorage.getItem('authToken');
        if (!token) throw new Error('Authentication token is missing.');

        const response = await fetch(`${API_URL}/study/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching quiz question:', error);
        throw error;
    }
};

const saveLevel = async (level) => {
    try {
        const token = sessionStorage.getItem('authToken');
        if (!token) throw new Error('Authentication token is missing.');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify(level),
        });

        if (!response.ok) throw new Error('Failed to save the level');

        return await response.json();
    } catch (error) {
        console.error('Error saving level:', error);
        throw error;
    }
};

const saveQuizQuestion = async (quizQuestion) => {
    try {
        const token = sessionStorage.getItem('authToken');
        if (!token) throw new Error('Authentication token is missing.');

        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizQuestion),
        });

        if (!response.ok) throw new Error('Failed to save the quiz question');

        return await response.json();
    } catch (error) {
        console.error('Error saving quiz question:', error);
        throw error;
    }
};

export default {
    getQuizQuestion,
    saveLevel,
    saveQuizQuestion,
};