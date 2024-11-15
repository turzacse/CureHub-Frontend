import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';

const Usersmessage = () => {
    const [myMessages, setMymessages] = useState();
    const { curehubUser } = useContext(AuthContext);

    const fetchData = async () => {
        if (curehubUser?._id) {
            try {
                const response = await fetch(`https://cure-hub-backend-gules.vercel.app/contact-us/user/${curehubUser?._id}`);
                if (response.ok) {
                    const data = await response.json();
                    setMymessages(data?.reverse());
                } else {
                    console.error("Failed to fetch messages. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='pt-10'>
            <h2 className='uppercase font-bold text-xl text-gray-700'>my messages</h2>
            {myMessages?.length}
            <div className='grid grid-cols-4 gap-2'>
                {
                    myMessages?.map((item) =>
                        <div
                            className='bg-white rounded-md h-[200px] shadow-2xl p-4'
                            key={item?._id}>
                            <div className='h-[140px]'>
                                <h2> <strong>SUBJECT:</strong> {item.subject}</h2>
                                <p><strong>TIME:</strong> {item?.createdAt}</p>
                                <p><strong>MESSAGE</strong> <br /> {item?.message}</p>
                            </div>
                            <div className="flex justify-end">
                                <button className="btn bg-gray-800 btn-sm w-[100px] text-[12px]">NOT REPLIED</button>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Usersmessage;