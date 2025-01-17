import React, { useState } from 'react';
import Swal from 'sweetalert2'; // SweetAlert2 import

const RegisterUser = () => {
    // State hooks for each form field
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Use SweetAlert2 to show a success message with user information
        Swal.fire({
            title: 'User Registered',
            html: `<strong>Username:</strong> ${username} <br><strong>Email:</strong> ${email} <br><strong>Password:</strong> ${password}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="text-center mb-4">Register New User</h2>

            <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-sm">Register User</button>
                </div>
            </form>
            </div>
            <br></br>
        </div>

    );
};

export default RegisterUser;
