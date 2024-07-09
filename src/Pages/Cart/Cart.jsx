import React, { useContext, useEffect, useState } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import { AuthContext } from '../../Provider/AuthContext';

const Cart = () => {
    const {user} = useContext(AuthContext);
    const [allCart, setAllCart] = useState([]);
    const [myCart, setMyCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/carts').then(res => res.json())
        .then(data => {
            const cartData = data?.filter((item) => item.buyer_email === user?.email)
            setMyCart(cartData) 
        })
    } ,[user])
    return (
        <div>
            <Heading title='SHOPPING CART' />

            <section className='text-white mx-4 py-10  lg:container lg:mx-auto '>
                My cart {myCart?.length}

                <div>
                    {
                        myCart?.map((item) => <div key={item._id}
                        className='flex gap-4 items-center space-y-4'
                        >
                            <p className='w-[200px]'>{item.medicine}</p>
                            <div className='flex gap-4'>
                                <span>-</span>
                                <span>{quantity}</span>
                                <span>+</span>
                            </div>
                        </div>)
                    }
                </div>
            </section>
        </div>
    );
};

export default Cart;