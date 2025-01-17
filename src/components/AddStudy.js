import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaSave } from 'react-icons/fa'; // Import the icon for study and save button
import studyService from '../services/StudyService'; // Import the service that handles study-related requests
import topicService from '../services/TopicService'; // Assuming you have this for fetching topics or levels

const AddStudy = () => {
    const [note, setNote] = useState('');
    const [idTopic, setIdTopic] = useState('');
    const [topics, setTopics] = useState([]); // Store topics (or levels)
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch topics when the component mounts
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await topicService.getTopics(); // Assume `getLevels()` fetches topics/levels
                setTopics(response);
            } catch (error) {
                setError('Failed to fetch topics');
            }
        };

        fetchTopics();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idTopic || !note) {
            setError("Topic and note are required.");
            return;
        }
        const currentDateTime = new Date().toISOString();

        const newStudy = {
            IdTopic: idTopic,
            Note: note,
            OperationDate: currentDateTime, // Set current date
        };

        setLoading(true); // Start loading

        try {
            const savedStudy = await studyService.saveStudy(newStudy); // Call the service to save the study
            setSuccessMessage(`Study for Topic "${savedStudy.IdTopic}" has been saved successfully!`);
            setNote('');
            setIdTopic('');
            setError(null); // Clear error if successful
        } catch (error) {
            setError('Failed to save the study');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and title */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBook size={30} className="mr-3" /> {/* Icon for study */}
                        <h2 className="mb-0">New Study</h2> {/* Title */}
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
                                <Link to="/study" className="text-decoration-none">Study Management</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Add New Study
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Success/Error Messages */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Form to Add Study */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="idTopic">Select Topic</label>
                        <select
                            id="idTopic"
                            className="form-control"
                            value={idTopic}
                            onChange={(e) => setIdTopic(e.target.value)}
                            required
                        >
                            <option value="">...</option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <textarea
                            id="note"
                            className="form-control"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Blank Line */}
                    <div className="mt-3"></div>

                    {/* Save Button with Icon and Spacing */}
                    <div className="form-group mt-4">
                        <button
                            type="submit"
                            className="btn btn-success btn-sm"
                            disabled={loading} // Disable the button while loading
                        >
                            <FaSave size={20} className="mr-2" /> {/* Save Icon */}
                            {loading ? 'Saving...' : 'Save'} {/* Show loading text */}
                        </button>
                    </div>
                    <hr />
                </form>
            </div>
            <br />
        </div>
    );
};

export default AddStudy;
