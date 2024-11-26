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
import Doctors from './Pages/Doctors/Doctors.jsx';
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
import Dash from './Components/Dashboard.jsx';
import Analysis from './Pages/Analysis/Analysis.jsx';
import Appointment from './Pages/Appointment/Appointment.jsx';
import AllUser from './Pages/AllUser/AllUser.jsx';
import AppointmentManagement from './Pages/AppointmentManagement/AppointmentManagement.jsx';
import AppointmentDoctor from './Pages/AppointmentDoctor/AppointmentDoctor.jsx';
import App from './Components/Facebook/App.jsx';
import Pay from './Components/StripePayment/App.jsx';
import HowItWorks from './Pages/HowItWorks/HowItWorks.jsx';
import PrivecyPolicy from './Pages/PrivecyPolicy/PrivecyPolicy.jsx';
import TermOfService from './Pages/TermOfService/TermOfService.jsx';
import AdminMessage from './Pages/AdminMessage/AdminMessage.jsx';
import Usersmessage from './Pages/UsersMesage/Usersmessage.jsx';
import AdminMemberShip from './Pages/AdminMemberShip/AdminMemberShip.jsx';
import AdminOrderHistory from './Pages/AdminOrderHistory/AdminOrderHistory.jsx';
import UserProfile from './Pages/UserProfile/UserProfile.jsx';
import Payment from './Pages/Payment/Payment.jsx';
import AdminPayment from './Pages/AdminPayment/AdminPayment.jsx';
import UserOrder from './Pages/UserOrder/UserOrder.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import { router } from './Routes/Route.jsx';
// import { AuthProvider } from './assets/AuthContext.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     errorElement: <Error/>,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/shop',
//         element: <PrivateRoute><ShopPage/></PrivateRoute>
//       },
//       {
//           path: '/analysis',
//           element: <Analysis/>
//       },
//       {
//         path: '/faq',
//         element: <FAQ/>
//       },
//       {
//         path: '/how-it-works',
//         element: <HowItWorks/>
//       },
//       {
//         path: '/service',
//         element: <Service/>
//       },
//       {
//         path: '/blog',
//         element: <Blog/>
//       },
//       {
//         path: '/patient-history',
//         element: <PatientHistory/>
//       },
//       {
//         path: '/doctors',
//         element: <PrivateRoute><Doctors/></PrivateRoute>
//       },
//       {
//         path: '/testimonial',
//         element: <Testimonial/>
//       },
//       {
//         path: '/query',
//         element: <AllQuery/>
//       },
//       {
//         path: '/contact-us',
//         element: <ContactUs/>
//       },
//       {
//         path: '/about',
//         element: <About/>
//       },
//       {
//         path: '/cart',
//         element: <Cart/>
//       },
//       {
//         path: '/payment',
//         element: <Payment/>
//       },
//       {
//         path: '/privacy-policy',
//         element: <PrivecyPolicy/>
//       },
//       {
//         path: '/term-of-service',
//         element: <TermOfService/>
//       },
//       {
//         path: '/appointment-guideline',
//         element: <AppointmentGuidelines/>
//       },
//       {
//         path: '/telemedicine-appointments',
//         element: <TelemedicineAppointments/>
//       },
//       {
//         path: '/booking-system',
//         element: <BookingSystem/>
//       },
//       {
//         path: '/mental-health-analysis',
//         element: <MentalHealthAnalysis/>
//       },
//       {
//         path: '/prescription',
//         element: <Prescription/>
//       },
//       {
//         path: '/membership-plan',
//         element: <MemberShip/>
//       },
//       {
//         path: '/telemedicine',
//         element: <Telemediine/>
//       },
//       {
//         path: '/telemedicine-booking',
//         element: <TelemedicineBooking/>
//       },
//       {
//         path: '/checkout',
//         element: <CheckOut/>
//       },
      
//       {
//         path: '/sign-up',
//         element: <SignUpPage />
//       },
//       {
//         path: '/sign-in',
//         element: <LoginPage />
//       }
//     ]
//   },
//   {
//     path: '/user',
//     element: <Dash/>
//   },
//   {
//     path: '/dashboard',
//     element: <PrivateRoute><Dashboard/></PrivateRoute>,
//     children: [
//       {
//         path: '/dashboard/medicines',
//         element: <Medicines/>
//       },
//       {
//         path: '/dashboard/advertise',
//         element: <Advertise/>
//       },
//       {
//         path: '/dashboard/category',
//         element: <Category/>
//       },
//       {
//         path: '/dashboard/doctors',
//         element: <DoctorManagement/>
//       },
//       {
//         path: '/dashboard/user-query',
//         element: <Question/>
//       },
//       {
//         path: '/dashboard/patient-appointment',
//         element: <Appointment/>
//       },
//       {
//         path: '/dashboard/alluser',
//         element: <AllUser/>
//       },
//       {
//         path: '/dashboard/payments',
//         element: <AdminPayment/>
//       },
//       {
//         path: '/dashboard/appointment-management',
//         element: <AppointmentManagement/>
//       },
//       {
//         path: '/dashboard/appointment/doctor',
//         element: <AppointmentDoctor/>
//       },
//       {
//         path: '/dashboard/all-message',
//         element: <AdminMessage/>
//       },
//       {
//         path: '/dashboard/user-message',
//         element: <Usersmessage/>
//       },
//       {
//         path: '/dashboard/membership',
//         element: <AdminMemberShip/>
//       },
//       {
//         path: '/dashboard/order-history',
//         element: <AdminOrderHistory/>
//       },
//       {
//         path: '/dashboard/user-profile',
//         element: <UserProfile/>
//       },
//       {
//         path: '/dashboard/user-order',
//         element: <UserOrder/>
//       },
//     ]
//   },
//   {
//     path: '/facebook',
//     element: <App/>

//   },
//   {
//     path: '/pay',
//     element: <Pay/>
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
