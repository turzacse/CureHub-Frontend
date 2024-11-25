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
    }, [curehubUser?._id])

    console.log(myMessages)
    return (
        <div className='p-4'>
            <h2 className='text-xl font-bold text-yellow-800 mt-5'>MY MESSAGES</h2>
            
            <div className='grid md:grid-cols-4 grid-cols-1 gap-2 md:mt-5 mt-2'>
                {
                    myMessages?.map((item) =>
                        <div
                            className='bg-gray-300 rounded-md  shadow-2xl p-4'
                            key={item?._id}>
                            <div className=''>
                                <h2> <strong>SUBJECT:</strong> {item.subject}</h2>
                                <p><strong>TIME:</strong> {item?.createdAt}</p>
                                <p><strong>MESSAGE</strong> <br /> {item?.message}</p>
                                <p><strong className='uppercase'>Support Reply</strong> <br /> 
                                {item?.reply?.map((item, index) =>
                                        <div>
                                            <p className='flex justify-start text-left'>
                                            {index+1}. {item?.replymsg}
                                            </p>
                                            <p className='flex justify-end text-[12px] text-black'>{item?.time}</p>
                                        </div>
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="btn bg-yellow-500 hover:bg-yellow-600 btn-sm w-[100px] text-[12px] text-white border-none">
                                    {item?.rely?.length == 0 ? 'NOT REPLIED': 'REPLIED'}
                                </button>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Usersmessage;