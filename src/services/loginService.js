const API_URL = 'http://reactservice.somee.com/api/Authentication/Login';

class LoginService {
    static async login(username, password) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Check if the response is successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid credentials or server error');
            }

            const data = await response.json();

            // Ensure the response contains a token
            if (!data.token) {
                throw new Error('No token received in response');
            }

            // Store the token securely in localStorage (can be replaced with cookies for better security)
            localStorage.setItem('authToken', data.token);

            // Optionally return the token and user data
            return { token: data.token, user: data.user || null }; // Adjust if API provides user info
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error(error.message || 'An error occurred while logging in');
        }
    }
}

export default LoginService;
