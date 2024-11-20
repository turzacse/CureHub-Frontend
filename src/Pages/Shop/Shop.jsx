// import React, { useContext, useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { FaCartArrowDown, FaInfoCircle } from 'react-icons/fa';
// import { AuthContext } from '../../Provider/AuthContext';
// import image from '../../assets/dmed.png'

// const data = [
//     "Medicine",
//     "Women Choice",
//     "Diabetic Care",
//     "Baby Care",
//     "Dental Care",
//     "Diapers",
//     "Personal Care",
//     "Devices",
//     "Sexual Wellness"
// ];

// const ShopPage = () => {
//     const [selectedMedicine, setSelectedMedicine] = useState(null);
//     const [medicines, setMedicines] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedPrice, setSelectedPrice] = useState('');
//     const [selectedBrand, setSelectedBrand] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [activeTab, setActiveTab] = useState(categories[0]);
//     const [filteredMedicines, setFilteredMedicines] = useState([]);
//     const { user, curehubUser, allMedicine, getAllMedicine } = useContext(AuthContext);
//     const navigate = useNavigate();


//     useEffect(() => {
//         window.scroll(0, 0);
//         fetch('https://cure-hub-backend-gules.vercel.app/medicine')
//             .then(res => res.json())
//             .then(data => setMedicines(data));
//     }, []);

//     useEffect(() => {
//         if (medicines.length) {
//             const uniqueCategories = [
//                 ...new Set(medicines.filter((item) => item.category).map((item) => item.category))
//             ];
//             setCategories(uniqueCategories);
//             setFilteredMedicines(medicines);
//         }
//     }, [medicines]);

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     const handlePriceChange = (event) => {
//         setSelectedPrice(event.target.value);
//     };

//     const handleBrandChange = (event) => {
//         setSelectedBrand(event.target.value);
//     };
//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };


//     useEffect(() => {
//         let filtered = medicines;

//         if (selectedCategory) {
//             filtered = filtered.filter((medicine) => medicine.category === selectedCategory);
//         }

//         if (selectedPrice) {
//             const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
//             filtered = filtered.filter((medicine) => {
//                 if (maxPrice) {
//                     return medicine.price >= minPrice && medicine.price <= maxPrice;
//                 } else {
//                     return medicine.price >= minPrice;
//                 }
//             });
//         }

//         if (selectedBrand) {
//             filtered = filtered.filter((medicine) => medicine.brand === selectedBrand);
//         }

//         if (searchQuery) {
//             filtered = filtered.filter((medicine) =>
//                 medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         setFilteredMedicines(filtered);
//     }, [selectedCategory, selectedPrice, selectedBrand, searchQuery, medicines]);


//     const handleSelectMedicine = (medicine) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: `Do you want to add ${medicine.name} to the cart?`,
//             icon: 'question',
//             showCancelButton: true,
//             confirmButtonText: 'Yes',
//             cancelButtonText: 'Cancel',
//             dangerMode: true,
//             background: '#006666',
//             color: 'white'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 fetch('https://cure-hub-backend-gules.vercel.app/carts', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         medicine_code: medicine?._id,
//                         buyer_email: user.email,
//                         medicine: medicine?.name,
//                         price: medicine?.price,
//                         cureHubUser: curehubUser?._id,
//                     })
//                 })
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log('Success:', data);
//                         Swal.fire({
//                             title: 'Added',
//                             text: `${medicine.name} has been added to your cart.`,
//                             confirmButtonText: 'Ok',
//                             background: '#006666',
//                             color: 'white'
//                         });
//                     })
//                     .catch((error) => {
//                         console.error('Error:', error);
//                         Swal.fire('Error!', 'There was an issue adding the medicine to your cart.', 'error');
//                     });
//             }
//         });
//     };
//     console.log('user', curehubUser);

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 20;

//     // Calculate the total number of pages
//     const totalPages = Math.ceil(filteredMedicines?.length / itemsPerPage);

//     // Get the current items for the page
//     const currentItems = filteredMedicines?.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Handle page change
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };


