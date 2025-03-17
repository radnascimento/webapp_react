import React, { useEffect, useState } from 'react';
import QuizService from '../services/QuizService'; // Adjust the path if needed
import { useParams } from 'react-router-dom'; // Import useParams
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const [quizQuestion, setQuizQuestion] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); 


    const handleOptionClick = (option) => {
        console.log("Selected option:", option);

        
        if (option.flagCorrect) {
            Swal.fire({
                title: "Your Choice",
                text: `You selected: ${option.description}`,
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate(-1); // Change to your desired route
            });
        }
        else {
            Swal.fire({
                title: "Your Choice",
                text: `Would you like to try it again?`,
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        

    };
    useEffect(() => {
        const fetchQuizQuestion = async () => {
            try {
                const data = await QuizService.getQuizQuestion(id); // Fetch question with ID 1
                setQuizQuestion(data);
            } catch (err) {
                setError('Failed to load quiz question.');
            }
        };

        if (id) {
            fetchQuizQuestion();
        }
        
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <h2 className="mb-0">Quiz Question</h2>
                    </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {quizQuestion && quizQuestion.length > 0 ? (
                    <>
                        <p><strong>Question:</strong> {quizQuestion[0]?.description || "No description available"}</p>

                        <div className="d-flex flex-column gap-2">
                            {quizQuestion[0]?.quizQuestionOptions?.length > 0 ? (
                                quizQuestion[0].quizQuestionOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-outline-primary btn-sm w-auto"
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option?.description || "No option available"}
                                    </button>
                                ))
                            ) : (
                                <p>No options available</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

    );
};

export default Quiz;
