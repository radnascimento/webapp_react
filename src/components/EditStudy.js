import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import studyService from '../services/StudyService';
import topicService from '../services/TopicService';
import {  FaSave, FaBookOpen } from 'react-icons/fa';
import { isValidYouTubeEmbedUrl } from '../utils/helper';
import Swal from "sweetalert2";

const EditStudy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [study, setStudy] = useState(null);
    const [idTopic, setIdTopic] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [topics, setTopics] = useState([]);
    const [note, setNote] = useState('');
    const [description, setDescription] = useState(''); // State for the note
    const [url, setUrl] = useState(''); // State for the note
    const [comment, setcomment] = useState(''); // State for the note
    const [activeTab, setActiveTab] = useState("note");

  const handleChange = (e) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
    
        // Validate the URL
        if (newUrl && !isValidYouTubeEmbedUrl(newUrl)) {
          setError("URL de incorporação do YouTube inválida. Deve estar no formato: https://www.youtube.com/embed/{videoId}");
        } else {
          setError("");
        }
      };


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


    useEffect(() => {

        loadData();

        const fetchData = async () => {
            try {
                const topicsData = await topicService.getTopics();
                setTopics(topicsData);
                const data = await studyService.getStudyById(id);
                setStudy(data);
                setIdTopic(data.encIdTopic);
                setNote(data.note);
                setcomment(data.comment || ""); 
                setDescription(data.description);
                setUrl(data.url);
                setTimeout(() => {
                                    Swal.close();
                                }, 1000);  
                
            } catch (error) {
                setTimeout(() => {
                                    Swal.close();
                                }, 1000);  
                setError('Failed to load study');
            }
        };

        fetchData();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const idStudy = id;

        const updatedStudy = {
            encIdStudy:idStudy,
            encIdTopic:idTopic,
            note,
            description,
            url,
            comment:comment
        };

        

        try {
            await studyService.updateStudy(idStudy, updatedStudy);
            

          Swal.fire({
              title: "Sucesso!",
              text: "Conteúdo atualizado com sucesso!",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                  confirmButton: "btn btn-success", // Add your class here
              },
              buttonsStyling: true

            }).then(() => {
                navigate("/study"); // Redirect after confirmation
            });


        } catch (error) {
            setError("Failed to update study");

            // Show error alert
            Swal.fire({
                title: "Error!",
                text: "Failed to update Content.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };



    const maxLength = 4000;

    // if (!study) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBookOpen size={30} className="mr-3" />
                        <h2 className="mb-0 heading-spacing">Editar Conteúdo</h2>
                    </div>
                </div>

                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {/*<li className="breadcrumb-item">*/}
                            {/*    <Link to="/home" className="text-decoration-none">Página Inicial</Link>*/}
                            {/*</li>*/}
                            <li className="breadcrumb-item">
                                <Link to="/study" className="text-decoration-none">Gerenciamento de Conteúdo</Link>
                            </li>
                            {/*<li className="breadcrumb-item active" aria-current="page">*/}
                            {/*    Editar Conteúdo*/}
                            {/*</li>*/}
                        </ol>
                    </nav>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>

                <div className="form-group mb-3"> {/* Added margin-bottom */}
                        {/* <label htmlFor="idTopic" className="fw-bold">Selecione o Tópico</label> Made bold */}
                        <select
                            id="idTopic"
                            className="form-control"
                            value={idTopic}
                            onChange={(e) => setIdTopic(e.target.value)}
                            required
                        >
                            <option value="">...</option>
                            {topics.map((topic) => (
                                <option key={topic.encId} value={topic.encId}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mb-3"> {/* Added margin-bottom */}
                        <label htmlFor="description" className="fw-bold"> {/* Made bold */}
                            Descrição (Max {100} characters, {100 - description.length} remaining)
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

                    
                    <div className="form-group mb-3">
    <label htmlFor="url" className="fw-bold">
        Url (Max {100} caracteres, {100 - (url?.length || 0)} restante)
    </label>
    <input
        type="text"
        id="url"
        className="form-control"
        value={url || ""}
        // onChange={(e) => setUrl(e.target.value)}
        onChange={handleChange}
        maxLength={100}
    />
</div>



<ul className="nav nav-tabs">
    <li className="nav-item">
        <button
            className={`nav-link ${activeTab === "note" ? "active" : ""}`}
            onClick={() => setActiveTab("note")}
            type="button"
        >
            Conteúdo
        </button>
    </li>
    <li className="nav-item">
        <button
            className={`nav-link ${activeTab === "comment" ? "active" : ""}`}
            onClick={() => setActiveTab("comment")}
            type="button"
        >
            Comentário
        </button>
    </li>
</ul>


<div className="tab-content mt-3">
    {activeTab === "note" && (
        <div className="form-group">
            <label htmlFor="note" className="fw-bold">
                Conteúdo (Max {maxLength} caracteres, {maxLength - note.length} restante)
            </label>
            <textarea
                id="note"
                className="form-control custom-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                maxLength={4000}
            ></textarea>
        </div>
    )}

    {activeTab === "comment" && (
        <div className="form-group">
            <label htmlFor="comment" className="fw-bold">
                Comentário (Max {300} caracteres, {300 - comment.length} restante)
            </label>
            <textarea
                id="comment"
                className="form-control custom-textarea"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                maxLength={300}
            ></textarea>
        </div>
    )}
</div>


<div className="form-group mt-4">
    <button type="submit" className="btn btn-success btn-sm">
        <FaSave size={20} className="mr-2" /> Salvar
    </button>
</div>

                </form>
            </div>
        </div>
    );
};

export default EditStudy;
