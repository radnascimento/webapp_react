// src/utils/helper.js
import Swal from 'sweetalert2';

// Recursively convert all object keys to lowercase
const convertObjectKeysToLowerCase = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1); // Only make the first letter lowercase
        acc[newKey] = convertKeysToLowerCase(obj[key]); // Recursively handle nested objects/arrays
        return acc;
    }, {});
};

// Handle the case where the input might be an array, object, or primitive
export const convertKeysToLowerCase = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToLowerCase(item)); // Apply recursively for array elements
    } else if (obj !== null && typeof obj === 'object') {
        return convertObjectKeysToLowerCase(obj); // Handle object keys
    }
    return obj; // If it's a primitive, return it unchanged
};

// Logout function to clear authentication token and redirect to login page
export function handleLogout() {
    sessionStorage.removeItem('authToken');
    window.location.href = '/'; // Redirect to login page
}

// Show SweetAlert for invalid session and log out the user
export function showSessionInvalidAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Access Forbidden',
        text: 'Simultaneous access is not permitted for security reasons. Please log out from other sessions.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
    }).then((result) => {
        if (result.isConfirmed) {
            handleLogout();  // Call the handleLogout function when "OK" is clicked
        }
    });
}


export const isValidYouTubeEmbedUrl = (url) => {
    const pattern = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/;
    return pattern.test(url);
  };