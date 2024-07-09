import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './layouts/Main.jsx';
import Home from './Pages/Home/Home.jsx';
import SignUpPage from './Pages/Authentications/SignUp.jsx';
import LoginPage from './Pages/Authentications/SignIn.jsx';
import AuthProvider from './Provider/AuthContext.jsx';
import Dashboard from './layouts/Dashboard.jsx';
import Medicines from './Pages/Dashboard/Seller/Medicines.jsx';
import Advertise from './Pages/Dashboard/Seller/Advertise.jsx';
import Category from './Pages/Dashboard/Seller/Category.jsx';
import ShopPage from './Pages/Shop/Shop.jsx';
import Queries from './Pages/Dashboard/User/Queries.jsx';
import Error from './Pages/Error/Error.jsx';
import AllQuery from './Pages/All Query/AllQuery.jsx';
import Question from './Pages/Dashboard/Admin/Question.jsx';
// import Doctors from './Pages/Doctors/Doctors.jsx';
import DoctorManagement from './Pages/Dashboard/Admin/DoctorsManagement/DoctorManagement.jsx';
import Testimonial from './Pages/Testimonial/Testimonial.jsx';
import ContactUs from './Pages/ContactUs/ContactUs.jsx';
import About from './Pages/About/About.jsx';
import Doctors from './Pages/DoctorsAppoinment/Doctors.jsx';
import AppointmentGuidelines from './Pages/DoctorsAppoinment/AppointmentGuidelines.jsx';
import TelemedicineAppointments from './Pages/DoctorsAppoinment/TelemedicineAppointments.jsx';
import BookingSystem from './Pages/DoctorsAppoinment/BookingSystem.jsx';
import FAQ from './Pages/FAQ/FAQ.jsx';
import Service from './Pages/Service/Service.jsx';
import PatientHistory from './Pages/PatientHistory/PatientHistory.jsx';
import Blog from './Pages/Blog/Blog.jsx';
import MentalHealthAnalysis from './Pages/HealthAnalysis/MentalHealth.jsx';
import Prescription from './Pages/Prescription/Prescription.jsx';
import MemberShip from './Pages/MemberShip/MemberShip.jsx';
import CheckOut from './Pages/CheckOut/CheckOut.jsx';
import Telemediine from './Pages/TeleMedicine/Telemediine.jsx';
import TelemedicineBooking from './Pages/Booking/TelemedicineBooking.jsx';
import Cart from './Pages/Cart/Cart.jsx';
// import { AuthProvider } from './assets/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/shop',
        element: <ShopPage/>
      },
      {
        path: '/faq',
        element: <FAQ/>
      },
      {
        path: '/service',
        element: <Service/>
      },
      {
        path: '/blog',
        element: <Blog/>
      },
      {
        path: '/patient-history',
        element: <PatientHistory/>
      },
      {
        path: '/doctors',
        element: <Doctors/>
      },
      {
        path: '/testimonial',
        element: <Testimonial/>
      },
      {
        path: '/query',
        element: <AllQuery/>
      },
      {
        path: '/contact-us',
        element: <ContactUs/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/appointment-guideline',
        element: <AppointmentGuidelines/>
      },
      {
        path: '/telemedicine-appointments',
        element: <TelemedicineAppointments/>
      },
      {
        path: '/booking-system',
        element: <BookingSystem/>
      },
      {
        path: '/mental-health-analysis',
        element: <MentalHealthAnalysis/>
      },
      {
        path: '/prescription',
        element: <Prescription/>
      },
      {
        path: '/membership-plan',
        element: <MemberShip/>
      },
      {
        path: '/telemedicine',
        element: <Telemediine/>
      },
      {
        path: '/telemedicine-booking',
        element: <TelemedicineBooking/>
      },
      {
        path: '/checkout',
        element: <CheckOut/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      },
      {
        path: '/sign-in',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        path: '/dashboard/medicines',
        element: <Medicines/>
      },
      {
        path: '/dashboard/advertise',
        element: <Advertise/>
      },
      {
        path: '/dashboard/category',
        element: <Category/>
      },
      {
        path: '/dashboard/doctors',
        element: <DoctorManagement/>
      },
      {
        path: '/dashboard/user-query',
        element: <Question/>
      },
      {
        path: '/dashboard/queries',
        element: <Queries/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
