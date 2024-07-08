import React from 'react';
import StripeCheckout from './StripeCheckOut';
// import StripeCheckout from './StripeCheckOut';
// import StripeCheckout from './StripeCheckout';

const CheckoutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title and Subtitle */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Complete Your Purchase</h1>
                <p className="text-lg">Review your order and enter your payment information to complete your purchase. Thank you for choosing our services!</p>
            </div>

            {/* Order Summary */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="bg-gray-400 p-4 rounded shadow-md">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold">Item Name</p>
                            <p>Quantity: 1</p>
                        </div>
                        <div>
                            <p className="font-semibold">$99.99</p>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <p className="font-semibold">Subtotal: $99.99</p>
                        <p className="font-semibold">Taxes: $5.00</p>
                        <p className="font-semibold">Shipping: $10.00</p>
                        <p className="font-bold text-xl">Total: $114.99</p>
                    </div>
                </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                <div className="bg-gray-400 p-4 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input type="text" className="form-input w-full p-2 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Address</label>
                        <input type="text" className="form-input w-full p-2 rounded-lg" />
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">City</label>
                            <input type="text" className="form-input w-full p-2 rounded-lg" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">State</label>
                            <input type="text" className="form-input w-full p-2 rounded-lg" />
                        </div>
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Zip Code</label>
                            <input type="text" className="form-input w-full p-2 rounded-lg" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Country</label>
                            <input type="text" className="form-input w-full p-2 rounded-lg" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2">Billing address same as shipping address</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Payment Information with Stripe */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                <StripeCheckout />
            </div>
        </div>
    );
};

export default CheckoutPage;
