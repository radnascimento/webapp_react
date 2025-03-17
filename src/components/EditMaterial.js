import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import materialService from '../services/MaterialService';
import topicService from '../services/TopicService';
import levelService from '../services/LevelService';
import { FaLayerGroup, FaSave } from 'react-icons/fa';

const EditMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
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
                setTopics(topicsData);
                setLevels(levelsData);

                const data = await materialService.getMaterialById(id);
                console.log('Fetched material:', data); // Debugging: log the fetched material
                setMaterial(data);
                setUrl(data.url);
                setIdTopic(data.idTopic);
                setIdLevel(data.idLevel);
                setOperationDate(data.operationDate);
            } catch (error) {
                setError('Failed to load material');
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMaterial = {
            idTopic,
            idLevel,
            url,
            operationDate,
        };

        try {
            await materialService.updateMaterial(id, updatedMaterial);
            setSuccessMessage('Material updated successfully!');
            navigate('/material');
        } catch (error) {
            setError('Failed to update material');
        }
    };

    if (!material) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaLayerGroup size={30} className="mr-3" />
                        <h2 className="mb-0">Edit Material</h2>
                    </div>
                </div>

                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/home">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/material">Materials</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Edit Material
                            </li>
                        </ol>
                    </nav>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

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
                            <option value="">...</option>
                            {levels.map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="operationDate">Operation Date</label>
                        <input
                            type="datetime-local"
                            id="operationDate"
                            className="form-control"
                            value={operationDate}
                            onChange={(e) => setOperationDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mt-4">
                        <button type="submit" className="btn btn-success btn-sm">
                            <FaSave size={20} className="mr-2" /> Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMaterial;
