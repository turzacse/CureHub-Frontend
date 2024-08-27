import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import img1 from '../../assets/Image/Doctor/doctor1.png'
import img2 from '../../assets/Image/Doctor/doctor2.png'
import img3 from '../../assets/Image/Doctor/doctor3.png'
import img4 from '../../assets/Image/Doctor/doctor4.png'
import img5 from '../../assets/Image/Doctor/doctor5.png'
import img6 from '../../assets/Image/Doctor/doctor6.png'

const GetInTouch = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const doctor = [img1, img2, img3, img4, img5, img6];
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 6);
        }, 5000); // Change image every 5 seconds
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, []);
    return (
        <div className='bg-gray-400 py-10'>
            <div className="md:container md:mx-auto rounded-lg py-16 px-6 bg-gray-300">
                <h2 className="text-3xl font-bold text-[#006666] text-center">Get in Touch</h2>
                <p className="text-lg text-gray-700 mt-2 text-center">We're here to help you with any inquiries or issues you may have.</p>

                <div className="flex justify-between gap-4 md:gap-10 items-center flex-col-reverse md:flex-row md:mt-10 mt-4 space-y-8 md:space-y-0 md:space-x-8">

                    <div className="w-full md:w-1/2">
                        <form
                        onSubmit={ (e) => {
                            e.preventDefault();
                            Swal.fire({text: 'We are working. Please keep in touch'})
                        }}
                        className="space-y-4 text-white">
                            <input type="text" placeholder="Your Name" className="w-full p-3 border bg-gray-600 rounded-md" />
                            <input type="email" placeholder="Your Email" className="w-full bg-gray-600 p-3 border rounded-md" />
                            <input type="text" placeholder="Subject" className="w-full p-3 bg-gray-600 border rounded-md" />
                            <textarea placeholder="Your Message" className="w-full bg-gray-600 p-3 border rounded-md h-32"></textarea>
                            <button className="w-full  bg-[#006666] text-white py-3 rounded-md hover:bg-[#004d4d]">Send Message</button>
                        </form>
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <img className='md:h-[400px] h-[300px] rounded-lg flex justify-end items-center ' src={doctor[currentImageIndex]} alt="Hello CureHub User" />
                        {/* <div className="flex items-center">
                            <i className="fas fa-phone-alt text-[#006666] text-xl"></i>
                            <p className="ml-4 text-lg text-gray-700">+123 456 789</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-envelope text-[#006666] text-xl"></i>
                            <p className="ml-4 text-lg text-gray-700">contact@curehub.com</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-[#006666] text-xl"></i>
                            <p className="ml-4 text-lg text-gray-700">123 Main St, City, Country</p>
                        </div>
                        <div className="mt-6">
                            <iframe src="YOUR_GOOGLE_MAP_EMBED_LINK" className="w-full h-64 border rounded-md"></iframe>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;