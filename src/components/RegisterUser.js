import React, { useState } from 'react';
import Swal from 'sweetalert2'; // SweetAlert2 import
import LoginService from '../services/LoginService'; // Import LoginService
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState(''); // Re-enter password state
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Check if passwords match
        if (password !== rePassword) {
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setLoading(false);
            return;
        }

        try {
            await LoginService.register(username, email, password);

            Swal.fire({
                title: 'Registration Successful',
                text: `User ${username} has been registered successfully! The user will receive an e-mail to confirm the register and after that the access will be available.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Clear form fields after successful registration
            setUsername('');
            setEmail('');
            setPassword('');
            setRePassword('');
        } catch (error) {
            Swal.fire({
                title: 'Registration Failed',
                text: error.message || 'An error occurred while registering the user',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <h2 className="text-center mb-4">Register New User</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rePassword" className="form-label">Re-enter Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="rePassword"
                                className="form-control"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </button>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                            {loading ? 'Registering...' : 'Register User'}
                        </button>
                    </div>
                </form>
            </div>
            <br />
        </div>
    );
};

export default RegisterUser;
