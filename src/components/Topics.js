import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaEye, FaPen } from 'react-icons/fa'; 
import topicService from '../services/TopicService';


const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
    const [filterTopic, setFilterTopic] = useState(''); 
    const [filteredTopics, setFilteredTopics] = useState([]); 
    
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await topicService.getTopics(); 
                setTopics(data); 
                setFilteredTopics(data); 
            } catch (error) {
                setError('Failed to fetch topics'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchTopics();
    }, []);

    
    const handleFilterChange = (e) => {
        const selectedTopic = e.target.value;
        setFilterTopic(selectedTopic);
        
        if (selectedTopic === '') {
            setFilteredTopics(topics); 
        } else {
            setFilteredTopics(
                topics.filter((topic) => topic.name.toLowerCase().includes(selectedTopic.toLowerCase()))
            );
        }
    };



    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and button in the same row */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaList size={30} className="mr-3" /> {/* Icon for topics */}
                        <h2 className="mb-0 heading-spacing">Tópicos</h2> {/* Title */}
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
                                <Link to="/home" className="text-decoration-none">Página Inicial</Link>
                            </li>
                        </ol>
                    </nav>
                </div>


                <div className="p-3 mb-4" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="d-flex flex-column flex-md-row align-items-start">
                        {/* Filter Dropdown */}
                        <div className="mb-3 mb-md-0 mr-md-3">
                                <label htmlFor="filterTopic" className="form-label fw-semibold">Pesquisar por Tópico:</label>
                            <select
                                id="filterTopic"
                                value={filterTopic}
                                onChange={handleFilterChange}
                                className="form-control form-control-sm"
                                style={{ width: '200px' }}
                            >
                                <option value="">Selecione o Tópico</option>
                                {topics.map((topic) => (
                                    <option key={topic.encId} value={topic.name}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading/Error States */}
                {loading && <div>Loading topics...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Topics Grid */}
                {!loading && !error && (
                    <div className="row">
                        {filteredTopics.map((topic) => (
                            <div key={topic.encId} className="col-12 col-sm-6 col-md-4 mb-4"> {/* Responsive grid layout */}

                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {topic.name}
                                        </h5>
                                        <p className="card-text">
                                            {topic.description}
                                        </p>

                                        {/*<div className="d-flex justify-content-end mt-3">*/}
                                        {/*    */}{/* View Details Icon */}
                                        {/*    <Link to={`/EditTopic/${topic.encId}`} className="text-success" style={{ fontSize: '20px' }}>*/}
                                        {/*        <FaEye /> */}{/* Eye Icon (View Details) */}
                                        {/*    </Link>*/}
                                        {/*</div>*/}

                                    </div>

                                        <div class="card-footer">
                                            <div class="icon-group">
                                                {!topic.readOnly && (
                                                    <div>
                                                    <Link
                                                        to={`/EditTopic/${topic.encId}`}
                                                        style={{ fontSize: "20px", color: "#006D77" }}
                                                    >
                                                        <FaPen />
                                                        </Link>
                                                    </div>
                                                )}

                                                
                                            </div>
                                        </div>


                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topics;
