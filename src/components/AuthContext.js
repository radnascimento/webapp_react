import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the context
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Check if token exists in localStorage on component mount
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Optionally, fetch user data from an API or from token
            const storedUser = JSON.parse(sessionStorage.getItem('user')); // You can store the user info along with token
            setUser(storedUser);
        }
    }, []);

    // Login function
    //const login = (token, userData) => {


    //    setIsAuthenticated(true);
    //    setUser(userData);
    //    localStorage.setItem('token', token); // Store the token
    //    localStorage.setItem('user', JSON.stringify(userData)); // Optionally store user info


    //    try {
    //        const decodedToken = jwtDecode(token); // Decode the token
    //        const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']; // Access the 'name' claim using the URI


    //        // Optionally, you can store the username in localStorage or in state
    //        localStorage.setItem('userName', userName);

    //        alert(`Welcome, ${userName}`); // Display the username
    //    } catch (error) {
    //        console.error("Error decoding token", error);
    //    }

    //};

    const login = (token, userData) => {
        setIsAuthenticated(true);

        try {
            const decodedToken = jwtDecode(token); // Decode the token
            const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']; // Access the 'name' claim using the URI

            // Create a new userData object with the 'name' property added
            const updatedUserData = { ...userData, username: userName };


            userData = updatedUserData;

            // Update the user data with the 'name' property
            setUser(userData);

            // Store the token and updated user data in localStorage
            sessionStorage.setItem('token', token); // Store the token
            sessionStorage.setItem('user', JSON.stringify(userData)); // Store updated user info with 'name'

            // Optionally, you can store the username in localStorage
            sessionStorage.setItem('userName', userName);

        } catch (error) {
            console.error("Error decoding token", error);
        }
    };

    // Logout function
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    };

    // Get token from localStorage
    const getToken = () => {
        return sessionStorage.getItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth hook to consume the context
export function useAuth() {
    return useContext(AuthContext);
}
