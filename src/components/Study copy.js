import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaCalendarAlt, FaBookOpen, FaEye, FaPencilAlt, FaPen, faCircleLeft } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight , FaCircleLeft } from 'react-icons/fa'; // Import icons for study, save, and navigation buttons

import studyService from '../services/StudyService';
import topicService from '../services/TopicService';
import studyReviewService from '../services/StudyReviewService';
import ReactMarkdown from "react-markdown";
import Modal from './Modal';

import { Calendar } from "antd";
import dayjs from "dayjs";

const dateCellRender = (value: dayjs.Dayjs) => {
    if (value.isSame(dayjs(review.operationDate), "day")) {
      return <div className="timeline-date">{review.nameStudyPC}</div>;
    }
  };

  
const Studies = () => {
    const [studies, setStudies] = useState([]);
    const [filteredStudies, setFilteredStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterTopic, setFilterTopic] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studiesPerPage] = useState(6);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    const openModal = async (study) => {
        const data = await studyReviewService.getReviewByStudyId(study.encIdStudy);
        setReviews(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDateChange = (e) => {
        const newSelectedDate = e.target.value;
        setSelectedDate(newSelectedDate);

        if (newSelectedDate === '') {
            setFilteredStudies(studies);
        } else {
            setFilteredStudies(
                studies.filter((study) => {
                    const studyDate = new Date(study.operationDate).toISOString().split('T')[0];
                    return studyDate.includes(newSelectedDate);
                })
            );
        }
    };

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const data = await studyService.getStudies({
                    Page: 1,
                    PageSize: 6,
                    Compressed: true
                });
                setStudies(data);
                setFilteredStudies(data);
            } catch (error) {
                setError('Failed to fetch studies');
            } finally {
                setLoading(false);
            }
        };

        const fetchTopics = async () => {
            try {
                const topicData = await topicService.getTopics();

                /*alert(JSON.stringify(topicData));*/



                setTopics(topicData);
            } catch (error) {
                setError('Failed to fetch topics');
            }
        };

        fetchStudies();
        fetchTopics();
    }, []);

    const handleFilterChange = (e) => {
        const selectedTopic = e.target.value;
        setFilterTopic(selectedTopic);

        if (selectedTopic === '') {
            setFilteredStudies(studies);
        } else {
            setFilteredStudies(
                studies.filter((study) => study.nameTopic.toLowerCase().includes(selectedTopic.toLowerCase()))
            );
        }
    };

    const indexOfLastStudy = currentPage * studiesPerPage;
    const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
    const currentStudies = filteredStudies.slice(indexOfFirstStudy, indexOfLastStudy);
    const totalPages = Math.ceil(filteredStudies.length / studiesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBookOpen size={30} className="mr-3" />
                        <h2 className="mb-0 heading-spacing">Conteúdo</h2>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="/addStudy" className="btn btn-success btn-sm">
                            <i className="fas fa-plus-circle"></i>
                        </Link>
                    </div>
                </div>

                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Página Inicial</Link>
                            </li>
                            {/*<li className="breadcrumb-item active" aria-current="page">*/}
                            {/*    Gerenciamento de Conteúdo*/}
                            {/*</li>*/}
                        </ol>
                    </nav>
                </div>

                <div className="p-3 mb-4" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="d-flex flex-column flex-md-row align-items-start">

                        <div className="mb-3 mb-md-0 mr-md-3">

                            <label htmlFor="filterTopic" className="form-label fw-semibold">
                                Pesquisar por Tópico:
                            </label>
                            <select
                                id="filterTopic"
                                value={filterTopic}
                                onChange={handleFilterChange}
                                className="form-select form-select-sm w-auto"
                            >
                                <option value="">Selecione o Tópico</option>
                                {topics.map((topic) => (
                                    <option key={topic.encIdStudy} value={topic.name}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <br></br>

                {loading && <div>Loading studies...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                    <div className="row">
                        {currentStudies.map((study, index) => (

                            <div key={study.idStudy} className="col-12">
                            
                                <div key={study.idStudy} >

                                    <div class="card shadow-sm">
                                        <div class="card-body text-left">
                                            <h6 class="card-title fw-bold">{study.nameTopic}</h6>
                                            <Link
                                                to={`/detailStudy/${study.encIdStudy}`}
                                                style={{ color: "#006D77", textDecoration:"none" }}
                                            >
                                                <p class="card-text text-muted"> {study.description}</p>    
                                            </Link>
                                        </div>

                                        <div class="card-footer">
                                            <div class="icon-group">
                                                {!study.readOnly && (
                                                    
                                                        <Link
                                                            to={`/EditStudy/${study.encIdStudy}`}
                                                            style={{ fontSize: "20px", color: "#006D77" }}
                                                        >
                                                            <FaPencilAlt />
                                                        </Link>
                                                    
                                                )}

                                                <div>
                                                    <FaCalendarAlt onClick={() => openModal(study)} style={{ fontSize: "20px", color: "#006D77",  }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card-body d-flex flex-column flex-grow-1">

                                   
                                    <div className="mt-auto">

                                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                                            <h5 className="card-title">
                                                Próxima Revisão
                                            </h5>
                                            <h6>
                                                {study.description}
                                            </h6>
                                            <div className="container simple-timeline">
                                                <div className="row">
                                                    {reviews.map((review, index) => (
                                                        <div key={index} className="col-md-6 mb-3">
                                                            <div
                                                                className={`timeline-item card p-3 shadow-sm ${review.nameStudyPC === "Read" ? "bg-success text-white" : ""
                                                                    }`}
                                                            >
                                                                <div className="timeline-date">
                                                                    

                                                                    {/* {new Date(review.operationDate).toLocaleDateString()} */}

                                                                    
                                                                    <Calendar dateCellRender={dateCellRender} />;
                                                                </div>
                                                                {index !== reviews.length - 1 && <div className="timeline-line"></div>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                <button onClick={closeModal} style={{
                                                    backgroundColor: "#347960",
                                                    color: "#ffffff",
                                                    border: "none",
                                                    padding: "10px 20px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    fontSize: "12px",
                                                    transition: "background-color 0.3s ease",
                                                }}>
                                                    Ok
                                                </button>
                                            </div>
                                        </Modal>

                                    </div>
                                </div>
                                <br></br>
                            </div>
                           
                        ))}
                    </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        className="btn btn-secondary btn-sm"
                        disabled={currentPage === 1}
                    >
                       <FaArrowLeft /> Anterior
                    </button>
                    <span>
                        Página {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        className="btn btn-secondary btn-sm"
                        disabled={currentPage === totalPages}
                    >
                       Próxima <FaArrowRight  /> 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Studies;


