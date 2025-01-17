import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark header">
            <a className="navbar-brand" href="#">
                <i class="fa-regular fa-user"></i> {isAuthenticated ? user?.username : ''}
            </a>
            <div className="ml-auto">
                <Link to="/home" className="btn btn-outline-light btn-sm mx-2"><i class="fa-solid fa-house"></i></Link>


                {isAuthenticated ? (
                    <Link
                        to="/"
                        className="btn btn-outline-light btn-sm"
                        onClick={logout}
                    >
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </Link>
                ) : (
                    //    <Link to="/login" className="btn btn-outline-light btn-sm">
                    //    Login
                        //</Link>

                        ""
                )}
            </div>
        </nav>
    );
};

export default Header;
