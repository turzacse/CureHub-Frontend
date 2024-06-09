import React from 'react';
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

const Home = () => {
    return (
        <div>
            {/* <SignUpPage/>
            <LoginPage/> */}
          <ProductSlider/>
          <CategorySection/> 
          <DiscountProducts/> 
          <DefaultAdmin/>
          <QueriesSection/>
          <PopularCategoriesSection/>
          <TestimonialsSection/>
          <FeaturedProductsSection/>
          <HowItWorksSection/>
          <ShopPage/>
          <CategoryDetailsMedicinePage/>
        </div>
    );
};

export default Home;