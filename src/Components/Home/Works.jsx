import React from 'react';

const HowItWorksSection = () => {
    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">Step 1: Browse Medicines</h3>
                        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">Step 2: Add to Cart</h3>
                        <p className="text-gray-700">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">Step 3: Checkout</h3>
                        <p className="text-gray-700">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">Step 4: Receive Delivery</h3>
                        <p className="text-gray-700">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
