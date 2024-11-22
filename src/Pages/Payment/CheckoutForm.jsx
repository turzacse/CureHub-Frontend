import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, type, subtype, appointmentId }) => {
    const [clientSecret, setClientSecret] = useState('');
    const { curehubUser, user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    // const price = 100;

    console.log(curehubUser, 'from payment');

    useEffect(() => {
        axios.post('https://cure-hub-backend-gules.vercel.app/create-intent', { price: (price/119.56) }).then(res => {
            console.log(res.data);
            setClientSecret(res.data.clientSecret)
        })
    }, [])

    const updateUserPlan = async (email, plan) => {
        try {
            if (!email || !plan) {
                console.error("Email and Plan are required");
                return;
            }
            const payload = { email, plan };
            const response = await axios.put('https://cure-hub-backend-gules.vercel.app/users/membership', payload);

            if (response.status === 200) {
                console.log("User membership updated successfully:", response.data);
            } else {
                console.error("Failed to update membership:", response.data);
            }
        } catch (error) {
            console.error("Error updating membership:", error);   
        }
    };

    const updateAppointment = async (appointmentId) => {
       if(appointmentId){
        try {
            const response = await axios.put(`https://cure-hub-backend-gules.vercel.app/telemedicine-pay/${appointmentId}`);

            if (response.status === 200) {
                console.log("User Telemedicine Appointment updated successfully:", response.data);
            } else {
                console.error("Failed to update Telemedicine:", response.data);
            }
        } catch (error) {
            console.error("Error updating telemedicine:", error);   
        }
       }
    }

    const addPaymentDataToDB = async (tId) => {
        const paymentData = {
            transactionID: tId,
            amount: price,
            type:type,
            email: user?.email,
            subtype: subtype, 
        }
        if (type === 'Telemedicine') {
            paymentData.appointmentId = appointmentId; 
        }

        console.log(paymentData);
        try {
            const response = await axios.post('https://cure-hub-backend-gules.vercel.app/payments', paymentData);
            console.log('Payment added successfully:', response.data);
            if(type =='Membership Plan'){
                const plan = subtype
                const email = user?.email
                updateUserPlan(email, plan);
            }
            else if(type == 'Telemedicine'){
                if(appointmentId){
                    updateAppointment(appointmentId);
                }
            }
            Swal.fire({
                text: 'Payment Successfull',
                icon:'success',
                background: '#006666',
                color: 'white'
            })

        } catch (error) {
            console.error('Error adding payment:', error.response ? error.response.data : error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!!stripe && !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous@gmail.com',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent);
            console.log('TransactioID', paymentIntent?.id);
            addPaymentDataToDB(paymentIntent?.id)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className='bg-[#cbd6df] py-2 rounded-md text-white px-4'>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className='bg-[#056370] hover:bg-[#1693a3] py-2 rounded-md text-white px-4 w-full mt-5 uppercase' type="submit" disabled={!stripe}>
                    <strong>Pay</strong>
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;