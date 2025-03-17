import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import topicService from '../services/TopicService';
import { FaList, FaSave } from 'react-icons/fa';
import Swal from "sweetalert2";

const EditTopic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [idTopic, setIdTopic] = useState('');
    const [operationDate, setOperationDate] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [topics, setTopics] = useState([]);
    


    // Fetch topics and levels on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await topicService.getTopicById(id);
                setName(data.name);
                setDescription(data.description);
                setIdTopic(data.encId);
                setOperationDate(data.operationDate);
                
            } catch (error) {
                setError('Failed to load topic');
            }
        };

        fetchData();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTopic = {
            encid: idTopic,
            name,
            description,
            operationDate,
        };

        try {
            await topicService.updateTopic(idTopic, updatedTopic);

            // Show success alert
            Swal.fire({
                title: "Sucesso!",
                text: "Tópico atualizado com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                // Navigate after user confirms
                navigate('/topics');
            });

        } catch (error) {
            setError("Failed to update topic");

            // Show error alert
            Swal.fire({
                title: "Error!",
                text: "Failed to update topic.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };


    if (!topics) return <div>Loading...</div>;

    const maxLength = 100;


    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaList size={30} className="mr-3" /> {/* Icon for topics */}
                        <h2 className="mb-0 heading-spacing"> Editar Tópico</h2> {/* Title */}
                    </div>
                </div>

                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/topics" className="text-decoration-none">Gerenciamento de Tópico</Link>
                            </li>
                        </ol>
                    </nav>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
    <label htmlFor="name" className="fw-bold">Nome do Tópico</label>
    <input
        type="text"
        id="name"
        className="form-control"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={maxLength}
    />
</div>

<div className="form-group mb-3">
    <label htmlFor="description" className="fw-bold">Descrição</label>
    <textarea
        id="description"
        className="form-control"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        required
        maxLength={maxLength}
    ></textarea>
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

export default EditTopic;