//     return (
//         <div className="">
//             <section className="text-center md:py-16 py-8 bg-blue-100">
//                 <h1 className="md:text-4xl text-2xl font-bold md:mb-4">Your Trusted Online Pharmacy</h1>
//                 <p className="md:text-xl text-[12px] md:mb-6 mb-3 ">Find and purchase the medications you need with ease and convenience.</p>
//                 <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => {
//                         window.scroll({
//                             top: 600,
//                             behavior: 'smooth'
//                         });
//                     }}
//                 >Shop Now</button>
//             </section>
//             <div className="md:py-20 py-10">
//                 <section className="lg:container lg:mx-auto mx-4 flex md:flex-row flex-col gap-4 justify-between items-center">
//                     {/* <input type="text" placeholder="Search for medicines..." className="form-input p-2 rounded-lg w-full md:w-1/3" /> */}
//                     <input
//                         type="text"
//                         placeholder="Search for medicines..."
//                         className="form-input p-2 rounded-lg bg-gray-200 w-full md:w-1/3"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                     />

//                     <div className="flex md:flex-row flex-col gap-2">
//                         <select className="form-select p-2 rounded-lg bg-gray-200 md:w-[200px] w-[280px]"  onChange={handleCategoryChange}>
//                             <option value="">Select Category</option>
//                             {categories.map((category, index) => (
//                                 <option key={index} value={category}>
//                                     {category}
//                                 </option>
//                             ))}
//                         </select>
//                         <select className="form-select p-2 rounded-lg bg-gray-200 md:w-[200px] w-[280px]" onChange={handlePriceChange}>
//                             <option value="">Price in TK</option>
//                             <option value="0-10">0 - 10</option>
//                             <option value="10-50">10 - 50</option>
//                             <option value="50-100">50 - 100</option>
//                             <option value="100+">100 - 500</option>
//                         </select>
//                         <select className="form-select p-2 rounded-lg bg-gray-200 md:w-[200px] w-[280px]" onChange={handleBrandChange}>
//                             <option value="">Company</option>
//                             <option value="Brand A">Brand A</option>
//                             <option value="Brand B">Brand B</option>
//                             <option value="Brand C">Brand C</option>
//                         </select>
//                     </div>
//                 </section>
//             </div>

//             {/* <div className="w-full max-w-5xl mx-auto">
//                 <div className="flex border-b border-gray-200">
//                     {data.map((category) => (
//                         <button
//                             key={category}
//                             onClick={() => setActiveTab(category)}
//                             className={`px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 cursor-pointer focus:outline-none ${activeTab === category ? 'border-indigo-500 text-yellow-300' : 'border-transparent text-white  hover:text-gray-200 hover:border-gray-300'
//                                 }`}
//                         >
//                             {category}
//                         </button>
//                     ))}
//                 </div>
//             </div> */}


//             <div className="bg-gray-50 md:py-20 py-10">
//                 <section className="lg:container lg:mx-auto mx-4">
//                     <div className='flex justify-between items-center mb-10'>
//                         <p className='md:text-xl text-[14px] font-medium'>Trusted Online Medicine Corner</p>
//                         <div
//                             onClick={() => {
//                                 navigate('/cart')
//                             }}
//                             className='flex items-center px-auto gap-2 bg-gray-300 md:w-[200px] w-[150px] px-4 py-2 rounded-lg md:text-xl text-[14px] cursor-pointer'>
//                             Show Your Cart
//                             <FaCartArrowDown className='text-green-500' />
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-6">
//                         {currentItems?.map((medicine) => (
//                             <div key={medicine._id} className="bg-[#417e8b] p-4 rounded-lg shadow-md">
//                                 <FaInfoCircle className='text-yellow-300 text-[12px] md:text-[16px]' onClick={{

//                                 }}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                                 <img src={medicine.photo || image} alt="Product Name" className="md:w-[140px] md:h-[140px] h-[80px] w-[80px] mx-auto rounded-full object-cover" />
//                                 <h3 className="text-[12px] md:text-[16px] text-gray-50 font-bold mt-4">{medicine.name}</h3>
//                                 <div className="flex justify-between">
//                                     <p className="text-gray-100">TK {medicine.price - (medicine.discount* medicine.price)/100}</p>
//                                     <button
//                                         onClick={() => handleSelectMedicine(medicine)}
//                                         className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-1 px-2 rounded">
//                                         <FaCartArrowDown className='text-red-500 text-[12px]' />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>


