import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
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
// import { AuthProvider } from './assets/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
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
