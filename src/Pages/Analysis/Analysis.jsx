import React, { useContext, useEffect, useState } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';

const questions = [
    {
        question: "What is your gender?",
        options: ["Male", "Female"]
    },
    {
        question: "Have you been diagnosed with any of the following conditions?",
        options: [
            "Major Depressive Disorder",
            "Panic Disorder",
            "Generalized Anxiety",
            "Bipolar Disorder",
            "Other"
        ]
    },
    {
        question: "On a scale of 1 to 10, how severe are your symptoms currently?",
        sub: "(1 = No symptoms, 10 = Extremely severe)",
        options: ["1-3", "4-6", "7-8", "9", "10"]
    },
    {
        question: "On a scale of 1 to 10, how would you rate your overall mood today?", sub: "(1 = Very bad, 10 = Excellent)",
        options: ["1-3", "4-6", "7-8", "9", "10"]
    },
    {
        question: "On a scale of 1 to 10, how would you rate the quality of your sleep recently?",
        sub: "(1 = Very poor, 10 = Excellent)",
        options: ["1-3", "4-6", "7-8", "9", "10"]
    },
    {
        question: "How many hours of physical activity or exercise do you do in a typical week?",
        options: ["1-3", "4-6", "7-8", "9", "10"]
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
            "1-2", "2-4", "5-8", "9-15", "16 +"
        ]
    },
    {
        question: "On a scale of 1 to 10, how stressed are you feeling currently?",
        sub: "(1 = No stress, 10 = Extremely stressed)",
        options: ["1-3", "4-6", "7-8", "9", "10"]
    },
    {
        question: "How would you describe the outcome of your current treatment so far?",
        options: ["Improved", "No Change", "Deteriorated"]
    },
    {
        question: "On a scale of 1 to 10, how would you rate your progress in treatment?",
        sub: "(1 = No progress, 10 = Excellent progress)",
        options: ["1-3", "4-6", "7-8", "9", "10"]
    },
    //OutPut Data
    // {
    //     question: "How would you describe your current emotional state?",
    //     options: [
    //         "Anxious", "Neutral", "Happy", "Excited", "Stressed", "Depressed", "Other (please specify)"
    //     ]
    // },
    {
        question: "What percentage of your prescribed treatment plan (e.g., medication, therapy) ?",
        sub: " (Answer in percentage)",
        options: [
            "1%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%", 
        ]
    }
];


