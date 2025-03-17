import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaPlus, FaSave } from "react-icons/fa"; // Icons for form UI
import QuizService from '../../services/QuizService'; // Adjust the path if needed

const QuizAdmin = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const [studyData, setStudyData] = useState({
        idStudy: 0,
        operationDate: currentDate, // Set current date
        description: "",
        quizQuestionOptions: [
            { description: "", flagCorrect: false, operationDate: currentDate }
        ],
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e, field) => {
        setStudyData({ ...studyData, [field]: e.target.value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = studyData.quizQuestionOptions.map((q, i) =>
            i === index ? { ...q, [field]: value } : q
        );
        setStudyData({ ...studyData, quizQuestionOptions: updatedQuestions });
    };

    const addQuestion = () => {
        setStudyData({
            ...studyData,
            quizQuestionOptions: [
                ...studyData.quizQuestionOptions,
                {
                    idQuestion: studyData.quizQuestionOptions.length,
                    description: "",
                    flagCorrect: false,
                    operationDate: currentDate, // Auto-set operation date for new questions
                },
            ],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await QuizService.saveQuizQuestion(studyData); // Fetch question with ID 1
            console.log("Submitted Study Data:", studyData);


            // Reset form fields
            setStudyData({
                idStudy: 0,
                operationDate: new Date().toISOString().split("T")[0], // Keep the current date
                description: "",
                quizQuestionOptions: [
                    { description: "", flagCorrect: false, operationDate: new Date().toISOString().split("T")[0] }
                ],
            });

            setSuccessMessage("Study quiz data saved successfully!");
            setError(null);
        } catch (err) {
            setError("Failed to save the study quiz data.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with Icon */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaClipboardList size={30} className="mr-3 text-primary" />
                        <h2 className="mb-0">Study Quiz Form</h2>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/quizzes" className="text-decoration-none">Quizzes</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Create Quiz
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Success/Error Messages */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ID Study</label>
                        <input
                            type="number"
                            className="form-control"
                            value={studyData.idStudy}
                            onChange={(e) => handleChange(e, "idStudy")}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Operation Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={studyData.operationDate}
                            readOnly // Prevent user from changing it
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={studyData.description}
                            onChange={(e) => handleChange(e, "description")}
                            required
                        />
                    </div>

                    <h3 className="mt-4">Quiz Questions Options</h3>
                    {studyData.quizQuestionOptions.map((question, index) => (
                        <div key={index} className="border p-3 mt-3 rounded">
                            <div className="form-group">
                                <label>Question ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={question.idQuestion}
                                    onChange={(e) => handleQuestionChange(index, "idQuestion", e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Question Description</label>
                                <textarea
                                    className="form-control"
                                    value={question.description}
                                    onChange={(e) => handleQuestionChange(index, "description", e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Operation Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={question.operationDate}
                                    readOnly // Prevent user from changing it
                                />
                            </div>
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={question.flagCorrect}
                                    onChange={(e) => handleQuestionChange(index, "flagCorrect", e.target.checked)}
                                />
                                <label className="form-check-label">Correct Answer</label>
                            </div>
                        </div>
                    ))}

                    {/* Add Question Button */}
                    <button type="button" className="btn btn-info mt-3" onClick={addQuestion}>
                        <FaPlus className="mr-2" /> Add Question
                    </button>

                    <hr />

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success btn-sm mt-3">
                        <FaSave className="mr-2" /> Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuizAdmin;
