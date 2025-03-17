import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './AuthContext';
import foto from '../logo/logo.png'; // Default import
import { Tooltip } from 'antd';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const navigate = useNavigate(); // React Router navigation
    function getProfilePicture() {
        return localStorage.getItem("profile_picture");
    }


    useEffect(() => {
        const token = sessionStorage.getItem('authToken');


        if (token) {
            const decodedToken = jwtDecode(token);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            setEmail(email);
        }
    }, []);

    // Handles closing the tooltip and navigating
    const handleNavigation = (path) => {
        setTooltipVisible(false);
        setTimeout(() => navigate(path), 100);
    };

    // Fix for Logout
    const handleLogout = () => {
        setTooltipVisible(false);
        setTimeout(() => {
            logout(); // Logs out the user
            navigate("/"); // Redirect to login/homepage
        }, 100);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark header">
            <Tooltip
                title={
                    <span style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', display: 'block', color: 'black' }}>
                        {isAuthenticated ? user?.username : ''}<br />
                        {email}<br /><hr />

                        {/* Profile Link */}
                        <Link
                            to="#"
                            className="navbar-brand"
                            onClick={() => handleNavigation("/editUser")}
                        >
                            <i className="fa-regular fa-user" style={{ fontSize: '20px', cursor: 'pointer', color: '#347960' }}></i>
                            &nbsp;Seu Perfil
                        </Link><br /><hr />

                        {/* Help Link */}
                        <Link
                            to="#"
                            className="navbar-brand"
                            onClick={() => handleNavigation("/help")}
                        >
                            <i className="fa-solid fa-circle-info" style={{ fontSize: '20px', cursor: 'pointer', color: '#347960' }}></i>
                            &nbsp;Ajuda
                        </Link><br /><hr />

                        {/* Logout Link - FIXED */}
                        <Link
                            to="#"
                            className="navbar-brand"
                            onClick={handleLogout} // Calls the fixed logout function
                        >
                            <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '20px', cursor: 'pointer', color: '#347960' }}></i>
                            &nbsp;Sair
                        </Link><br />
                    </span>
                }
                open={tooltipVisible}
                onOpen={() => setTooltipVisible(true)}
                onClose={() => setTooltipVisible(false)}
            >
                <Link to="#" className="navbar-brand" onClick={() => setTooltipVisible(!tooltipVisible)}>
                    <img
                        src={foto}
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                    />
                </Link>
            </Tooltip>

            <span style={{
                color: 'white',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>Estude em Movimento</span>

            <div className="ml-auto">
                <Link to="/home" className="btn btn-outline-light btn-sm mx-2" title="Go Home">
                    <i className="fa-solid fa-house"></i>
                </Link>
            </div>
        </nav>
    );
};

export default Header;

