import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaBookOpen,  FaPencilAlt,  FaYoutube } from 'react-icons/fa';
import { FaForward , FaBackward } from 'react-icons/fa'; // Import icons for study, save, and navigation buttons
import ModalWithIframe from "./ModalWithIframe";
import studyService from '../services/StudyService';
import topicService from '../services/TopicService';
import studyReviewService from '../services/StudyReviewService';
import SubscribeService from '../services/SubscribeService'; // Import the new SubscribeService
import DateSelector from "./DateSelector"; // Import the DateSelector component
import dayjs from "dayjs";
import Modal from './Modal';
import ModalYt from './ModalYt';


  


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
    const [subscriptions, setSubscriptions] = useState([]); // State for subscriptions
    const [nameTopic, setTitle] = useState(false);
    const [isModalAnswerOpen, setIsModalAnswerOpen] = useState(false);
    const [url, setUrl] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); // Default to today

   

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    
        if (searchTerm === '') {
            setFilteredStudies(studies); // If searchTerm is empty, show all studies
        } else {
            setFilteredStudies(
                studies.filter((study) =>
                    study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    study.nameTopic.toLowerCase().includes(searchTerm.toLowerCase()) // Search in both fields
                )
            );
        }
        
    };
    


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


    const openModal = async (study) => {
        const data = await studyReviewService.getReviewByStudyId(study.encIdStudy);
        setReviews(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = (e) => 
    {
        var ret = subscriptions.recordCount >= subscriptions.maxRecord;
        return ret
    }

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

        const fetchSubscriptions = async () => {
            try {
                const data = await SubscribeService.getSubscriptions();
                setSubscriptions(data[0]);

            } catch (error) {
                console.error('Failed to fetch subscriptions:', error);
            }
        };
        fetchSubscriptions();

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
                        <Link 
                            to={handleSave() ? "#" : "/addStudy"} 
                            className={`btn btn-success btn-sm ${handleSave() ? "disabled-link" : ""}`} 
                            onClick={(e) => handleSave() && e.preventDefault()} // Prevent navigation if disabled
                        >
                            <i className="fas fa-plus-circle"></i>
                        </Link>
                    </div>


                    {/* <div className="d-flex align-items-center">
                        <Link 
                        to="/addStudy" 
                        className={`btn btn-success btn-sm ${handleSave} ? "disabled-link" : ""}`}
                    >
                        <i className="fas fa-plus-circle"></i>
                    </Link>

                    </div> */}
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
                <div className="mb-3 mb-md-0 mr-md-3 d-flex align-items-center w-100">
                    {/* Select dropdown with reduced width */}
                    {/* <select
                        id="filterTopic"
                        value={filterTopic}
                        onChange={handleFilterChange}
                        className="form-select form-select-sm w-auto mr-md-2" // Adjusted width to w-auto
                    >
                        <option value="">Selecione o Tópico</option>
                        {topics.map((topic) => (
                            <option key={topic.encIdStudy} value={topic.name}>
                                {topic.name}
                            </option>
                        ))}
                    </select> */}

                    {/* Search input */}
                    <div className="input-group w-100 w-md-auto mt-2 mt-md-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <FaSearch /> {/* Font Awesome search icon */}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Digite aqui a sua pesquisa"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control form-control-sm"
                        />
                    </div>
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

                                            <ModalWithIframe /> {/* This listens for route changes */}

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

                                                {/* <div>
                                                    <FaCalendarAlt onClick={() => openModal(study)} style={{ cursor: "pointer", fontSize: "20px", color: "#006D77",  }} />
                                                </div> */}
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
                                                          <div className="row">
                                                    <DateSelector selectedDate={new Date(review.operationDate).toLocaleDateString()} onDateChange={(newDate) => setDate(newDate ? newDate.format("YYYY-MM-DD") : null)} />
                                                </div> 

                                                                {index !== reviews.length - 1 && <div className="timeline-line"></div>}
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>

                                               

                                                
                                            </div>

                                            <div className="modal-footer">
                                                <button onClick={closeModal} className='close-btn' >
                                                    Fechar
                                                </button>
                                            </div>
                                        </Modal>

                                    </div>
            <ModalYt
                isOpen={isModalAnswerOpen}
                onClose={closeModalYt}
                nameTopic={nameTopic}
                url={url}
            />

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
                       <FaBackward /> 
                    </button>
                    <span>
                        Página {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        className="btn btn-secondary btn-sm"
                        disabled={currentPage === totalPages}
                    >
                        <FaForward  /> 
                    </button>
                </div>
            </div>

            

        </div>
    );
};

export default Studies;


