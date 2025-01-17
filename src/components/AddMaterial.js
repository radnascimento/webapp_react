import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLayerGroup, FaSave } from 'react-icons/fa'; // Import the icons
import materialService from '../services/MaterialService'; // Import the material service
import levelService from '../services/LevelService'; // Import the level service
import topicService from '../services/TopicService'; // Import the topic service

const AddMaterial = () => {
    const [url, setUrl] = useState('');
    const [idTopic, setIdTopic] = useState('');
    const [idLevel, setIdLevel] = useState('');
    const [operationDate, setOperationDate] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const [topics, setTopics] = useState([]);
    const [levels, setLevels] = useState([]);

    // Fetch topics and levels on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicsData = await topicService.getTopics();
                const levelsData = await levelService.getLevels();
                console.log('Fetched Topics:', topicsData);  // Debugging log
                console.log('Fetched Levels:', levelsData);  // Debugging log
                setTopics(topicsData);
                setLevels(levelsData);
            } catch (error) {
                setError('Failed to load topics and levels');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDateTime = new Date().toISOString();

        const newMaterial = {
            IdTopic: idTopic,
            IdLevel: idLevel,
            Url: url,
            OperationDate: currentDateTime, // Use current date and t
        };

        try {
            const savedMaterial = await materialService.saveMaterial(newMaterial);
            setSuccessMessage(`Material with URL "${savedMaterial.Url}" has been saved successfully!`);
            setUrl('');
            setIdTopic('');
            setIdLevel('');
            setOperationDate('');
        } catch (error) {
            setError('Failed to save the material');
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and title */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaLayerGroup size={30} className="mr-3" /> {/* Icon for materials */}
                        <h2 className="mb-0">New Material</h2> {/* Title */}
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
                                <Link to="/material" className="text-decoration-none">Materials Management</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Add New Material
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Success/Error Messages */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Form to Add Material */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="url">Material URL</label>
                        <input
                            type="text"
                            id="url"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>

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
                        <label htmlFor="idLevel">Select Level</label>
                        <select
                            id="idLevel"
                            className="form-control"
                            value={idLevel}
                            onChange={(e) => setIdLevel(e.target.value)}
                            required
                        >
                            <option value="">..</option>
                            {levels.map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
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

export default AddMaterial;
