// services/StudyService.js

const API_URL = 'http://reactservice.somee.com/api/study';

// Fetch all studies
const getStudies = async () => {
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
            throw new Error('Failed to fetch studies');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the studies!', error);
        throw error;
    }
};

// Fetch a single study by its ID
const getStudyById = async (id) => {
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
            throw new Error('Failed to fetch the study');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the study!', error);
        throw error;
    }
};

// Save a new study
const saveStudy = async (study) => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        // Ensure 'OperationDate' is provided if not set by the user
        if (!study.OperationDate) {
            study.OperationDate = new Date().toISOString(); // Set current date if not specified
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(study),
        });

        if (!response.ok) {
            throw new Error('Failed to save the study');
        }

        const savedStudy = await response.json();
        return savedStudy;
    } catch (error) {
        console.error('There was an error saving the study!', error);
        throw error;
    }
};

// Update an existing study
const updateStudy = async (id, study) => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        // Ensure 'OperationDate' is provided if not set by the user
        if (!study.OperationDate) {
            study.OperationDate = new Date().toISOString(); // Set current date if not specified
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(study),
        });

        if (!response.ok) {
            throw new Error('Failed to update the study');
        }

        const updatedStudy = await response.json();
        return updatedStudy;
    } catch (error) {
        console.error('There was an error updating the study!', error);
        throw error;
    }
};

// Delete a study
const deleteStudy = async (id) => {
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
            throw new Error('Failed to delete the study');
        }

        return { success: true };
    } catch (error) {
        console.error('There was an error deleting the study!', error);
        throw error;
    }
};

export default {
    getStudies,
    getStudyById,
    saveStudy,
    updateStudy,
    deleteStudy,
};
