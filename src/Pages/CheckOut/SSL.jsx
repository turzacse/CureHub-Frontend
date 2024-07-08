import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('BDT');

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/initiate-payment', {
                amount: amount,
                currency: currency
            });

            // Redirect to the payment gateway
            window.location.href = response.data.GatewayPageURL;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div>
            <h1>SSLCommerz Payment</h1>
            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentForm;
