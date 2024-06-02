import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#006666] text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Information */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Company</h3>
                        <p>
                            Multi-Vendor Medicine Selling E-commerce Website
                            <br />
                            123 Medicine St, Health City, 56789
                            <br />
                            Email: info@medicine-ecommerce.com
                            <br />
                            Phone: (123) 456-7890
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">Home</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">Shop</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">About Us</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Customer Service</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">FAQ</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">Shipping & Returns</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i> Facebook</a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i> Twitter</a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-instagram"></i> Instagram</a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center border-t border-gray-700 pt-4">
                    <p>&copy; 2024 Multi-Vendor Medicine E-commerce. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
