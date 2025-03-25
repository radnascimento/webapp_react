import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaChartBar, FaSync } from 'react-icons/fa'; // Import icons

const WeeklyStatsModal = ({ year, month, week, totalReviews, onRefresh }) => {
    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h5 className="mb-0 d-flex align-items-center justify-content-center">
                                <FaChartBar className="me-2" />
                                Estatísticas Semanais
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <label htmlFor="year" className="form-label fw-bold d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" />
                                    Ano
                                </label>
                                <input
                                    id="year"
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={year}
                                    readOnly
                                    aria-label="Ano"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="month" className="form-label fw-bold d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" />
                                    Mês
                                </label>
                                <input
                                    id="month"
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={month}
                                    readOnly
                                    aria-label="Mês"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="week" className="form-label fw-bold d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" />
                                    Semana
                                </label>
                                <input
                                    id="week"
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={week}
                                    readOnly
                                    aria-label="Semana"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="totalReviews" className="form-label fw-bold d-flex align-items-center">
                                    <FaChartBar className="me-2" />
                                    Total de Revisões
                                </label>
                                <input
                                    id="totalReviews"
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={totalReviews}
                                    readOnly
                                    aria-label="Total de Revisões"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add PropTypes validation
WeeklyStatsModal.propTypes = {
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    week: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onRefresh: PropTypes.func.isRequired, // Function to handle refresh
};

export default WeeklyStatsModal;