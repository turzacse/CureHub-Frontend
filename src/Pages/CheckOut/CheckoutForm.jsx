// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements) {
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: cardElement,
//         });

//         if (error) {
//             setError(error.message);
//             setLoading(false);
//         } else {
//             const { id } = paymentMethod;
//             try {
//                 const response = await axios.post('https://cure-hub-backend-gules.vercel.app/create-payment-intent', {
//                     amount: 11499, // Total amount in cents
//                     id,
//                 });

//                 if (response.data.success) {
//                     alert('Payment successful');
//                 } else {
//                     alert('Payment failed');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('Payment error');
//             }

//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-gray-400 p-4 rounded shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
//             <div className="mb-4">
//                 <CardElement />
//             </div>
//             {error && <div className="mb-4 text-red-600">{error}</div>}
//             <button type="submit" disabled={!stripe || loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                 {loading ? 'Processing...' : 'Place Order'}
//             </button>
//         </form>
//     );
// };

// export default CheckoutForm;


// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements) {
//             setLoading(false);
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         try {
//             const { data: { clientSecret } } = await axios.post('https://cure-hub-backend-gules.vercel.app/create-payment-intent', {
//                 amount: 11499, // Replace with actual amount
//             });

//             const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                 },
//             });

//             if (error) {
//                 setError(error.message);
//                 setLoading(false);
//             } else if (paymentIntent.status === 'succeeded') {
//                 alert('Payment successful');
//                 setLoading(false);
//             }
//         } catch (error) {
//             setError(error.response ? error.response.data.error : error.message);
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-gray-400 p-4 rounded shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
//             <div className="mb-4">
//                 <CardElement />
//             </div>
//             {error && <div className="mb-4 text-red-600">{error}</div>}
//             <button type="submit" disabled={!stripe || loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                 {loading ? 'Processing...' : 'Place Order'}
//             </button>
//         </form>
//     );
// };

// export default CheckoutForm;




import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Simulate network error by using incorrect URL
            const { data: { clientSecret } } = await axios.post('https://incorrect-url.com/create-payment-intent', {
                amount: 11499, // Replace with actual amount
            });

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else if (paymentIntent.status === 'succeeded') {
                alert('Payment successful');
                setLoading(false);
            }
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(error.response.data.error);
            } else if (error.request) {
                // Request was made but no response was received
                console.error('Request data:', error.request);
                setError('Network error: No response received from server.');
            } else {
                // Something happened in setting up the request
                console.error('Error message:', error.message);
                setError(error.message);
            }
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-400 p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
            <div className="mb-4">
                <CardElement />
            </div>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <button type="submit" disabled={!stripe || loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
};

export default CheckoutForm;
