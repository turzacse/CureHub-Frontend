import React, { useContext, useEffect } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { AuthContext } from '../../Provider/AuthContext';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Payment = () => {
    const location = useLocation();
    const paymentData = location.state;
    const {curehubUser, user} = useContext(AuthContext);
    // console.log(paymentData?.medicines);
    useEffect(() => {
        window.scroll(0,0);
    } ,[])

    console.log(paymentData);
    return (
        <div>
            <Heading title="Checkout" subtitle="" />

            <section className='container mx-auto text-white  md:px-10 px-4  py-10'>
                {/* <h2 className='text-center'>Payment will appeare here</h2> */}

                <section className='md:w-1/3 mx-auto bg-white text-gray-700 p-5 rounded-lg shadow-2xl'>
                    <div className='my-5 space-y-4'>
                        {/* <p>{paymentData?.appointmentId}</p> */}
                        <p className='uppercase bg-[#054070] py-2 rounded-md text-white px-4'> <strong>Payment For:</strong> {paymentData?.type} </p>
                        <p className='uppercase bg-[#054070] py-2 rounded-md text-white px-4'> <strong>DEtails:</strong> {paymentData?.details}</p>
                        <p className='uppercase bg-[#054070] py-2 rounded-md text-white px-4'> <strong>Name:</strong> {user?.displayName || 'curehub User'} </p>
                        <p className=' bg-[#054070] py-2 rounded-md text-white px-4'> <strong>EMAIL:</strong> {user?.email || 'curehub@payment.com'} </p>
                        <p className='uppercase bg-[#054070] py-2 rounded-md text-white px-4'> <strong>Amount:</strong> {paymentData?.ammount} TK = ${(paymentData?.ammount/119.56).toFixed(2)}</p>
                        <p className='pt-0 text-red-400  text-[14px] font-semibold'>We will charge the amount in USD equivalent to the BDT</p>
                    </div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm 
                        price={paymentData?.ammount} 
                        type={paymentData?.type} 
                        subtype={paymentData?.details} 
                        appointmentId= {paymentData?.appointmentId}
                        medicines = {paymentData?.medicines}  
                        />
                    </Elements>
                </section>
            </section>
        </div>
    );
};

export default Payment;