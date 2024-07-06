import React, { useState } from 'react';
import ProductSlider from '../../Components/Home/ProductSlider';
import CategorySection from '../../Components/Home/CategorySection';
import DiscountProducts from '../../Components/Home/DiscountProducts';
import QueriesSection from '../../Components/Home/QueriesSection';
import PopularCategoriesSection from '../../Components/Home/PopularCategoriesSection';
import TestimonialsSection from '../../Components/Home/TestimonialsSection';
import FeaturedProductsSection from '../../Components/Home/FeaturedProductsSection';
import HowItWorksSection from '../../Components/Home/Works';
import SignUpPage from '../Authentications/SignUp';
import LoginPage from '../Authentications/SignIn';
import ShopPage from '../Shop/Shop';
import CategoryDetailsMedicinePage from '../Shop/CategoryDetailsMedicinePage';
import DefaultAdmin from '../Dashboard/Admin/Default';
import Heading from '../../Components/PageHeading/Heading';
import CTASection from './CTA';
import BenefitsSection from './BenefitsSection';
import MembershipPlans from './MembershipPlans';
import LatestHealthArticles from './LatestHealthArticles';
import Blog from '../Blog/Blog';
import HowItWorks from './HowItsWork';
import KeyServices from './KeyService';
import CTADoctor from './CTA2';
import MedicineAdCTA from './CTA3';
import SuccessStories from './Stories';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Format the selected date to dd-mm-yy format
    const formattedDate = formatDate(selectedDate);
    
    setSelectedDate(formattedDate);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    // Split the date into parts (year, month, day)
    const parts = dateString.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0].slice(-2); // Take last two digits for year

    return `${day}-${month}-${year}`;
  };

return (
    <div>
        {/* <input
        type="date"
        className="p-2 rounded outline-none w-full"
        placeholder="dd-mm-yyyy"
        value={selectedDate}
        onChange={handleDateChange}
      /> */}
        {/* <SignUpPage/>
            <LoginPage/> */}


        <ProductSlider />
        {/* <CategorySection /> */}
        <KeyServices/>
       
        <CTASection/>
        <MembershipPlans/>
        <CTADoctor/>
        <BenefitsSection/>
        <MedicineAdCTA/>
        
        <SuccessStories/>
        <HowItWorks/>
        <LatestHealthArticles/>
        {/* <DiscountProducts />
        <QueriesSection />
        <PopularCategoriesSection />
        <TestimonialsSection /> */}


        {/* <FeaturedProductsSection />
        <HowItWorksSection /> */}
        {/* <ShopPage/>
          <CategoryDetailsMedicinePage/> */}
    </div>
);
};

export default Home;