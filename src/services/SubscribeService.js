import { showSessionInvalidAlert } from '../utils/helper';
const API_URL = `${process.env.REACT_APP_API_URL.trim()}/Subscribe`;

// Get all subscriptions
const getSubscriptions = async () => {
    try {
        const token = sessionStorage.getItem('authToken'); // Retrieve the token from sessionStorage

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
        console.error('There was an error fetching the subscriptions!', error);
        throw error;
    }
};

// Subscribe to a new topic
const subscribe = async (subscription) => {
    try {
        const token = sessionStorage.getItem('authToken'); // Retrieve the token from sessionStorage

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
            body: JSON.stringify(subscription), // Send the subscription data as JSON
        });

        if (!response.ok) {
            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const savedSubscription = await response.json();
        return savedSubscription; // Return the saved subscription data
    } catch (error) {
        console.error('There was an error subscribing!', error);
        throw error;
    }
};

// Unsubscribe from a topic
const unsubscribe = async (subscriptionId) => {
    try {
        const token = sessionStorage.getItem('authToken'); // Retrieve the token from sessionStorage

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(`${API_URL}/${subscriptionId}`, {
            method: 'DELETE',
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

        return { message: 'Unsubscribed successfully' }; // Return a success message
    } catch (error) {
        console.error('There was an error unsubscribing!', error);
        throw error;
    }
};

export default {
    getSubscriptions,
    subscribe,
    unsubscribe,
};
