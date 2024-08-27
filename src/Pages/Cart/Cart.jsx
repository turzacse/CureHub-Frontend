import React, { useContext, useEffect, useState } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import { AuthContext } from '../../Provider/AuthContext';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import Promotion from './Promotion';
import Swal from 'sweetalert2';

const Cart = () => {
    const { user, curehubUser } = useContext(AuthContext);
    const [allSelecteditem, setAllSelecteditem] = useState([]);
    const [myCart, setMyCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    console.log(allSelecteditem);

    const getCartItem = () => {
        fetch('https://cure-hub-backend-gules.vercel.app/carts')
            .then(res => res.json())
            .then(data => {
                const cartData = data?.filter((item) => item.buyer_email === user?.email);
                setMyCart(cartData);
                const initialQuantities = {};
                cartData.forEach(item => {
                    initialQuantities[item._id] = 1; // Initialize all quantities to 1
                });
                setQuantities(initialQuantities);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                Swal.fire('Error!', 'There was an issue fetching the cart items.', 'error');
            });
    };
    useEffect(() => {
        window.scroll(0,0);
        if (user) {
            getCartItem();
        }
    }, [user]);

    const handleRemoveFromCart = (item) => {
        console.log(item._id);
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to remove ${item.medicine} from the cart?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
            background: '#006666',
            color: 'white'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://cure-hub-backend-gules.vercel.app/carts/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        Swal.fire({
                            title: 'Removed',
                            text: `${item.medicine} has been removed from your cart.`,
                            confirmButtonText: 'Ok',
                            background: '#006666',
                            color: 'white'
                        });
                        getCartItem();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        Swal.fire('Error!', 'There was an issue removing the medicine from your cart.', 'error');
                    });
            }
        });
    };

    const handleAddmedicine = (medicine) => {
        Swal.fire({
          title: 'Are you sure?',
          text: `Do you want to add ${medicine.name} to the cart?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          background: '#006666',
          color: 'white'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch('https://cure-hub-backend-gules.vercel.app/carts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                medicine_code: medicine?._id,
                buyer_email: user.email,
                medicine: medicine?.name,
                price: medicine?.price,
                cureHubUser: curehubUser?._id,
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              Swal.fire({
                title: 'Added',
                text: `${medicine.name} has been added to your cart.`,
                confirmButtonText: 'Ok',
                background: '#006666',
                color: 'white'
              });
              // Directly update the medicines state to ensure immediate UI update
              getCartItem();
            })
            .catch((error) => {
              console.error('Error:', error);
              Swal.fire('Error!', 'There was an issue adding the medicine to your cart.', 'error');
            });
          }
        });
      };

    const handleCheckboxClick = (item) => {
        if (allSelecteditem.includes(item._id)) {
            setAllSelecteditem(allSelecteditem.filter(selectedItemId => selectedItemId !== item._id));
        } else {
            setAllSelecteditem([...allSelecteditem, item._id]);
        }
    };

    const increaseQuantity = (itemId) => {
        setQuantities({
            ...quantities,
            [itemId]: (quantities[itemId] || 1) + 1
        });
    };

    const decreaseQuantity = (itemId) => {
        setQuantities({
            ...quantities,
            [itemId]: (quantities[itemId] || 1) > 1 ? (quantities[itemId] || 1) - 1 : 1
        });
    };

    const calculateTotalPrice = () => {
        return allSelecteditem.reduce((total, itemId) => {
            const item = myCart.find(item => item._id === itemId);
            return total + (item.price * quantities[itemId]);
        }, 0);
    };

    return (
        <div>
            <Heading title='SHOPPING CART' subtitle='Review your selected items and proceed to checkout.' />

            <section className='text-black mx-4 py-10'>
                {/* My cart {myCart?.length} */}

                <div>
                    {
                        myCart?.map((item) => (
                            <div key={item._id} className='flex gap-4 items-center space-y-4'>
                                <div className='text-xl cursor-pointer flex items-center mt-4' onClick={() => handleCheckboxClick(item)}>
                                    {allSelecteditem.includes(item._id) ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                                </div>
                                <p className='w-[100px]'>{item.medicine}</p>
                                <h2 className='w-[80px]'>Price: {item.price * quantities[item._id]}</h2>
                                <div className='flex gap-4 font-bold items-center'>
                                    <span
                                        className='cursor-pointer'
                                        onClick={() => decreaseQuantity(item._id)}>-</span>
                                    <span>{quantities[item._id]}</span>
                                    <span
                                        className='cursor-pointer'
                                        onClick={() => increaseQuantity(item._id)}>+</span>
                                </div>
                                <button
                                    className='bg-[#b11414] px-4 py-2 rounded-lg text-white'
                                    onClick={() => handleRemoveFromCart(item)}
                                >
                                    Remove From the cart
                                </button>
                            </div>
                        ))
                    }
                    {
                        allSelecteditem?.length !== 0 && <div className='my-5'>
                            <hr className='w-1/3' />
                            <div className=" mt-5 flex items-center gap-10">
                                <p className=''>Total Price: {calculateTotalPrice()}</p>
                                {/* <button className='bg-gray-200 px-4 py-2 text-black rounded-lg'>Proceed to Pay</button> */}
                            </div>
                        </div>
                    }
                </div>
                <Promotion  
                handleAddmedicine={handleAddmedicine}
                />
            </section>
        </div>
    );
};

export default Cart;
