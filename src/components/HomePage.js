import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = () => {
    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">

                <div className="row text-center">
                    <div className="col-md-4">

                        <div className="menu-icon">
                            <Link to="/levels" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <div className="menu-text">Levels</div>
                                </div>
                            </Link>
                        </div>


                    </div>
                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/material" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <div className="menu-text">Materials</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/study" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <div className="menu-text">Studies</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row text-center mt-4">
                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/topics" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <div className="menu-text">Topics</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/users" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fas fa-users"></i>
                                    <div className="menu-text">Users</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    );
};

export default MainContent;
