import React from 'react';
import Heading from '../../Components/PageHeading/Heading';

const termsOfServiceData = [
    {
      title: 'Introduction',
      content: `Welcome to CureHub. These Terms of Service govern your use of our website and services. By accessing or using CureHub, you agree to comply with and be bound by these terms. If you do not agree, please do not use our services.`
    },
    {
      title: 'Use of Services',
      content: `
        - **Eligibility:** You must be at least 18 years old to use our services.
        - **Account Responsibilities:** You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      `
    },
    {
      title: 'Services Provided',
      content: `CureHub provides a range of services including doctor appointments, telemedicine consultations, and online medicine purchases. Detailed descriptions of each service are available on our website.`
    },
    {
      title: 'User Obligations',
      content: `
        - **Accuracy of Information:** You agree to provide accurate, current, and complete information when using our services.
        - **Prohibited Activities:** You may not use our services for any unlawful or prohibited purposes.
      `
    },
    {
      title: 'Payment Terms',
      content: `
        - **Fees:** All applicable fees will be clearly stated on our website.
        - **Refunds:** Refund policies vary by service and will be outlined in the specific service agreement.
      `
    },
    {
      title: 'Intellectual Property',
      content: `All content on CureHub, including text, graphics, and logos, is the property of CureHub or its licensors and is protected by intellectual property laws.`
    },
    {
      title: 'Limitation of Liability',
      content: `CureHub is not liable for any indirect, incidental, or consequential damages arising from the use of our services.`
    },
    {
      title: 'Changes to Terms',
      content: `We reserve the right to update or modify these Terms of Service at any time. Changes will be posted on this page, and your continued use of our services constitutes acceptance of the revised terms.`
    },
    {
      title: 'Contact Information',
      content: `For any questions about these Terms of Service, please contact us at [support@curehub.com](mailto:support@curehub.com).`
    }
  ];
  

  const TermOfService = () => {
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            // Check if the line starts with a hyphen for bullet points
            const isBulletPoint = line.startsWith('-');
            // Remove the hyphen and trim
            const cleanLine = isBulletPoint ? line.slice(1).trim() : line;

            // Replace **bold text** with <span> for styling
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
        <div className="">
            <Heading title='Terms Of Service' />
            <div className="lg:container lg:mx-auto mx-4 text-white">
            <div className="py-10">
                {termsOfServiceData.map((section, index) => (
                    <div key={index} className="pb-6">
                        <h2 className="text-xl font-semibold text-[#00B6FF] ">{section.title}</h2>
                        <div className="mt-2">
                            {renderContent(section.content)}
                        </div>
                    </div>
                ))}
            </div>
</div>

        </div>
    );
};

export default TermOfService;