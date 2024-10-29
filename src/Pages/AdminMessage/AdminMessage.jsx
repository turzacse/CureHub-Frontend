import React, { useEffect, useState } from 'react';

const AdminMessage = () => {
    const [messages, setMessages] = useState();

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/contact-us')
        .then(res => res.json())
        .then(data =>  setMessages(data))
    } ,[])
    return (
        <div className='p-4'>
            <h2 className='text-xl font-bold text-yellow-800'>MESSAGES</h2>

            <section className='mt-10'>
                {messages?.length}
            </section>
        </div>
    );
};

export default AdminMessage;