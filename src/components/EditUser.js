import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import LoginService from '../services/LoginService'; // Ensure correct import
import SubscribeService from '../services/SubscribeService'; // Import the new SubscribeService
import { FaSave, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'; // Import icons
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import { Link } from 'react-router-dom';

const EditUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [subscriptions, setSubscriptions] = useState([]); // State for subscriptions

    useEffect(() => {
        const token = sessionStorage.getItem('authToken'); // Replace with your actual local storage key
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
            setEmail(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
        }

        // Fetch subscriptions on component mount
        const fetchSubscriptions = async () => {
            try {
                const data = await SubscribeService.getSubscriptions();
                setSubscriptions(data[0]);
            } catch (error) {
                console.error('Failed to fetch subscriptions:', error);
            }
        };
        fetchSubscriptions();
    }, []);

    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: 'Atenção',
                text: 'Os campos [Nova Senha] e [Confirmar Nova Senha] não conferem!',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });
            return;
        }

        setLoading(true);

        try {
            await LoginService.updateUser(username, email, currentPassword, newPassword);
            Swal.fire({
                title: 'Update Successful',
                text: 'Your details have been updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            Swal.fire({
                title: 'Update Failed',
                text: error.message || 'An error occurred while updating your details',
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
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaUser size={30} className="mr-3" /> 
                        <h2 className="mb-0 heading-spacing">Perfil</h2> {/* Title */}
                    </div>
                </div>

                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Página Inicial</Link>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">


               



                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nome de Usuário</label>
                            <input type="text" id="username" className="form-control bg-light" value={username} disabled />
                        </div>

                        
                            <div className="mb-3">
                                <label className="form-label">
                                    Por aqui desde 
                                </label>
                                <div className="form-control bg-light">Março de 2025.</div>
                            </div>


                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input type="email" id="email" className="form-control" value={email} disabled={loading} />
                        </div>
                        {[{
                            label: 'Senha Atual',
                            state: currentPassword,
                            setState: setCurrentPassword,
                            field: 'currentPassword'
                        }, {
                            label: 'Nova Senha',
                            state: newPassword,
                            setState: setNewPassword,
                            field: 'newPassword'
                        }, {
                            label: 'Confirmar Nova Senha',
                            state: confirmPassword,
                            setState: setConfirmPassword,
                            field: 'confirmPassword'
                        }].map(({ label, state, setState, field }) => (
                            <div className="mb-3" key={field}>
                                <label htmlFor={field} className="form-label">{label}</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword[field] ? 'text' : 'password'}
                                        id={field}
                                        className="form-control"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => togglePasswordVisibility(field)}
                                    >
                                        {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="text-start">
                            <button type="submit" className="btn btn-success btn-sm" disabled={loading}>
                                <FaSave size={20} className="mr-2" />
                                {loading ? 'Atualizando...' : ' Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
                <br />
                <div className="bg-white p-4 rounded shadow-sm">
                    <h4>Dados da Assinatura</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Tipo do Plano
                            </label>
                            <div className="form-control bg-light">Gratuito, acesso básico.</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="conteudocadastrado" className="form-label">
                                Quantidade de Conteúdo Cadastrado
                            </label>
                            <input
                                type="text"
                                id="conteudocadastrado"
                                className="form-control bg-light"
                                value={subscriptions.recordCount}
                                disabled
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="conteudocontrato" className="form-label">
                                Quantidade de Conteúdo Contratado
                            </label>
                            <input
                                type="text"
                                id="conteudocontrato"
                                className="form-control bg-light"
                                value={subscriptions.maxRecord} // Placeholder for content contracted
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
