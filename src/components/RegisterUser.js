import React, { useState } from 'react';
import Swal from 'sweetalert2'; // SweetAlert2 import
import LoginService from '../services/LoginService'; // Import LoginService
import {     EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { FaSave, FaUser } from 'react-icons/fa'; // Import the users icon from react-icons

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
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
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
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
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
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });
            


        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/*<h2 className="text-center mb-4">Register New User</h2>*/}

                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaUser size={30} className="mr-3" /> 
                        <h2 className="mb-0">Cadastro</h2> 
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nome de Usuário</label>
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
                        <label htmlFor="email" className="form-label">E-mail</label>
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
                        <label htmlFor="password" className="form-label">Senha</label>
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
                        <label htmlFor="rePassword" className="form-label">Confirmar Senha</label>
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

                    {/*<div className="text-center">*/}
                    {/*    <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>*/}
                    {/*        {loading ? 'Registering...' : 'Register User'}*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    <div className="text-start">
                        <button type="submit" className="btn btn-success btn-sm" disabled={loading}>
                            <FaSave size={20} className="mr-2" />
                            {loading ? 'Atualizando...' : ' Salvar'}
                        </button>
                    </div>



                </form>
            </div>
            <br />
        </div>
    );
};

export default RegisterUser;
