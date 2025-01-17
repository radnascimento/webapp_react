import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLayerGroup, FaSave } from 'react-icons/fa'; // Import the icon for levels and save button
import levelService from '../services/LevelService'; // Import the service that fetches the data

const AddLevel = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newLevel = {
            name,
            description,
        };

        try {
            const savedLevel = await levelService.saveLevel(newLevel); // Call the saveLevel function from the service
            setSuccessMessage(`Level "${savedLevel.name}" has been saved successfully!`);
            setName('');
            setDescription('');
        } catch (error) {
            setError('Failed to save the level');
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
            {/* Header with icon and title */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <FaLayerGroup size={30} className="mr-3" /> {/* Icon for levels */}
                    <h2 className="mb-0">New Level</h2> {/* Title */}
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
                            <Link to="/levels" className="text-decoration-none">Levels Management</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add New Level
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Success/Error Messages */}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Form to Add Level */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Level Name</label>
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

export default AddLevel;
