import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa'; // Icon for materials
import { FaEdit, FaEye } from 'react-icons/fa'; // FontAwesome icons for Edit and View Details
import materialService from '../services/MaterialService'; // Assuming you will create MaterialService for API calls

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any error

    // Fetch materials data using the service
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const data = await materialService.getMaterials(); // Call the service to get the materials
                setMaterials(data); // Set the data to state
            } catch (error) {
                setError('Failed to fetch materials'); // Handle error if data fetch fails
            } finally {
                setLoading(false); // Set loading to false once the request is complete
            }
        };

        fetchMaterials();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and button in the same row */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaFileAlt size={30} className="mr-3" /> {/* Icon for materials */}
                        <h2 className="mb-0">Materials</h2> {/* Title */}
                    </div>
                    {/* Add Material Button */}
                    <Link to="/addMaterial" className="btn btn-success btn-sm">
                        <i className="fas fa-plus-circle"></i> {/* Plus icon for adding a material */}
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
                                Materials Management
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Loading/Error States */}
                {loading && <div>Loading materials...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Materials Grid (Cards Layout) */}
                {!loading && !error && (
                    <div className="row">
                        {materials.map((material) => (
                            <div key={material.idMaterial} className="col-12 mb-4"> {/* Ensure each card is full-width on its row */}
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{material.topic.name}</h5>
                                        <p className="card-text">
                                            <strong>Level:</strong> {material.level.name}
                                        </p>
                                        <p className="card-text">
                                            <strong>Operation Date:</strong> {new Date(material.operationDate).toLocaleDateString()}
                                        </p>
                                        <p className="card-text">
                                            <strong>Material URL:</strong>
                                            <a href={material.url} target="_blank" rel="noopener noreferrer" className="d-block text-truncate">
                                                {material.url}
                                            </a>
                                        </p>
                                        <p className="card-text">
                                            <Link to={`/addStudy/${material.idTopic}`} className="card-text text-decoration-none text-success" style={{ fontSize: '15px' }}>
                                                <strong>Study Now</strong>
                                            </Link>
                                        </p>

                                        {/* Action Icons */}
                                        <div className="d-flex justify-content-end mt-3">
                                            {/* View Details Icon */}
                                            <Link to={`/materialDetails/${material.idMaterial}`} className="text-success" style={{ fontSize: '20px' }}>
                                                <FaEye /> {/* Eye Icon (View Details) */}
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

export default Materials;
