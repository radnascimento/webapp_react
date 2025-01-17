import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLayerGroup, FaSave } from 'react-icons/fa'; // Import the icons for topics and save button
import topicService from '../services/TopicService'; // Import the service that handles the topic API calls

const AddTopic = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTopic = {
            name,
            description,
        };

        try {
            const savedTopic = await topicService.saveTopic(newTopic); // Call the saveTopic function from the service
            setSuccessMessage(`Topic "${savedTopic.name}" has been saved successfully!`);
            setName('');
            setDescription('');
        } catch (error) {
            setError('Failed to save the topic');
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and title */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaLayerGroup size={30} className="mr-3" /> {/* Icon for topics */}
                        <h2 className="mb-0">New Topic</h2> {/* Title */}
                    </div>
                </div>

                {/* Breadcrumbs Tracker */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/topics" className="text-decoration-none">Topics Management</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Add New Topic
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Success/Error Messages */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Form to Add Topic */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Topic Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Blank Line */}
                    <div className="mt-3"></div> {/* This is a blank line with top margin */}

                    {/* Save Button with Icon and Spacing */}
                    <div className="form-group mt-4">
                        <button type="submit" className="btn btn-success btn-sm">
                            <FaSave size={20} className="mr-2" /> {/* Save Icon */}
                            Save
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
