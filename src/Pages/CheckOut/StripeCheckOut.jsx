import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51OMCncJNucR5rk9lv7ZIVo1f6W9pPPlpdlt6tngZxmqxs37leFzfQbUAV8ITZAgt8X07c559eDbMFn9ROLplyEtZ00XjlMdO9d');

const StripeCheckout = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripeCheckout;
