import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaYoutube, FaComments, FaThumbtack } from 'react-icons/fa';
import studyService from '../services/StudyReviewService';
import topicService from '../services/TopicService';
import Modal from './Modal';
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";
import Accordion from './Accordion'; // Import the Accordion component
import ModalYt from './ModalYt';
import ModalWeeklyStats from './ModalWeeklyStats';

import WeeklyStatsModal from './ModalWeeklyStats'; // Import the modal compon
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer

import AdBannerLeft from "./AdBannerLeft"; 



const Studies = () => {
    const [studies, setStudies] = useState([]);
    const [filteredStudies, setFilteredStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterTopic, setFilterTopic] = useState('');
    const [topics, setTopics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studiesPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAnswerOpen, setIsModalAnswerOpen] = useState(false);
    const [url, setUrl] = useState(false);
    const [nameTopic, setTitle] = useState(false);
    const [comment, setComment] = useState('');
    const [isModalWeekOpen, setIsModalWeekOpen] = useState(false);

    const [weekcompleted, setWeekCompleted] = useState(false);
    const [weekpPending, setWeekPending] = useState(false);




    const closeModalWeek = () => {
        setIsModalWeekOpen(false);
    };

    const openWeek = async (study) => {

        try {
            const data = await studyService.getReviewsWeekly();

            // alert(JSON.stringify(data));

            setWeekCompleted(data.totalReviewsCompleted);
            setWeekPending(data.totalReviewsPending);
            setIsModalWeekOpen(true);


        } catch (error) {
            setError('Failed to fetch studies');
        } finally {
            setLoading(false);
        }
    };

    const closeModalYt = () => {
        setIsModalOpen(false);
    };

    const openModalYt = (study) => {

        if (!study || Object.keys(study).length === 0) {
            return;
        }
        setUrl(study.url);
        setTitle(study.nameTopic);
        setIsModalOpen(true);
    };


    const teste = (id) => {
        setStudies((prevStudies) => prevStudies.filter(study => study.encIdStudyReview !== id));
        setFilteredStudies((prevFiltered) => prevFiltered.filter(study => study.encIdStudyReview !== id));
    };

    const openModalAnswer = (study) => {

        if (!study || Object.keys(study).length === 0) {
            return;
        }

        setTitle(study.nameTopic);
        setComment(study.commentStudy);
        setIsModalAnswerOpen(true);
    };

    const closeModalAnswer = () => {
        setIsModalAnswerOpen(false);
    };

    const getStars = () => {
        const stars = [1, 2, 3, 4, 5].map(index => `
        <span class="star" data-index="${index}" style="font-size: 30px; cursor: pointer; color: gray;">&#9733;</span>
    `).join('');
        return stars;
    };

    const handleRevisado = async (study) => {
        let rating;  // Initialize the rating variable in the correct scope

        const result = await Swal.fire({
            title: "Classifique Seu Conhecimento",
            html: `<p>Qual é o seu nível de conhecimento em relação a este estudo?</p> ${getStars()}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok, confirmar!",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true,
            didOpen: () => {
                const stars = document.querySelectorAll('.star');

                // Initially, all stars are gray
                stars.forEach(star => {
                    star.style.color = 'gray';
                });

                // Add event listener to each star to handle the click event
                stars.forEach(star => {
                    star.addEventListener('click', () => {
                        const clickedIndex = parseInt(star.getAttribute('data-index'));

                        // Light up the stars based on the clicked star's index
                        stars.forEach((s, i) => {
                            s.style.color = i < clickedIndex ? '#f1c40f' : 'gray';
                        });

                        // Store the selected rating
                        rating = clickedIndex;
                    });
                });
            },
            preConfirm: () => {

                return rating; // Return the selected rating when confirming
            }
        });



        if (rating !== undefined) {


            if (result.isConfirmed) {
                const date = new Date(study.operationDate).toISOString().split('T')[0];
                const updatedStudy = {
                    encIdStudyReview: study.encIdStudyReview,
                    reviewed: true,
                    operationDate: date,
                    rating: rating
                };

                await studyService.updateReview(study.encIdStudyReview, updatedStudy);

                Swal.fire({
                    title: "Sucesso!",
                    text: "Conteúdo revisado com sucesso!",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                    buttonsStyling: true,
                });

                teste(study.encIdStudyReview);
            }


            console.log(`User selected a rating of ${rating}`);
        }
        else if (result.isConfirmed) {
            Swal.fire({
                title: "Atenção!",
                text: "Clique nas estrelas para determinar seu nível de conhecimento antes de confirmar a revisão!",
                icon: "warning",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'btn btn-success',
                },
                buttonsStyling: true,
            });
        }



    };

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const data = await studyService.getReviews({ Page: 1, PageSize: 10, Compressed: true });
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
                setTopics(topicData);
            } catch (error) {
                setError('Failed to fetch topics');
            }
        };

        fetchStudies();
        fetchTopics();
        setFilteredStudies(studies);
    }, [studies]);

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


    return (

        

        <div className="container mt-5">
            <AdBannerLeft />
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaCheck size={30} className="mr-3" />
                        <h2 className="mb-0 heading-spacing">Revisões de Conteúdo</h2>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="#" className="btn btn-success btn-sm" onClick={() => openWeek()}>
                            <i className="fas fa-calendar-week"></i>
                        </Link>
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


                <div className="mb-4" style={{ backgroundColor: '#f2f2f2' }}>

                    {topics.map((topic) => {

                        const topicStudies = studies.filter(
                            (study) => study.nameTopic.toLowerCase() === topic.name.toLowerCase()
                        );


                        return topicStudies.length > 0 ? (
                            <Accordion
                                key={topic.encIdTopic}
                                title={
                                    <>
                                        {/* <FontAwesomeIcon icon={faChevronDown} style={{ marginRight: "8px" }} /> */}
                                        <FaCheck style={{ marginRight: "8px" }}></FaCheck>
                                        {topic.name}
                                    </>
                                }

                                hasContent={topicStudies.length > 0}
                            >
                                {topicStudies.map((study) => (

                                    <div key={study.encIdStudyReview} className="col-12">

                                        <div class="card shadow-sm">

                                            <div className="card-body">
                                                <p className="card-text">
                                                    <strong>Tópico: </strong>
                                                    {study.nameTopic}
                                                </p>

                                                <p className="card-text">
                                                    <strong>Conteúdo:</strong>{" "}
                                                    <ReactMarkdown>{study.noteStudy}</ReactMarkdown>
                                                </p>


                                            </div>
                                            <div class="card-footer">
                                                <div class="icon-group">
                                                    {!study.readOnly && (
                                                        <div>
                                                            <span
                                                                onClick={() => handleRevisado(study)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <FaThumbtack style={{ fontSize: "20px", color: "#006D77" }} />
                                                            </span>
                                                        </div>
                                                    )}

                                                    {study.commentStudy && (
                                                        <div>
                                                            <span
                                                                onClick={() => openModalAnswer(study)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <FaComments style={{ fontSize: "20px", color: "#006D77" }} />
                                                            </span>
                                                        </div>
                                                    )}

                                                    {study.url && (

                                                        <div>
                                                            <span
                                                                onClick={() => openModalYt(study)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <FaYoutube style={{ fontSize: "20px", color: "#006D77", }} />
                                                            </span>

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                    </div>

                                ))}
                            </Accordion>
                        ) : null;
                    })}

                </div>


                <Modal isOpen={isModalAnswerOpen} onClose={closeModalAnswer}>

                    <h5 className="card-title">
                        <span>Comentário</span>
                    </h5>


                    <div class="video-container">
                        {comment}
                    </div>

                    <div className="modal-footer">
                        <button onClick={closeModalAnswer} className="close-btn">Fechar</button>

                    </div>
                </Modal>

                <ModalYt
                    isOpen={isModalOpen}
                    onClose={closeModalYt}
                    nameTopic={nameTopic}
                    url={url}
                />


                <ModalWeeklyStats
                    isOpen={isModalWeekOpen}
                    onClose={closeModalWeek}
                    year={2025}
                    month={3}
                    week={3}
                    totalReviews={weekcompleted}
                    weekpPending={weekpPending}
                />


                <br></br>
            </div>

            
        </div>
    );
};

export default Studies;