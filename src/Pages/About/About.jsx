import React from 'react';
import PageHeading from '../../Components/PageHeading/PageHeading';

const About = () => {

    return (
        <div className=' text-white container mx-auto py-2'>
            <PageHeading title="About Us" subtitle="Discover Our Commitment to Excellence in Healthcare Services and Community Wellness" />
           <div className='py-10'>
           <div className='md:mx-10 mx-4 text-justify space-y-5'>
                <div>
                    <h2 className='font-bold md:text-[20px] text-[16px]'>Our Mission</h2>
                    <p>At CureHub, our mission is to provide accessible, high-quality healthcare services to everyone. We are dedicated to improving the health and well-being of our community through compassionate care, innovative medical solutions, and continuous improvement.</p>
                </div>

                <div>
                    <h2 className='font-bold md:text-[20px] text-[16px]'>Our Vision</h2>
                    <p>Our vision is to be a leader in healthcare, recognized for our excellence in patient care, advanced medical technologies, and commitment to continuous learning and development. We strive to create a healthier future for all by delivering personalized and comprehensive medical services.</p>
                </div>

                <div>
                    <h2 className='font-bold md:text-[20px] text-[16px]'>Our Values</h2>
                    <p>At the heart of our medical center are the following core values:</p>
                    <ul>
                        <li><span className='font-bold'>Compassion</span> : Providing empathetic and patient-centered care.</li>
                        <li><span className='font-bold'>Integrity</span> : Upholding the highest standards of honesty and ethics</li>
                        <li><span className='font-bold'>Excellence</span> : Striving for excellence in all aspects of healthcare.</li>
                        <li><span className='font-bold'>Innovation</span> : Embracing new technologies and treatments.</li>
                        <li><span className='font-bold'>Collaboration</span> : Working together with patients, families, and healthcare professionals.</li>
                    </ul>
                </div>

                <div>
                    <h2 className='font-bold md:text-[20px] text-[16px]'>Our History</h2>
                    <p>Established in 2024, CureHub has grown from a small clinic to a comprehensive healthcare provider. Over the years, we have expanded our services, upgraded our facilities, and adopted the latest medical technologies to better serve our community. Our journey is marked by a commitment to excellence and continuous improvement.</p>
                </div>

                <div>
                    <h2 className='font-bold md:text-[20px] text-[16px]'>Community Involvement</h2>
                    <p>At CureHub, we believe in giving back to the community. We participate in various outreach programs, health fairs, and educational seminars to promote health and wellness. Our commitment to the community extends beyond our walls, as we strive to make a positive impact on the lives of those we serve.</p>
                </div>

                <div>
                    <h2 className='font-bold md:text-[20px] text-[16px]'>Future Plan</h2>
                    <p>We are constantly looking towards the future, with plans to expand our services, enhance our facilities, and adopt cutting-edge medical technologies. Our goal is to continue evolving to meet the changing needs of our patients and to remain at the forefront of healthcare innovation.</p>
                </div>


            </div>
           </div>
        </div>
    );
};

export default About;