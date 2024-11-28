import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const questions = [
//     {
//         question: "How often have you been bothered by feeling down, depressed, or hopeless?",
//         options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
//     },
//     {
//         question: "How often have you had little interest or pleasure in doing things?",
//         options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
//     },
//     {
//         question: "How often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
//         options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
//     },
//     {
//         question: "How often have you been feeling tired or having little energy?",
//         options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
//     },
//     {
//         question: "How often have you been bothered by poor appetite or overeating?",
//         options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
//     },
// ];


const questions = [
    {
        question: "What is your gender?",
        options: ["Male", "Female", "Other"]
    },
    {
        question: "Have you been diagnosed with any of the following conditions?",
        options: [
            "Major Depressive Disorder",
            "Panic Disorder",
            "Generalized Anxiety",
            "Bipolar Disorder",
            "Other (please specify)"
        ]
    },
    {
        question: "On a scale of 1 to 10, how severe are your symptoms currently? (1 = No symptoms, 10 = Extremely severe)",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        question: "On a scale of 1 to 10, how would you rate your overall mood today? (1 = Very bad, 10 = Excellent)",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        question: "On a scale of 1 to 10, how would you rate the quality of your sleep recently? (1 = Very poor, 10 = Excellent)",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        question: "How many hours of physical activity or exercise do you do in a typical week?",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        question: "Are you currently taking any of the following medications?",
        options: [
            "Mood Stabilizers",
            "Antipsychotics",
            "SSRIs",
            "Anxiolytics",
            "Antidepressants",
            "Benzodiazepines",
            "Other (please specify)"
        ]
    },
    {
        question: "Are you undergoing any of the following therapy types?",
        options: [
            "Interpersonal Therapy",
            "Mindfulness-Based Therapy",
            "Cognitive Behavioral Therapy (CBT)",
            "Dialectical Behavioral Therapy (DBT)",
            "Other (please specify)"
        ]
    },
    {
        question: "How many weeks has your current treatment been ongoing?",
        options: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"
        ]
    },
    {
        question: "On a scale of 1 to 10, how stressed are you feeling currently? (1 = No stress, 10 = Extremely stressed)",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        question: "How would you describe the outcome of your current treatment so far?",
        options: ["Improved", "No Change", "Deteriorated"]
    },
    {
        question: "On a scale of 1 to 10, how would you rate your progress in treatment? (1 = No progress, 10 = Excellent progress)",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        question: "How would you describe your current emotional state?",
        options: [
            "Anxious", "Neutral", "Happy", "Excited", "Stressed", "Depressed", "Other (please specify)"
        ]
    },
    {
        question: "What percentage of your prescribed treatment plan (e.g., medication, therapy) do you adhere to regularly? (Answer in percentage)",
        options: [
            "0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"
        ]
    }
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
