import React from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#006666] text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Information */}
                    <div>
                        <NavLink to='/' className="md:text-3xl text-2xl font-bold mb-4">Cure<span className='text-red-400 font-extrabold'>Hub</span></NavLink>
                        <hr className='mb-2 border-2 w-1/2' />
                        <p className=''>
                          <p className='text-[15px]'>Your trusted partner for comprehensive healthcare solutions. At CureHub, we offer a range of services including doctor appointments, telemedicine, online medical services, digital pathology, and medical analysis. Experience the future of healthcare with us.</p>
                            {/* <br />
                            123 Medicine St, Health City, 56789
                            <br />
                            Email: info@medicine-ecommerce.com
                            <br />
                            Phone: (123) 456-7890 */}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold">Quick Links</h3>
                        <hr className='my-2 border-2 w-1/2' />
                        <ul>
                            <li className="mb-2"><NavLink to='/' className='font-semibold'>Home</NavLink></li>
                            
                            <li className="mb-2"><NavLink to='/doctors' className='font-semibold'>Doctors </NavLink></li>
                            <li className="mb-2"><NavLink to='/telemedicine-booking' className='font-semibold'>Telemedicine</NavLink></li>
                            <li className="mb-2"><NavLink to='/shop' className='font-semibold'>MediShop</NavLink></li>
                            <li><NavLink to="/analysis" className='font-semibold'>Medical Analysis</NavLink></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-xl font-bold">Customer Service</h3>
                        <hr className='my-2 border-2 w-1/2' />
                        <ul>
                            <li className="mb-2"><NavLink to='/about' className='font-semibold'>About Us</NavLink></li>
                            <li className="mb-2"><NavLink to='/faq' className='font-semibold'>FAQ</NavLink></li>
                            <li className="mb-2"><NavLink to='/privacy-policy' className='font-semibold'>Privacy Policy</NavLink></li>
                            <li className="mb-2"><NavLink to={'/term-of-service'} className='font-semibold'>Terms of Service</NavLink></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold ">Follow Us</h3>
                        <hr className='my-2 border-2 w-1/2' />
                        <div className="flex space-x-4 text-2xl">
                            <NavLink to='https://web.facebook.com/profile.php?id=61568189276585'><FaFacebook /></NavLink>
                            <NavLink to='https://www.linkedin.com/company/hexabyte-tm-solution' ><FaLinkedin /></NavLink>
                            <NavLink to='https://www.instagram.com/' ><FaInstagramSquare /></NavLink>
                            <NavLink to='https://www.youtube.com/' ><FaYoutube /></NavLink>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center border-t border-gray-700 pt-4">
                    <p>&copy; 2024 Comprehensive healthcare solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