//                     <div className="flex lg:bottom-10 lg:left-1/2 justify-center mt-10">
//                         <nav className="block">
//                             <ul className="flex pl-0 rounded list-none flex-wrap">
//                                 {Array.from({ length: totalPages }, (_, index) => {
//                                     if (totalPages <= 5 || index < 2 || index >= totalPages - 2 || Math.abs(index + 1 - currentPage) <= 1) {
//                                         return (
//                                             <li key={index} className="page-item">
//                                                 <button
//                                                     onClick={() => handlePageChange(index + 1)}
//                                                     className={`page-link relative block py-1.5 px-3 leading-tight text-gray-800  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-yellow-300'}`}
//                                                 >
//                                                     {index + 1}
//                                                 </button>
//                                             </li>
//                                         );
//                                     } else if (index === 2 || index === totalPages - 3) {
//                                         return <li key={index} className="page-item"> .  .  . </li>;
//                                     } else {
//                                         return null;
//                                     }
//                                 })}
//                             </ul>
//                         </nav>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default ShopPage;



import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaInfoCircle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthContext';
import image from '../../assets/dmed.png';

const ShopPage = () => {
    const [medicines, setMedicines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [companies, setCompanies] = useState([]);
    const { user, curehubUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/medicine')
            .then(res => res.json())
            .then(data => setMedicines(data));
    }, []);

    useEffect(() => {
        if (medicines?.length) {
            const uniqueCategories = [
                ...new Set(medicines.filter((item) => item.category).map((item) => item.category)),
            ];

            const uniqueCompanies = [
                ...new Set(medicines.filter((item) => item.company).map((item) => item.company)),
            ];
            setCategories(uniqueCategories);
            setCompanies(uniqueCompanies);
            setFilteredMedicines(medicines);
        }
    }, [medicines]);

    useEffect(() => {
        let filtered = medicines;

        if (selectedCategory) {
            filtered = filtered.filter((medicine) => medicine.category === selectedCategory);
        }

        if (selectedPrice) {
            const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
            filtered = filtered.filter((medicine) => {
                if (maxPrice) {
                    return medicine.price >= minPrice && medicine.price <= maxPrice;
                } else {
                    return medicine.price >= minPrice;
                }
            });
        }

        if (selectedBrand) {
            filtered = filtered.filter((medicine) => medicine.company === selectedBrand);
        }

        if (searchQuery) {
            filtered = filtered.filter((medicine) =>
                medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredMedicines(filtered);
    }, [selectedCategory, selectedPrice, selectedBrand, searchQuery, medicines]);

    const handleSelectMedicine = (medicine) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to add ${medicine.name} to the cart?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            dangerMode: true,
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
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        Swal.fire('Error!', 'There was an issue adding the medicine to your cart.', 'error');
                    });
            }
        });
    };
    const totalPages = Math.ceil(filteredMedicines?.length / itemsPerPage);
    const currentItems = filteredMedicines?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className=''>
            <section className="text-center md:py-16 py-8 bg-blue-100">
                <h1 className="md:text-4xl text-2xl font-bold md:mb-4">Your Trusted Online Pharmacy</h1>
                <p className="md:text-xl text-[12px] md:mb-6 mb-3 ">Find and purchase the medications you need with ease and convenience.</p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        window.scroll({
                            top: 385,
                            behavior: 'smooth'
                        });
                    }}
                >Shop Now</button>
            </section>
            <section className='bg-yellow-600 '>
                <section className=" md:w-[80%] h-[50px]  md:rounded-l-full md:rounded-r-full mx-auto shadow-2xl overflow-hidden relative">
                    <div className="absolute whitespace-nowrap animate-scroll px-10">
                        <p className="text-gray-50 text-lg font-bold mt-2 ">
                            Welcome to CureHub! Get the best medicines and healthcare solutions at your fingertips.
                        </p>
                    </div>
                </section>
            </section>


            <div className="flex flex-col md:flex-row  md:max-h-[700px] h-[900px] bg-white">

                {/* Left Side Filtering */}
                <aside className="md:w-1/5 w-full bg-[#417E8B] shadow-2xl md:rounded-r-lg p-4 pt-10 overflow-auto h-[700px]">
                    <input
                        type="text"
                        placeholder="Search for medicines..."
                        className="form-input p-2 rounded-lg bg-gray-200 w-full mb-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Category Filter */}
                    <div className="mb-4">
                        <div className="space-y-2">
                            {/* All Medicine Option */}
                            <label className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedCategory === "" ? 'bg-gray-200' : 'bg-transparent'}`}>
                                <input
                                    type="radio"
                                    name="category"
                                    value=""
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="form-radio text-blue-600"
                                />
                                <span className={`text-gray-100 ${selectedCategory === "" ? 'text-gray-700' : ''}`}>All Medicine</span>
                            </label>

                            {/* Category Options */}
                            <div className="grid grid-cols-2 md:grid-cols-1">
                                {categories.map((category, index) => (
                                    <div key={index}>
                                        <label
                                            className={`flex items-center space-x-3 ml-5 rounded-lg p-1 cursor-pointer md:text-[16px] text-[12px] 
                            ${selectedCategory === category ? 'bg-gray-200' : 'bg-transparent'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="form-radio text-blue-600"
                                            />
                                            <span className={`text-gray-100 ${selectedCategory === category ? 'text-gray-700' : ''}`}>{category}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Company Filter */}
                    <div className="my-4">
                        <div className="space-y-2">
                            {/* All Companies Option */}
                            <label className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedBrand === "" ? 'bg-gray-200' : 'bg-transparent'}`}>
                                <input
                                    type="radio"
                                    name="company"
                                    value=""
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="form-radio text-blue-600"
                                />
                                <span className={`text-gray-100 ${selectedBrand === "" ? 'text-gray-700' : ''}`}>All Companies</span>
                            </label>

                            {/* Company Options */}
                            <div className="grid grid-cols-2 md:grid-cols-1">
                                {companies.map((company, index) => (
                                    <div key={index}>
                                        <label
                                            className={`flex items-center space-x-3 ml-5 rounded-lg p-1 cursor-pointer md:text-[16px] text-[12px] 
                            ${selectedBrand === company ? 'bg-gray-200' : 'bg-transparent'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="company"
                                                value={company}
                                                onChange={(e) => setSelectedBrand(e.target.value)}
                                                className="form-radio text-blue-600"
                                            />
                                            <span className={`text-gray-100 ${selectedBrand === company ? 'text-gray-700' : ''}`}>
                                                
                                                {/* {company} */}
                                                {company === 'Square Pharmaceuticals Ltd.' && 'Square' }
                                                {company === 'Beximco Pharmaceuticals Ltd.' && 'Beximco'}
                                                {company === 'Renata Limited' && 'Renata'}
                                                {company === 'ACI Limited' && 'ACI'}
                                                {company === 'Opsonin Pharma Ltd.' && 'Opsonin'}
                                                {company === 'General Pharmaceuticals Ltd. (GPL)' && 'GPL'}
                                                {company === 'Incepta Pharmaceuticals Ltd.' && 'Incepta'}
                                                {company === 'Eskayef Pharmaceuticals Ltd. (SK+F)' && 'SK+F'}
                                                {company === 'ACME Laboratories Ltd.' && 'ACME'}

                                                {company === 'Pfizer Inc' && 'Pfizer Inc'}

                                                {company === 'Others' && 'Others'}
                                                
                                                </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>


                {/* Right Side Medicine Display */}
                <main className="md:w-4/5 w-full p-4 bg-gray-50 overflow-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                        {currentItems?.map((medicine) => (
                            <div key={medicine._id} className="bg-[#417e8b] p-4 rounded-lg shadow-md">
                                <FaInfoCircle className='text-yellow-300 text-[12px] md:text-[16px]' onClick={{

                                }}
                                    style={{ cursor: 'pointer' }}
                                />
                                <img
                                    src={medicine.photo || image}
                                    alt="Product Name"
                                    className="md:w-[140px] md:h-[140px] h-[80px] w-[80px] mx-auto rounded-full object-cover"
                                />
                                <h3 className="text-[12px] md:text-[16px] text-gray-50 font-bold mt-4">
                                    {medicine.name}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-100">
                                        TK{' '}
                                        {medicine.price -
                                            (medicine.discount * medicine.price) / 100}
                                    </p>
                                    <button
                                        onClick={() => handleSelectMedicine(medicine)}
                                        className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-1 px-2 rounded"
                                    >
                                        <FaCartArrowDown className="text-red-500 text-[12px]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-10">
                        <nav>
                            <ul className="flex pl-0 rounded list-none flex-wrap">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className="page-item">
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`page-link relative block py-1.5 px-3 leading-tight text-gray-800 ${currentPage === index + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-yellow-300'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
