import pako from 'pako';
import { convertKeysToLowerCase, showSessionInvalidAlert } from '../utils/helper';


const API_URL = `${process.env.REACT_APP_API_URL.trim()}/study`;


const getStudiescompressed = async ({ Page = 1, PageSize = 50 } = {}) => {
    try {

        const token = sessionStorage.getItem('authToken'); // Retrieve the token from localStorage

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        const response = await fetch(`${API_URL}/compressed?page=${Page}&pageSize=${PageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, br', // Request compressed data
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

        const compressedData = await response.arrayBuffer(); // Get binary data
        const decompressedData = pako.inflate(compressedData, { to: 'string' }); // Decompress the GZIP data and convert it to a string

        let dataArray;
        try {
            dataArray = JSON.parse(decompressedData); // Assuming the decompressed data is a valid JSON string
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
        
        return convertKeysToLowerCase(dataArray); // Parse JSON

    } catch (error) {
        console.error('There was an error fetching the compressed studies!', error);
        throw error;
    }
};



// Fetch all studies
const getStudies = async ({ Page = 1, PageSize = 50, Compressed = false } = {}) => {


    if (Compressed) {
        //return getStudiescompressed();

        try
        {
            return await getStudiescompressed();
            
        } catch (error) {
            return await getStudies();
        }
    }
    else {

        try {
            const token = sessionStorage.getItem('authToken'); // Retrieve the token from localStorage

            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            const response = await fetch(`${API_URL}?page=${Page}&pageSize=${PageSize}`, {
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

            throw error;
        }
    }
};

// Fetch a single study by its ID
const getStudyById = async (id) => {
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
        console.error('There was an error fetching the study!', error);
        throw error;
    }
};

// Save a new study
const saveStudy = async (study) => {

    try {
        const token = sessionStorage.getItem('authToken');

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

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
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
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        // Ensure 'OperationDate' is provided if not set by the user
        if (!study.OperationDate) {
            study.OperationDate = new Date().toISOString(); // Set current date if not specified
        }

        console.log(JSON.stringify(study));
        

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(study),
            
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
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
