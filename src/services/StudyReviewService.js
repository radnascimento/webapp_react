import pako from 'pako'; // Importing pako to handle compression/decompression
import { convertKeysToLowerCase, showSessionInvalidAlert } from '../utils/helper';

const API_URL = `${process.env.REACT_APP_API_URL.trim()}/Reviews`;

// Fetch compressed reviews
const getReviewsCompressed = async ({ Page = 1, PageSize = 50 } = {}) => {

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
            throw error;
        }

        return convertKeysToLowerCase(dataArray); // Parse JSON and convert keys to lowercase if necessary

    } catch (error) {
        console.error('There was an error fetching the compressed reviews!', error);
        throw error;
    }
};

// Fetch all reviews
const getReviews = async ({ Page = 1, PageSize = 50, Compressed = false } = {}) => {


    if (Compressed) {
        return getReviewsCompressed({ Page, PageSize });
    } else {
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
            console.error('There was an error fetching the reviews!', error);
            throw error;
        }
    }
};


// Fetch all reviews
const getReviewsWeekly = async () => {
    
        try {
            const token = sessionStorage.getItem('authToken'); // Retrieve the token from localStorage

            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            const response = await fetch(`${API_URL}/getstudyreviewsweekly`, {
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
            console.error('There was an error fetching the reviews!', error);
            throw error;
        }
    
};


// Fetch a single review by its ID
const getReviewByStudyId = async (id) => {

    try {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }
        

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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the review!', error);
        throw error;
    }
};


// Fetch a single review by its ID
const getReviewById = async (id) => {
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
        console.error('There was an error fetching the review!', error);
        throw error;
    }
};

// Save a new review
const saveReview = async (review) => {
    try {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        // Ensure 'OperationDate' is provided if not set by the user
        if (!review.OperationDate) {
            review.OperationDate = new Date().toISOString(); // Set current date if not specified
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const savedReview = await response.json();
        return savedReview;
    } catch (error) {
        console.error('There was an error saving the review!', error);
        throw error;
    }
};

// Update an existing review
const updateReview = async (id, review) => {

    try {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        // Ensure 'OperationDate' is provided if not set by the user
        if (!review.OperationDate) {
            review.OperationDate = new Date().toISOString(); // Set current date if not specified
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) {

            const errorData = await response.text();

            if (errorData.includes("Session ID is not valid.")) {
                showSessionInvalidAlert();
            }

            throw new Error(errorData); // You can throw a custom error message
        }

        const updatedReview = await response.json();
        return updatedReview;
    } catch (error) {
        console.error('There was an error updating the review!', error);
        alert(error);

        throw error;
    }
};

// Delete a review
const deleteReview = async (id) => {
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
        console.error('There was an error deleting the review!', error);
        throw error;
    }
};

export default {
    getReviews,
    getReviewById,
    saveReview,
    updateReview,
    deleteReview,
    getReviewsWeekly,
    getReviewByStudyId
};
