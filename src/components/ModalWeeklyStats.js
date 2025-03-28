import React from 'react';
import PropTypes from 'prop-types';
import { FaChartBar, FaSync, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ModalWeeklyStats = ({ isOpen, onClose, year, month, week, totalReviews, onRefresh , weekpPending }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <style>
                {`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    border-radius: 10px;
                    width: 80%;
                    max-width: 600px;
                    padding: 20px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .modal-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #2c3e50;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .stat-card {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .stat-icon {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                    .stat-value-pending {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #dc3545;
                    margin: 5px 0;
                }
                .stat-value {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #347960;
                    margin: 5px 0;
                }
                .stat-label {
                    font-size: 1rem;
                    color: #6c757d;
                }
                .modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }
                .btn {
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .btn-primary {
                    background-color: #347960;
                    color: white;
                    border: none;
                }
                .btn-primary:hover {
                    background-color: #2a614b;
                }
                .btn-close {
                    background-color: #f8f9fa;
                    color: #6c757d;
                    border: 1px solid #dee2e6;
                }
                .btn-close:hover {
                    background-color: #e9ecef;
                }
                `}
            </style>

            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">
                        <FaChartBar /> Estatísticas
                    </h3>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaThumbsUp className="stat-icon" style={{ color: '#006D77' }} />
                        <div className="stat-value">{totalReviews}</div>
                        <div className="stat-label">Concluídas</div>
                    </div>
                    <div className="stat-card">
                        <FaThumbsDown className="stat-icon" style={{ color: '#dc3545' }} />
                        <div className="stat-value-pending">{weekpPending}</div>
                        <div className="stat-label">Pendentes</div>
                    </div>

                    </div>
                    <div><h6>Últimos 7 dias</h6></div>
                <div className="modal-footer">
                    <button onClick={onClose} className="close-btn">Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalWeeklyStats;