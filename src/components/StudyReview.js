import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaYoutube, FaComments , FaThumbtack } from 'react-icons/fa';
import { FaFrown, FaMeh, FaMehRollingEyes, FaSmile, FaGrinStars, FaStar } from 'react-icons/fa';
import studyService from '../services/StudyReviewService';
import topicService from '../services/TopicService';
import Modal from './Modal';
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";
import Accordion from './Accordion'; // Import the Accordion component
import ModalYt from './ModalYt';





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
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const closeModalYt = () => {
        setIsModalAnswerOpen(false);
    };

    const openModalYt = (study) => {

        if (!study || Object.keys(study).length === 0) {
            return;
        }
        setUrl(study.url);
        setTitle(study.nameTopic);
        setIsModalAnswerOpen(true);
    };
  

    const teste = (id) => {
        setStudies((prevStudies) => prevStudies.filter(study => study.encIdStudyReview !== id));
        setFilteredStudies((prevFiltered) => prevFiltered.filter(study => study.encIdStudyReview !== id));
    };

    const openWeek = async () => {
        try {
            const data = await studyService.getReviewsWeekly();
            let year = 0;
            let month = 0;
            let week = 0;
            let totalReviews = 0;

            if (data && data.length > 0) {
                data.forEach((review) => {
                    year = review.year;
                    month = review.month;
                    week = review.week;
                    totalReviews += review.totalReviews;
                });
            }

            Swal.fire({
                title: 'Revisão Semanal',
                html: `
          <p><strong>Ano:</strong> ${year}</p>
          <p><strong>Mês:</strong> ${month}</p>
          <p><strong>Semana:</strong> ${week}</p>
          <p><strong>Total:</strong> ${totalReviews}</p>
        `,
                icon: 'info',
                confirmButtonText: 'Ok!',
                confirmButtonColor: "#347960",
            });
        } catch (error) {
            console.error('Error fetching weekly reviews:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch weekly review data.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    const openModalAnswer = (study) => {

        if (!study || Object.keys(study).length === 0) {
            return;
        }
        
        setTitle(study.nameTopic);
        setIsModalAnswerOpen(true);
    };



    const openModal = (study) => {
        if (!study || Object.keys(study).length === 0) {
            return;
        }

        if (!study || !study.url || study.url.trim().length === 0) {
            return;
        }
        setUrl(study.url);
        setTitle(study.nameTopic);
        setIsModalOpen(true);
        
    };

    const closeModal = () => {
        setIsModalOpen(false);
        
    };

    const closeModalAnswer = () => {
        setIsModalAnswerOpen(false);
    };

    
      


    // Function to generate stars
    const getStars = () => {
        const stars = [1, 2, 3, 4, 5].map(index => `
        <span class="star" data-index="${index}" style="font-size: 30px; cursor: pointer; color: gray;">&#9733;</span>
    `).join('');
        return stars;
    };

    const handleRevisado = async (study) => {
        let rating;  // Initialize the rating variable in the correct scope

        // Display the Swal modal with stars
        const result = await Swal.fire({
            title: "Classifique seu conhecimento",
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
        else if (result.isConfirmed)
        {
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
                                // title={topic.name}

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
                                                                <FaThumbtack  style={{ fontSize: "20px", color: "#006D77" }} />
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


                <Modal isOpen={isModalOpen} onClose={closeModal}>

                    <h5 className="card-title">
                        {nameTopic}
                    </h5>


                    <div class="video-container">
                        <iframe
                            src={url}
                            loading="lazy"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            title="YT"
                        ></iframe>
                    </div>

                    <div className="modal-footer">
                        <button onClick={closeModal} className="close-button">
                            Close
                        </button>
                    </div>
                </Modal>


                {/* <Modal isOpen={isModalAnswerOpen} onClose={closeModalAnswer}>

                    <h5 className="card-title">
                        {nameTopic} - <span>Respostas</span>
                    </h5>


                    <div class="video-container">
                        <iframe
                            src={url}
                            loading="lazy"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            title="YT"
                        ></iframe>
                    </div>

                    <div className="modal-footer">
                        <button onClick={closeModalAnswer} className="close-button">
                            Close
                        </button>
                    </div>
                </Modal> */}

<ModalYt
                isOpen={isModalAnswerOpen}
                onClose={closeModalYt}
                nameTopic={nameTopic}
                url={url}
            />





                <br></br>
            </div>
        </div>
    );
};

export default Studies;