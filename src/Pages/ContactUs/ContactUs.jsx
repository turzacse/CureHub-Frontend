import React from 'react';
import Headline from '../../Components/Headline';
import { RiHomeOfficeFill } from 'react-icons/ri';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { MdMarkEmailRead } from 'react-icons/md';

const ContactUs = () => {
    return (
        <div className='text-white md:mx-20 mx-4 py-10'>
            <Headline headline='contact us' />

            <h1 className='text-3xl font-bold'>Address</h1>
            <div>
                <h3 className='text-2xl font-semibold flex gap-2 items-center'>
                    <RiHomeOfficeFill />
                    Office Address</h3>
                <p>CureHub Headquarters <br /> 123 Health Street, Wellness City, HW 45678</p>
            </div>

            <div className='my-10'>
                <h3 className='text-2xl font-semibold flex gap-2 items-center'>
                    <BsFillTelephoneForwardFill />
                    Telephone</h3>
                <p>Customer Support: +1 (123) 456-7890 </p> 
                <p>Corporate Office: +1 (987) 654-3210</p>
            </div>

            <div>
                <h3 className='text-2xl font-semibold flex gap-2 items-center'>
                <MdMarkEmailRead />
                    Email Address</h3>
                <p>General Inquiries: info@curehub.com</p> 
                <p>Customer Support: support@curehub.com</p>
                <p>Partnerships: partnerships@curehub.com</p>
            </div>

            <h1 className='text-3xl font-bold mt-10'>Business Hours</h1>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>

            <div
                className="hero min-h-screen mt-10"
                style={{
                    backgroundImage: "url(https://i.ibb.co/RHgJDd1/doctorrr.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>



                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Contact Us</h1>
                        <p className="py-6">
                            We're here to help and answer any questions you might have. We look forward to hearing from you.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;