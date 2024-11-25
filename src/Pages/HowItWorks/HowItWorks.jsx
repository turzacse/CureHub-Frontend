import React, { useEffect, useState } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';

const tabs = [
    { name: 'Appointment', description: 'Description for Appointment' },
    { name: 'Telemedicine', description: 'Description for Telemedicine' },
    { name: 'Medi Shop', description: 'Description for Medi Shop' },
    { name: 'Medical Analysis', description: 'Description for Medical Analysis' },
];

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    useEffect(() => {
        window.scroll(0,0);
    } ,[])

    return (
        <div >
            <Heading title="HOW IT WORKS" />
            <section className="container mx-auto py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-2 justify-center mx-4 ">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={` py-2 px-4 rounded-lg font-medium transition-colors ${activeTab.name === tab.name
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-800'
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="">
                    {/* <p className="text-lg">{activeTab.description}</p> */}
                    {
                        activeTab.name == 'Appointment' && <Tab1/>
                    }
                    {
                        activeTab.name == 'Telemedicine' && <Tab2/>
                    }
                    {
                        activeTab.name == 'Medi Shop' && <Tab3/>
                    }
                    {
                        activeTab.name == 'Medical Analysis' && <Tab4/>
                    }
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
