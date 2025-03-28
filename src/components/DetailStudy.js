import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import studyService from '../services/StudyService';
import topicService from '../services/TopicService';
import { FaSave, FaBookOpen } from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import Swal from 'sweetalert2';
import studyReviewService from '../services/StudyReviewService';

const DetailStudy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [study, setStudy] = useState(null);
    const [idTopic, setIdTopic] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [topics, setTopics] = useState([]);
    const [note, setNote] = useState('');
    const [description, setDescription] = useState('');
    const [nextReview, setNextReview] = useState('');

    const loadData = async () => {
        Swal.fire({
            title: 'Aguarde',
            text: 'O conteúdo está sendo carregado...',
            icon: 'info', // Adds an information icon
            allowOutsideClick: false, // Disables closing the alert by clicking outside
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            confirmButtonText: 'Ok', // Customize the button text
            customClass: {
                confirmButton: 'btn btn-success' // Apply the Bootstrap success button class
            },
            buttonsStyling: false,  // Disable SweetAlert2's default button styling
        });
    };

    // Fetch topics and levels on component mount
    useEffect(() => {

        loadData();

        const fetchData = async () => {
            try {
                const topicsData = await topicService.getTopics();
                setTopics(topicsData);
                const data = await studyService.getStudyById(id);
                setStudy(data);
                setIdTopic(data.idTopic);
                setNote(data.note);
                setDescription(data.description);
                
                const dataReview = await studyReviewService.getReviewByStudyId(data.encIdStudy);
                const rawDate = new Date(dataReview[0].operationDate); 
                const formattedDate = rawDate.toLocaleDateString("pt-BR");

                setNextReview(formattedDate);
                setTimeout(() => {
                    Swal.close();
                }, 3000);  // 3000 milliseconds = 3 seconds

            } catch (error) {
                setError('Failed to load study');
                setTimeout(() => {
                    Swal.close();
                }, 3000);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {

        loadData();

        const fetchData = async () => {
            try {

                const topicsData = await topicService.getTopics();
                setTopics(topicsData);
                const data = await studyService.getStudyById(id);
                setStudy(data);
                setIdTopic(data.idTopic);
                setNote(data.note);
                setTimeout(() => {
                    Swal.close();
                }, 1000);  

            } catch (error) {
                setError('Failed to load study');
                setTimeout(() => {
                    Swal.close();
                }, 1000);  
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idStudy = id;

        const updatedStudy = {
            idStudy,
            idTopic,
            note,
        };

        try {
            await studyService.updateStudy(idStudy, updatedStudy);
            setSuccessMessage('Study updated successfully!');
            navigate('/study');
        } catch (error) {
            setError('Failed to update study');
        }
    };

    /*if (!study) return <div>Loading...Roger</div>;*/

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBookOpen size={30} className="mr-3" />
                        <h2 className="mb-0 heading-spacing">Detalhes Conteúdo</h2>
                    </div>
                </div>

                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/study" className="text-decoration-none">Gerenciamento de Conteúdo</Link>
                            </li>
                        </ol>
                    </nav>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="card shadow-sm">
                        <div className="card-body">

                       

                        <div className="form-group mb-3">
                                <div className="mt-3 fw-bold">
                                    {description}
                                </div>
                                <div className="mt-3 fw-bold">
                                
                                </div>
                        
                            </div>
                            <div className="form-group">
                                <div className="mt-3">
                                    <ReactMarkdown>{note}</ReactMarkdown>
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="mt-3 fw-bold">
                                    <span>Próxima Revisão: </span>{nextReview}
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailStudy;
