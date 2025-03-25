import {  showSessionInvalidAlert } from '../utils/helper';

const BASE_URL = process.env.REACT_APP_API_URL.trim();

class LoginService {

    static async googlelogin(token, clientip, recaptcha)
    {
        

        try {
            const response = await fetch(`${BASE_URL}/Authentication/googlelogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ token, clientip, recaptcha: recaptcha }),
            });

            if (!response.ok) {

                const errorData = await response.text();

                if (errorData.includes("Session ID is not valid.")) {
                    showSessionInvalidAlert();
                }

                throw new Error(errorData); // You can throw a custom error message
            }

            const data = await response.json();

            if (!data.token) {
                throw new Error('Authentication failed: No token received');
            }

            sessionStorage.setItem('authToken', data.token);

            return { token: data.token, user: data.user || null };
        } catch (error) {
            alert(error);
            console.error('Login failed:', error.message);
            throw new Error(error.message || 'An error occurred while logging in');
        }
    }


    static async login(userName, password, clientip, token) {

        try {
            const response = await fetch(`${BASE_URL}/Authentication/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ userName, password, clientip, recaptcha:token }),
            });

            if (!response.ok) {

                const errorData = await response.text();

                if (errorData.includes("Session ID is not valid.")) {
                    showSessionInvalidAlert();
                }

                throw new Error(errorData); // You can throw a custom error message
            }

            const data = await response.json();

            if (!data.token) {
                throw new Error('Authentication failed: No token received');
            }

            sessionStorage.setItem('authToken', data.token);

            return { token: data.token, user: data.user || null };
        } catch (error) {
            console.error('Login failed:', error.message);
            throw new Error(error.message || 'An error occurred while logging in');
        }
    }

    static async register(userName, email, password) {
        try {
            const response = await fetch(`${BASE_URL}/Authentication/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ userName, email, password }),
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
            console.error('Registration failed:', error.message);
            throw new Error(error.message || 'An error occurred during registration');
        }
    }

    static async updateUser(username, email, currentPassword, newPassword) {
        try {
            const response = await fetch(`${BASE_URL}/Authentication/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ username, email, currentPassword, newPassword }),
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
            console.error('Update failed:', error.message);
            throw new Error(error.message || 'An error occurred while updating');
        }
    }

    static async resetPassword(userId, token, newPassword) {
        try {
            const response = await fetch(`${BASE_URL}/Authentication/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ userId, token, newPassword }),
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
            console.error('Password reset failed:', error.message);
            throw new Error(error.message || 'An error occurred while resetting password');
        }
    }

    static async forgotPassword(email) {
        try {

            const url = `${BASE_URL}/Authentication/`;


            const response = await fetch(`${BASE_URL}/Authentication/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, url }),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to send password reset email';

                try {
                    const errorData = await response.json(); // Might fail if response is empty
                    errorMessage = errorData?.message ?? errorMessage;
                } catch (jsonError) {
                    console.warn('Error parsing JSON response:', jsonError);
                }

                alert(errorMessage);
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error('Forgot password request failed:', error.message);
            throw new Error(error.message || 'An error occurred while processing your request');
        }
    }


    static logout() {
        sessionStorage.removeItem('authToken');
    }

    static getAuthToken() {
        return sessionStorage.getItem('authToken');
    }
}

export default LoginService;