import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
    {
        question: "How often have you been bothered by feeling down, depressed, or hopeless?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        question: "How often have you had little interest or pleasure in doing things?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        question: "How often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        question: "How often have you been feeling tired or having little energy?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
        question: "How often have you been bothered by poor appetite or overeating?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
];

const MentalHealthAnalysis = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const navigate = useNavigate();

    const handleAnswerChange = (event) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Submit the answers for analysis
            // For now, we'll just navigate to a summary page or show the answers in an alert
            // navigate('/analysis-result', { state: { answers } });
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-4">Mental Health Analysis</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
                <div className="mb-4">
                    {questions[currentQuestion].options.map((option, index) => (
                        <label key={index} className="block mb-2">
                            <input
                                type="radio"
                                name={`question-${currentQuestion}`}
                                value={option}
                                onChange={handleAnswerChange}
                                checked={answers[currentQuestion] === option}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
                    disabled={answers[currentQuestion] === null}
                >
                    {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default MentalHealthAnalysis;
