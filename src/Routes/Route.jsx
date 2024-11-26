import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import ShopPage from "../Pages/Shop/Shop";
import Analysis from "../Pages/Analysis/Analysis";
import FAQ from "../Pages/FAQ/FAQ";
import HowItWorks from "../Pages/HowItWorks/HowItWorks";
import Service from "../Pages/Service/Service";
import Blog from "../Pages/Blog/Blog";
import PatientHistory from "../Pages/PatientHistory/PatientHistory";
import Doctors from "../Pages/Doctors/Doctors";
import Testimonial from "../Pages/Testimonial/Testimonial";
import AllQuery from "../Pages/All Query/AllQuery";
import ContactUs from "../Pages/ContactUs/ContactUs";
import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import Payment from "../Pages/Payment/Payment";
import PrivecyPolicy from '../Pages/PrivecyPolicy/PrivecyPolicy.jsx';
import TermOfService from "../Pages/TermOfService/TermOfService";
import AppointmentGuidelines from "../Pages/DoctorsAppoinment/AppointmentGuidelines.jsx";
import TelemedicineAppointments from "../Pages/DoctorsAppoinment/TelemedicineAppointments.jsx";
import BookingSystem from "../Pages/DoctorsAppoinment/BookingSystem.jsx";
import MentalHealthAnalysis from "../Pages/HealthAnalysis/MentalHealth";
import Prescription from "../Pages/Prescription/Prescription.jsx";
import MemberShip from "../Pages/MemberShip/MemberShip.jsx";
import Telemediine from "../Pages/TeleMedicine/Telemediine.jsx";
import TelemedicineBooking from "../Pages/Booking/TelemedicineBooking.jsx";
import CheckOut from '../Pages/CheckOut/CheckOut.jsx';
import SignUpPage from "../Pages/Authentications/SignUp.jsx";
import LoginPage from "../Pages/Authentications/SignIn.jsx";
import Dash from "../Components/Dashboard.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import Medicines from "../Pages/Dashboard/Seller/Medicines.jsx";
import Advertise from "../Pages/Dashboard/Seller/Advertise.jsx";
import Category from "../Pages/Dashboard/Seller/Category.jsx";
import DoctorManagement from "../Pages/Dashboard/Admin/DoctorsManagement/DoctorManagement.jsx";
import Question from "../Pages/Dashboard/Admin/Question.jsx";
import Appointment from "../Pages/Appointment/Appointment.jsx";
import AllUser from "../Pages/AllUser/AllUser.jsx";
import AdminPayment from "../Pages/AdminPayment/AdminPayment";
import AppointmentManagement from "../Pages/AppointmentManagement/AppointmentManagement.jsx";
import AppointmentDoctor from "../Pages/AppointmentDoctor/AppointmentDoctor.jsx";
import AdminMessage from "../Pages/AdminMessage/AdminMessage.jsx";
import Usersmessage from "../Pages/UsersMesage/Usersmessage.jsx";
import AdminMembership from "../Pages/AdminMemberShip/AdminMemberShip.jsx";
import AdminOrderHistory from "../Pages/AdminOrderHistory/AdminOrderHistory.jsx";
import UserProfile from "../Pages/UserProfile/UserProfile.jsx";
import UserOrder from "../Pages/UserOrder/UserOrder.jsx";
import App from "../Components/Facebook/App.jsx";
import Pay from "../Components/StripePayment/App.jsx";



export const router = createBrowserRouter([
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
          element: <PrivateRoute><ShopPage/></PrivateRoute>
        },
        {
            path: '/analysis',
            element: <Analysis/>
        },
        {
          path: '/faq',
          element: <FAQ/>
        },
        {
          path: '/how-it-works',
          element: <HowItWorks/>
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
          element: <PrivateRoute><Doctors/></PrivateRoute>
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
          path: '/cart',
          element: <Cart/>
        },
        {
          path: '/payment',
          element: <Payment/>
        },
        {
          path: '/privacy-policy',
          element: <PrivecyPolicy/>
        },
        {
          path: '/term-of-service',
          element: <TermOfService/>
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
      path: '/user',
      element: <Dash/>
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
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
          path: '/dashboard/patient-appointment',
          element: <Appointment/>
        },
        {
          path: '/dashboard/alluser',
          element: <AllUser/>
        },
        {
          path: '/dashboard/payments',
          element: <AdminPayment/>
        },
        {
          path: '/dashboard/appointment-management',
          element: <AppointmentManagement/>
        },
        {
          path: '/dashboard/appointment/doctor',
          element: <AppointmentDoctor/>
        },
        {
          path: '/dashboard/all-message',
          element: <AdminMessage/>
        },
        {
          path: '/dashboard/user-message',
          element: <Usersmessage/>
        },
        {
          path: '/dashboard/membership',
          element: <AdminMembership/>
        },
        {
          path: '/dashboard/order-history',
          element: <AdminOrderHistory/>
        },
        {
          path: '/dashboard/user-profile',
          element: <UserProfile/>
        },
        {
          path: '/dashboard/user-order',
          element: <UserOrder/>
        },
      ]
    },
    {
      path: '/facebook',
      element: <App/>
  
    },
    {
      path: '/pay',
      element: <Pay/>
    }
  ]);