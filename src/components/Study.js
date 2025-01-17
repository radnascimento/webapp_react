import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaEye } from 'react-icons/fa'; // Icons for studies and view
import studyService from '../services/StudyService'; // Import the service that fetches the data
import topicService from '../services/TopicService'; // Import the topic service to fetch topics

const Studies = () => {
    // State to store the list of studies, available topics, and loading/error states
    const [studies, setStudies] = useState([]);
    const [filteredStudies, setFilteredStudies] = useState([]); // State for filtered studies
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any error
    const [filterTopic, setFilterTopic] = useState(''); // State for filter selection
    const [topics, setTopics] = useState([]); // State to store available topics

    // Fetch studies data using the service
    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const data = await studyService.getStudies(); // Call the service to get the studies
                setStudies(data); // Set the data to state
                setFilteredStudies(data); // Initially, show all studies
            } catch (error) {
                setError('Failed to fetch studies'); // Handle error if data fetch fails
            } finally {
                setLoading(false); // Set loading to false once the request is complete
            }
        };

        const fetchTopics = async () => {
            try {
                const topicData = await topicService.getTopics(); // Fetch topics using TopicService
                setTopics(topicData); // Set topics from backend data
            } catch (error) {
                setError('Failed to fetch topics'); // Handle error if data fetch fails
            }
        };

        fetchStudies();
        fetchTopics();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Handle filter change
    const handleFilterChange = (e) => {
        const selectedTopic = e.target.value;
        setFilterTopic(selectedTopic);

        // Filter studies based on selected topic
        if (selectedTopic === '') {
            setFilteredStudies(studies); // If no topic selected, show all studies
        } else {
            setFilteredStudies(
                studies.filter((study) => study.topic.name.toLowerCase().includes(selectedTopic.toLowerCase()))
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon, filter, and button in the same row */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBookOpen size={30} className="mr-3" /> {/* Icon for studies */}
                        <h2 className="mb-0">Studies</h2> {/* Title */}
                    </div>
                    <div className="d-flex align-items-center">
                        {/* Filter Dropdown - Aligned to the left of the button */}
                        <select
                            value={filterTopic}
                            onChange={handleFilterChange}
                            className="form-control form-control-sm mr-3"
                            style={{ width: '200px' }}
                        >
                            <option value="">Filter by Topic</option>
                            {topics.map((topic) => (
                                <option key={topic.idTopic} value={topic.name}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        &nbsp;&nbsp;
                        {/* Add Study Button */}
                        <Link to="/addStudy" className="btn btn-success btn-sm">
                            <i className="fas fa-plus-circle"></i> {/* Plus icon for adding a study */}
                        </Link>
                    </div>
                </div>

                {/* Breadcrumbs Tracker */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Studies Management
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Loading/Error States */}
                {loading && <div>Loading studies...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Studies Grid (Cards Layout) */}
                {!loading && !error && (
                    <div className="row">
                        {filteredStudies.map((study, index) => (
                            <div key={study.idStudy} className="col-12 mb-4"> {/* Ensure each card is full-width on its row */}
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Date: {new Date(study.operationDate).toLocaleDateString()}</h5>

                                        <p className="card-text">
                                            <strong>Topic: </strong>
                                            <Link to={`/topic-details/${study.idTopic}`} className="text-decoration-none">
                                                {study.topic.name}
                                            </Link>
                                        </p>
                                        <p className="card-text">
                                            <strong>Note:</strong> {study.note}
                                        </p>

                                        {/* Action Icons (View Details) */}
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link to={`/studyDetails/${study.idStudy}`} className="text-success" style={{ fontSize: '20px' }}>
                                                <FaEye /> {/* View Details Icon */}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <br />
        </div>
    );
};

export default Studies;
