import React from 'react';
import { Link } from 'react-router-dom';


const MainContent = () => {
    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/StudyReview" style={{ textDecoration: 'none' }}> 
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i class="fa-solid fa-check"></i>
                                    <div className="menu-text">Revisões</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/study" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <div className="menu-text">Conteúdo</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="menu-icon">
                            <Link to="/topics" style={{ textDecoration: 'none' }}> {/* Inline style to remove underline */}
                                <div className="menu-icon" style={{ borderRadius: '5%', border: '2px solid #ddd', padding: '10px' }}>
                                    <i className="fa-solid fa-list"></i>
                                    <div className="menu-text">Tópicos</div>
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
