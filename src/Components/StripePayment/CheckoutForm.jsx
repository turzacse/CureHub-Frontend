import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51OMCncJNucR5rk9lv7ZIVo1f6W9pPPlpdlt6tngZxmqxs37leFzfQbUAV8ITZAgt8X07c559eDbMFn9ROLplyEtZ00XjlMdO9d');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post('https://cure-hub-backend-gules.vercel.app/create-checkout-session', {
          items: [{ name: 'Sample Item', price: 1020, quantity: 1 }],
        });

        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-10 p-8 shadow-lg rounded-lg bg-white">
      <CardElement className="p-4 border border-gray-300 rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 w-full bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600"
      >
        Pay
      </button>
    </form>
  );
};

const StripeContainer = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeContainer;
