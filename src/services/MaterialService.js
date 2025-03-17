import { showSessionInvalidAlert } from '../utils/helper';

const API_URL = `${process.env.REACT_APP_API_URL.trim()}/material`;


// Fetch all materials
const getMaterials = async () => {
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
        console.error('There was an error fetching the materials!', error);
        throw error;
    }
};

// Fetch a single material by its ID
const getMaterialById = async (id) => {
    try {
        const token = sessionStorage.getItem('authToken');

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

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the material!', error);
        throw error;
    }
};

// Save a new material
const saveMaterial = async (material) => {
    try {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(material),
            
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const savedMaterial = await response.json();
        return savedMaterial;
    } catch (error) {
        console.error('There was an error saving the material!', error);
        throw error;
    }
};

// Update an existing material
const updateMaterial = async (id, material) => {
    try {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(material),
            
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const updatedMaterial = await response.json();
        return updatedMaterial;
    } catch (error) {
        console.error('There was an error updating the material!', error);
        throw error;
    }
};

// Delete a material
const deleteMaterial = async (id) => {
    try {
        const token = sessionStorage.getItem('authToken');

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

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        return { success: true };
    } catch (error) {
        console.error('There was an error deleting the material!', error);
        throw error;
    }
};

export default {
    getMaterials,
    getMaterialById,
    saveMaterial,
    updateMaterial,
    deleteMaterial,
};
