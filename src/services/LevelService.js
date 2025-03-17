import { showSessionInvalidAlert } from '../utils/helper';


const API_URL = `${process.env.REACT_APP_API_URL.trim()}/level`;


const getLevels = async () => {
    try {
        const token = sessionStorage.getItem('authToken'); // Retrieve the token from localStorage

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

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the levels!', error);
        throw error;
    }
};

// Save a new level to the API
const saveLevel = async (level) => {
    try {
        const token = sessionStorage.getItem('authToken'); // Retrieve the token from localStorage

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify(level), // Send the level data as JSON
            
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const savedLevel = await response.json();
        return savedLevel; // Return the saved level data
    } catch (error) {
        console.error('There was an error saving the level!', error);
        throw error;
    }
};

export default {
    getLevels,
    saveLevel, // Export the saveLevel function
};
