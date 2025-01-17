// services/TopicService.js

const API_URL = 'http://reactservice.somee.com/api/topic';

// Fetch all topics
const getTopics = async () => {
    try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch topics');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the topics!', error);
        throw error;
    }
};

// Fetch a single topic by its ID
const getTopicById = async (id) => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the topic');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the topic!', error);
        throw error;
    }
};

// Save a new topic
const saveTopic = async (topic) => {
    

    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(topic),
        });

        if (!response.ok) {
            throw new Error('Failed to save the topic');
        }

        const savedTopic = await response.json();
        return savedTopic;
    } catch (error) {
        console.error('There was an error saving the topic!', error);
        throw error;
    }
};

// Update an existing topic
const updateTopic = async (id, topic) => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(topic),
        });

        if (!response.ok) {
            throw new Error('Failed to update the topic');
        }

        const updatedTopic = await response.json();
        return updatedTopic;
    } catch (error) {
        console.error('There was an error updating the topic!', error);
        throw error;
    }
};

// Delete a topic
const deleteTopic = async (id) => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete the topic');
        }

        return { success: true };
    } catch (error) {
        console.error('There was an error deleting the topic!', error);
        throw error;
    }
};

export default {
    getTopics,
    getTopicById,
    saveTopic,
    updateTopic,
    deleteTopic,
};
