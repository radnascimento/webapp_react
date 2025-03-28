import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import foto from '../logo/logo.png';
import { Tooltip } from 'antd';
import { jwtDecode } from 'jwt-decode';
import ZoomControls from "./ZoomControls";

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');

        if (token) {
            const decodedToken = jwtDecode(token);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            setEmail(email);
        }
    }, []);

    const handleNavigation = (path) => {
        setTooltipVisible(false);
        setTimeout(() => navigate(path), 100);
    };

    const handleLogout = () => {
        setTooltipVisible(false);
        setTimeout(() => {
            logout();
            navigate("/");
        }, 100);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark header">
            <Tooltip
                title={
                    <span style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', display: 'block', color: 'black' }}>
                        {isAuthenticated ? user?.username : ''}<br />
                        {email}<br /><hr />

                        <Link to="#" className="navbar-brand" onClick={() => handleNavigation("/editUser")}>
                            <i className="fa-regular fa-user" style={{ fontSize: '20px', cursor: 'pointer', color: '#347960' }}></i>
                            &nbsp;Seu Perfil
                        </Link><br /><hr />

                        <Link to="#" className="navbar-brand" onClick={() => handleNavigation("/help")}>
                            <i className="fa-solid fa-circle-info" style={{ fontSize: '20px', cursor: 'pointer', color: '#347960' }}></i>
                            &nbsp;Ajuda
                        </Link><br /><hr />

                        <Link to="#" className="navbar-brand" onClick={handleLogout}>
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

            {/* Aligning elements to the left */}
            <div className="d-flex align-items-center">
                <Link to="/home" className="btn btn-outline-light btn-sm mx-2" title="Go Home">
                    <i className="fa-solid fa-house"></i>
                </Link>
            </div>

            {/* Aligning zoom controls to the right and hiding on mobile */}
            <div className="ms-auto d-none d-sm-block d-flex align-items-center gap-2">
                <ZoomControls />
            </div>
        </nav>
    );
};

export default Header;
