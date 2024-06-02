import React, { useState } from 'react';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        photo: null,
        password: '',
        role: 'user'
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform signup logic here using formData
        console.log(formData);
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-gray-700 font-semibold mb-2">Photo</label>
                    <input type="file" id="photo" name="photo" accept="image/*" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
