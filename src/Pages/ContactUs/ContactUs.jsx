import React from 'react';
import Headline from '../../Components/Headline';
import { RiHomeOfficeFill } from 'react-icons/ri';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { MdMarkEmailRead } from 'react-icons/md';
import Swal from 'sweetalert2';
import Heading from '../../Components/PageHeading/Heading';

const ContactUs = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            text: `We are working for you, to create amazing somethings. Stay with us, we'll get back you within 48 hrs`,
            showConfirmButton: true,
            background: '#008080',
            color: '#fff'
            // timer: 1500
        });
    }
    return (
        <div className='text-white '>
            <Heading title='contact us' />

            <div className="lg:container lg:mx-auto mx-4 py-10">
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
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Contact Us</h1>
                            <p className="py-6">
                                We're here to help and answer any questions you might have. We look forward to hearing from you.
                            </p>
                        </div>
                        <div className="flex-1 card w-full shrink-0 shadow-2xl">
                            <form className="card-body text-black">
                                <div className="form-control">
                                    <input type="text" placeholder="Full Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <input type="email" placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <input type="text" placeholder="Subject" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <textarea type="email" placeholder="Write your meassage here" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button
                                        onClick={handleSubmit}
                                        className="btn btn-info text-white ">SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;