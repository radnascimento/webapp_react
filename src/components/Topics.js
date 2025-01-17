import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa'; // Import an icon for topics
import topicService from '../services/TopicService'; // Import the service that fetches the data

const Topics = () => {
    // State to store the list of topics and loading/error states
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any error

    // Fetch topics data using the service
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await topicService.getTopics(); // Call the service to get the topics
                setTopics(data); // Set the data to state
            } catch (error) {
                setError('Failed to fetch topics'); // Handle error if data fetch fails
            } finally {
                setLoading(false); // Set loading to false once the request is complete
            }
        };

        fetchTopics();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and button in the same row */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaBook size={30} className="mr-3" /> {/* Icon for topics */}
                        <h2 className="mb-0">Topics</h2> {/* Title */}
                    </div>
                    {/* Add Topic Button */}
                    <Link to="/addTopic" className="btn btn-success btn-sm">
                        <i className="fas fa-plus-circle"></i> {/* Plus icon for adding a topic */}
                    </Link>
                </div>
                {/* Breadcrumbs Tracker */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Topics Management
                            </li>
                        </ol>
                    </nav>
                </div>



                {/* Loading/Error States */}
                {loading && <div>Loading topics...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Topics Table */}
                {!loading && !error && (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th className="d-none d-sm-table-cell">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map((topic, index) => (
                                <tr key={topic.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={`/topic-details/${topic.id}`} className="text-decoration-none">
                                            {topic.name}
                                        </Link>
                                    </td>
                                    <td className="d-none d-sm-table-cell">{topic.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <br></br>
        </div >
    );
};

export default Topics;
