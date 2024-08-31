import React from 'react';
import StripeContainer from './CheckoutForm';

function Pay() {
  return (
    <div className="App">
      <header className="bg-teal-500 text-white p-4">
        <h1 className="text-3xl">Stripe Payment Gateway</h1>
      </header>
      <main className="p-4">
        <StripeContainer />
      </main>
    </div>
  );
}

export default Pay;
