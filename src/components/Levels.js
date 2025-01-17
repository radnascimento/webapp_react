import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLayerGroup } from 'react-icons/fa'; // Import an icon for levels
import levelService from '../services/LevelService'; // Import the service that fetches the data

const Levels = () => {
    // State to store the list of levels and loading/error states
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any error

    // Fetch levels data using the service
    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const data = await levelService.getLevels(); // Call the service to get the levels
                setLevels(data); // Set the data to state
            } catch (error) {
                setError('Failed to fetch levels'); // Handle error if data fetch fails
            } finally {
                setLoading(false); // Set loading to false once the request is complete
            }
        };

        fetchLevels();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
            {/* Breadcrumbs Tracker */}
        

            {/* Header with icon and button in the same row */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <FaLayerGroup size={30} className="mr-3" /> {/* Icon for levels */}
                    <h2 className="mb-0">Levels</h2> {/* Title */}
                </div>
                {/* Add Level Button */}
                <Link to="/addLevel" className="btn btn-success btn-sm">
                    <i className="fas fa-plus-circle"></i> {/* Plus icon for adding a level */}
                </Link>
            </div>

            <div className="mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home" className="text-decoration-none">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Levels Management
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Loading/Error States */}
            {loading && <div>Loading levels...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Levels Table */}
            {!loading && !error && (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levels.map((level, index) => (
                            <tr key={level.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/level-details/${level.id}`} className="text-decoration-none">
                                        {level.name}
                                    </Link>
                                </td>
                                <td>{level.description}</td>
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

export default Levels;
