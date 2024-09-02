import React from 'react';
import Heading from '../../Components/PageHeading/Heading';

const privacyPolicyData = [
    {
        title: 'Introduction',
        content: `This Privacy Policy explains how CureHub collects, uses, and protects your personal information. By using our services, you consent to our data practices as outlined in this policy.`
    },
    {
        title: 'Information We Collect',
        content: `
            - **Personal Information:** We collect personal information you provide directly, such as your name, email address, and payment information.
            - **Usage Data:** We collect information about how you interact with our services, including IP addresses and browsing data.
        `
    },
    {
        title: 'How We Use Your Information',
        content: `
            - **Service Provision:** We use your information to provide and improve our services.
            - **Communication:** We may use your contact information to send updates, promotional materials, and other information related to our services.
        `
    },
    {
        title: 'Data Security',
        content: `We implement security measures to protect your personal information from unauthorized access, use, or disclosure.`
    },
    {
        title: 'Third-Party Services',
        content: `We may share your information with third-party service providers who assist us in operating our services. We do not control these third parties and are not responsible for their privacy practices.`
    },
    {
        title: 'Your Rights',
        content: `
            - **Access and Correction:** You have the right to access and correct your personal information.
            - **Opt-Out:** You can opt-out of receiving promotional communications from us at any time.
        `
    },
    {
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. Changes will be posted on this page, and your continued use of our services constitutes acceptance of the revised policy.`
    },
    {
        title: 'Contact Us',
        content: `If you have any questions or concerns about this Privacy Policy, please contact us at curehub@gmail.com.`
    }
];


const PrivacyPolicy = () => {
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            const isBulletPoint = line.startsWith('-');
            const cleanLine = isBulletPoint ? line.slice(1).trim() : line;

            const parts = cleanLine.split(/\*\*(.*?)\*\*/g);
            return (
                <p key={index} className={isBulletPoint ? 'list-disc pl-6' : ''}>
                    {parts.map((part, i) => 
                        i % 2 === 1 ? 
                        <strong key={i}>{part}</strong> : 
                        part
                    )}
                </p>
            );
        });
    };

    return (
        <div>
            <Heading title='Privacy Policy'/>
            <div className="py-10 text-white lg:container lg:mx-auto mx-4">
                {privacyPolicyData.map((section, index) => (
                    <div key={index} className="pb-6">
                        <h2 className="text-xl font-semibold text-[#00B6FF]">{section.title}</h2>
                        <div className="mt-2">
                            {renderContent(section.content)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