const Analysis = () => {
    const [formData, setFormData] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [startAnalysis, setStartAnalysis] = useState(false);
    const { user } = useContext(AuthContext);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect( () => {
        window.scroll(0,0);
    } ,[])

    const handleSelect = (option) => {
        const questionId = currentQuestion.id;
        const questionType = currentQuestion.type;

        if (questionType === 'multiple') {
            setFormData(prevState => ({
                ...prevState,
                [questionId]: prevState[questionId]?.includes(option)
                    ? prevState[questionId].filter(item => item !== option)
                    : [...(prevState[questionId] || []), option],
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [questionId]: option,
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // const handleNext = () => {
    //     const questionId = currentQuestion.id;
    //     const answer = formData[questionId];

    //     if (!answer || (Array.isArray(answer) && answer.length === 0)) {
    //         Swal.fire({
    //             title: 'Answer Required',
    //             text: 'You must answer this question before proceeding.',
    //             icon: 'warning',
    //             confirmButtonText: 'OK',
    //         });
    //         return;
    //     }

    //     if (currentQuestionIndex < questions.length - 1) {
    //         setCurrentQuestionIndex(currentQuestionIndex + 1);
    //     } else {
    //         console.log('Final Data:', formData);
    //         // Here you can call the API with formData to generate the medical report
    //     }
    // };

    const handleNext = async () => {
        const questionId = currentQuestion.id;
        const answer = formData[questionId];

        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            Swal.fire({
                // title: 'Answer Required',
                text: 'You must answer this question before proceeding.',
                icon: 'warning',
                confirmButtonText: 'OK',
                background: '#34495E',  // Updated background color
                color: '#ECF0F1',       // Light text color for better contrast
                confirmButtonColor: '#1ABC9C'
            });
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log('Final Data:', formData);

            Swal.fire({
                // title: 'Warning',
                text: 'We are working on it. Please stay with us',
                icon: 'info',
                confirmButtonText: 'OK',
                background: '#34495E',  // Updated background color
                color: '#ECF0F1',       // Light text color for better contrast
                confirmButtonColor: '#1ABC9C' // A contrasting color for the confirm button
            });
            console.error('Error generating report:', error);

        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div>
            <Heading title="Medical Analysis" subtitle="Unlock Comprehensive Health Insights with CureHub's Medical Analysis" />

            <div className='md:container py-10 md:mx-10 mx-4 text-center space-y-5 text-white'>
                {
                    !startAnalysis && (
                        <div className='text-justify'>
                            <p className=''>At CureHub, we believe that understanding your health is the key to a better quality of life. Our comprehensive health analysis is designed to provide you with valuable insights into your current health status. By answering a few simple questions, you'll receive personalized recommendations tailored to your unique needs.</p>
                            <h2 className='mt-4 font-bold text-xl text-[#00B5FF]'>Why This Analysis?</h2>
                            <ul className='space-y-2 mt-2'>
                                <li><span className='font-bold'>Tailored Recommendations</span>: Get advice that’s specific to your health condition.</li>
                                <li><span className='font-bold'>Proactive Health Management</span>: Identify potential health risks before they become serious.</li>
                                <li><span className='font-bold'>Confidential and Secure</span>: Your information is 100% confidential and secure.</li>
                            </ul>

                            <h2 className='mt-4 font-bold text-xl text-[#00B5FF]'>How It Works</h2>
                            <ol className='space-y-2 mt-2'>
                                <li><span className='font-bold'>Answer Simple Questions</span>: We’ll ask you a series of questions about your health, lifestyle, and any symptoms you may be experiencing.</li>
                                <li><span className='font-bold'>Get Personalized Insights</span>: Based on your responses, we’ll generate a detailed report with actionable insights.</li>
                                <li><span className='font-bold'>Take Control of Your Health</span>: Use these insights to make informed decisions about your health and wellbeing.</li>
                            </ol>

                            <button
                                onClick={() => {
                                    setStartAnalysis(true);
                                    window.scroll(0,0);
                                }}
                                className='btn btn-warning my-10'>Start Your Health Analysis</button>

                        </div>
                    )
                }

                {
                    startAnalysis && (
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className='mb-4'>
                                <button className='btn btn-sm btn-warning mb-4'>
                                    Quary {currentQuestionIndex + 1}
                                </button>
                                <label className='block text-white text-lg md:text-xl font-semibold mb-1'>{currentQuestion.question}</label>
                                <label className='block text-white text-[12px] font-semibold mb-4'>{currentQuestion.sub}</label>
                                {currentQuestion.type === 'input' ? (
                                    <input
                                        type='text'
                                        name={currentQuestion.id}
                                        value={formData[currentQuestion.id] || ''}
                                        onChange={handleInputChange}
                                        className='mt-1 block w-1/2 mx-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black'
                                        required
                                    />
                                ) : (
                                    <div className='flex flex-wrap justify-center gap-2'>
                                        {currentQuestion.options.map(option => (
                                            <button
                                                key={option}
                                                type='button'
                                                onClick={() => handleSelect(option)}
                                                className={`px-4 text-[12px] md:text-[14px]  py-2 rounded-md shadow-sm focus:outline-none ${formData[currentQuestion.id]?.includes(option) ? 'bg-secondary' : 'bg-info text-black'} hover:bg-primary-dark`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className='flex justify-center gap-2 mt-6'>
                                {currentQuestionIndex > 0 ? (
                                    <button
                                        type='button'
                                        onClick={handleBack}
                                        className={`px-6  btn-sm text-white rounded-md shadow-sm ${currentQuestionIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
                                        disabled={currentQuestionIndex === 0}
                                    >
                                        Back
                                    </button>
                                ):(
                                    <button
                                        onClick={() => {
                                            setStartAnalysis(false);
                                            setFormData({})
                                        }}
                                        className={`px-6 py-2 text-white rounded-md shadow-sm btn btn-sm bg-red-500 border-none hover:bg-red-400`}
                                        // disabled={currentQuestionIndex === 0}
                                    >
                                        Cancle
                                    </button>
                                )}

                                <button
                                    type='button'
                                    onClick={handleNext}
                                    className='px-6 py-2 bg-blue-800 text-white rounded-md btn btn-sm shadow-sm hover:bg-blue-700 border-none'
                                >
                                    {currentQuestionIndex === questions.length - 1 ? 'Generate' : 'Next'}
                                </button>
                            </div>
                        </form>
                    )
                }

            </div>
        </div>
    );
};

export default Analysis;
