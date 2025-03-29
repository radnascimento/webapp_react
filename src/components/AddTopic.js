import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaList, FaSave } from 'react-icons/fa'; // Import the icons for topics and save button
import topicService from '../services/TopicService'; // Import the service that handles the topic API calls
import Swal from "sweetalert2";

const AddTopic = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTopic = {
            name,
            description,
        };

        try {
            const savedTopic = await topicService.saveTopic(newTopic); // Call the saveTopic function from the service


            Swal.fire({
                title: "Sucesso!",
                text: `Tópico foi salvo com sucesso!`,
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true

            }).then(() => {
                // Clear input fields after confirmation
                setName('');
                setDescription('');
                navigate('/topics');
            });

        } catch (error) {
            setError("Failed to save the topic");

            // Show error alert
            Swal.fire({
                title: "Error!",
                text: "Failed to save the topic.",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });
        }
    };

    const maxLength = 100;

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and title */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaList size={30} className="mr-3" /> {/* Icon for topics */}
                        <h2 className="mb-0 heading-spacing">Novo Tópico</h2> {/* Title */}
                    </div>
                </div>

                {/* Breadcrumbs Tracker */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <div className="mb-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/topics" className="text-decoration-none">Gerenciamento de Tópico</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </ol>
                    </nav>
                </div>

                {/* Success/Error Messages */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Form to Add Topic */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="fw-bold">Nome do Tópico
                            (Max {100} caracteres, {100 - name.length} restante)
                        </label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fa-solid fa-tag"></i></span>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            maxLength={100}
                        />
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="description" className="fw-bold">Descrição
                            (Max {100} caracteres, {100 - description.length} restante)
                        </label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            maxLength={100}
                        ></textarea>
                    </div>

                    {/* Blank Line */}
                    <div className="mt-3"></div> {/* This is a blank line with top margin */}

                    {/* Save Button with Icon and Spacing */}
                    <div className="form-group mt-4">
                        <button type="submit" className="btn btn-success btn-sm">
                            <FaSave size={20} className="mr-2" /> {/* Save Icon */}
                            Salvar
                        </button>
                    </div>
                    <hr></hr>
                </form>
            </div>
            <br></br>
        </div>
    );
};

export default AddTopic;
