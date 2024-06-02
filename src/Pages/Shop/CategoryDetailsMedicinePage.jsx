import React, { useState } from 'react';

// Sample data for medicines
const medicinesData = [
    {
        id: 1,
        category: 'Tablet',
        name: 'Medicine 1',
        description: 'Description for Medicine 1',
        image: 'https://via.placeholder.com/150',
        price: '$10.99'
    },
    {
        id: 2,
        category: 'Syrup',
        name: 'Medicine 2',
        description: 'Description for Medicine 2',
        image: 'https://via.placeholder.com/150',
        price: '$15.99'
    },
    {
        id: 3,
        category: 'Capsule',
        name: 'Medicine 3',
        description: 'Description for Medicine 3',
        image: 'https://via.placeholder.com/150',
        price: '$20.99'
    }
    // Add more medicines as needed
];

const CategoryDetailsMedicinePage = () => {
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const handleSelectMedicine = (medicine) => {
        // Add medicine to cart logic
        console.log('Selected medicine:', medicine);
    };

    const handleViewDetails = (medicine) => {
        setSelectedMedicine(medicine);
    };

    const handleCloseModal = () => {
        setSelectedMedicine(null);
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Category Details: Medicines</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicinesData.map(medicine => (
                        <tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.description}</td>
                            <td>{medicine.price}</td>
                            <td>
                                <button onClick={() => handleSelectMedicine(medicine)} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Select</button>
                                <button onClick={() => handleViewDetails(medicine)} className="bg-gray-500 text-white py-2 px-4 rounded-md">View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedMedicine && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <button onClick={handleCloseModal} className="absolute top-0 right-0 p-2">&times;</button>
                        <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
                        <img src={selectedMedicine.image} alt={selectedMedicine.name} className="w-64 h-64 object-cover mb-4"/>
                        <p>{selectedMedicine.description}</p>
                        <p className="text-gray-700 font-bold">{selectedMedicine.price}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDetailsMedicinePage;
