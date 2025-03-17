import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useParams to get route parameters
import { FaBook, FaSave } from 'react-icons/fa'; // Import the icon for study and save button
import studyService from '../services/StudyService'; // Import the service that handles study-related requests
import topicService from '../services/TopicService'; // Assuming you have this for fetching topics or levels
import Swal from "sweetalert2";

const AddStudy = () => {
    const { idTopic: routeIdTopic } = useParams(); // Use useParams to get the idTopic from the URL
    const [note, setNote] = useState(''); // State for the note
    const [description, setDescription] = useState(''); // State for the note
    const [url, setUrl] = useState(''); // State for the note
    const [comment, setcomment] = useState(''); // State for the note
    const [idTopic, setIdTopic] = useState(routeIdTopic || ''); // Set the idTopic from the URL or default to empty string
    const [topics, setTopics] = useState([]); // Store topics (or levels)
    const [error, setError] = useState(null); // State for error message
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();
   



    // Fetch topics when the component mounts
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await topicService.getTopics(); // Fetch topics
                setTopics(response); // Set fetched topics to state
            } catch (error) {
                setError('Failed to fetch topics'); // Set error if fetch fails
            }
        };

        fetchTopics(); // Call the function to fetch topics on mount

     

    }, []);

   

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if required fields are filled
        if (!idTopic || !note) {
            setError("Topic and note are required.");

            // Show error alert
            Swal.fire({
                title: "Validation Error",
                text: "Topic and note are required.",
                icon: "warning",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });

            return;
        }

        const currentDateTime = new Date().toISOString(); // Get current date and time

        const newStudy = {
            EncIdTopic: idTopic,
            Note: note,
            OperationDate: currentDateTime,
            Description: description,
            URL: url,
            comment: comment
        };

        setLoading(true); // Set loading to true when saving

        try {
            const savedStudy = await studyService.saveStudy(newStudy);

            // Show success alert
            Swal.fire({
                title: "Sucesso!",
                text: `O conteúdo foi salvo com sucesso!`,
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            }).then(() => {
                // Reset form
                setNote("");
                setcomment("");
                setIdTopic("");
                setError(null);
                navigate("/study"); // Redirect after confirmation
            });

        } catch (error) {
            setError("Failed to save the study");

            // Show error alert
            Swal.fire({
                title: "Error!",
                text: "Failed to save the content.",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });
        } finally {
            setLoading(false); // Stop loading when the request is complete
        }
    };

    const maxLength = 1000;

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBook size={30} className="mr-3" /> {/* Icon for study */}
                        <h2 className="mb-0 heading-spacing">Novo Conteúdo</h2> {/* Title */}
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
                    <div className="form-group">
                        <label htmlFor="idTopic">Selecione o Tópico:</label>
                        <select
                            id="idTopic"
                            className="form-control"
                            value={idTopic}
                            onChange={(e) => setIdTopic(e.target.value)}
                            required
                        >
                            <option value="">Selecione o Tópico</option>
                            {topics.map((topic) => (

                                <option key={topic.encId} value={topic.encId}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">
                            Descrição (Max {100} caracteres, {100 - description.length} restante)
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            maxLength={100}
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="url">
                            Url (Max {100} caracteres, {100 - url.length} restante)
                        </label>
                        <input
                            type="text"
                            id="url"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            maxLength={100}
                        />
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="note">
                            Conteúdo (Max {maxLength} caracteres, {maxLength - note.length} restante)
                        </label>

                        <textarea
                            id="note"
                            className="form-control custom-textarea"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                            maxLength={1000}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">
                            Comentário (Max {300} caracteres, {300 - comment.length} restante)
                        </label>

                        <textarea
                            id="note"
                            className="form-control custom-textarea"
                            value={comment}
                            onChange={(e) => setcomment(e.target.value)}
                            maxLength={300}
                        ></textarea>
                    </div>




                    {/* Save Button */}
                    <div className="form-group mt-4">
                        <button
                            type="submit"
                            className="btn btn-success btn-sm"
                            disabled={loading} // Disable the button while loading
                        >
                            <FaSave size={20} className="mr-2" /> {/* Save Icon */}
                            {loading ? 'Salvando...' : 'Salvar'} {/* Show loading text */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudy;
