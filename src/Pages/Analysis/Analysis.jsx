import React, { useContext, useState } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';

const questions = [
    // {
    //     id: 'age',
    //     question: "How old are you?",
    //     type: 'input',
    // },
    {
        id: 'chronicConditions',
        question: 'Do you have any chronic conditions?',
        options: ['Diabetes', 'Hypertension', 'Heart Disease', 'None', 'Other'],
        type: 'multiple',
    },
    {
        id: 'symptoms',
        question: 'What symptoms are you currently experiencing?',
        options: ['Fatigue', 'Frequent urination', 'Dizziness', 'Chest pain', 'Shortness of breath', 'None of the above', 'Other'],
        type: 'multiple',
    },
    // {
    //     id: 'medication',
    //     question: "What are your's current medication?",
    //     type: 'input',
    // },
    {
        id: 'healthCondition',
        question: "How would you describe your overall health condition?",
        options: ['Good', 'Fair', 'Poor'],
        type: 'single',
    },
    {
        id: 'recentTests',
        question: 'Have you undergone any recent medical tests?',
        options: ['Blood Test', 'ECG', 'MRI', 'None', 'Other'],
        type: 'multiple',
    },
    {
        id: 'lifestyle',
        question: "What is your lifestyle like?",
        options: ['Sedentary', 'Moderately active', 'Active', 'Very active'],
        type: 'single',
    },
    {
        id: 'smoker',
        question: "Are you a smoker?",
        options: ['Yes', 'No', 'Former smoker'],
        type: 'single',
    },
    {
        id: 'alcohol',
        question: "Do you consume alcohol?",
        options: ['Yes', 'No', 'Occasionally'],
        type: 'single',
    },
    {
        id: 'familyHistory',
        question: "Do you have a family history of any medical conditions?",
        options: ['Diabetes', 'Hypertension', 'Heart Disease', 'None', 'Other'],
        type: 'multiple',
    },
];

const Analysis = () => {
    const [formData, setFormData] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [startAnalysis, setStartAnalysis] = useState(false);
    const { user } = useContext(AuthContext);

    const currentQuestion = questions[currentQuestionIndex];

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
            <Heading title="Analysis" subtitle="Unlock Comprehensive Health Insights with CureHub's Medical Analysis" />

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
                                <button className='btn btn-warning mb-4'>
                                    Step {currentQuestionIndex + 1}
                                </button>
                                <label className='block text-white text-2xl font-semibold mb-4'>{currentQuestion.question}</label>
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
                                                className={`px-4 py-2 rounded-md shadow-sm focus:outline-none ${formData[currentQuestion.id]?.includes(option) ? 'bg-secondary' : 'bg-info text-black'} hover:bg-primary-dark`}
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
                                        className={`px-6 py-2 text-white rounded-md shadow-sm ${currentQuestionIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
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
                                        className={`px-6 py-2 text-white rounded-md shadow-sm btn bg-red-500 border-none hover:bg-red-400`}
                                        // disabled={currentQuestionIndex === 0}
                                    >
                                        Cancle
                                    </button>
                                )}

                                <button
                                    type='button'
                                    onClick={handleNext}
                                    className='px-6 py-2 bg-blue-800 text-white rounded-md shadow-sm hover:bg-primary-dark'
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
