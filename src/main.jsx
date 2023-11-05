import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Componenets/Root/Root';
import Home from './Componenets/Home/Home';
import Login from './Componenets/Login/Login';
import Register from './Componenets/Register/Register';

import AuthProvider from './Providers/AuthProvider';

import Error from './Componenets/Error/Error';
import Room from './Componenets/Rooms/Room';
import MyBookings from './Componenets/MyBookings/MyBookings';
import PrivateRoute from './PrivateRoute/PrivateRoute';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error></Error>,
    children: [
      {
        path:"/",
        element:<Home></Home>
      },     
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/rooms",
        element:<Room></Room>
      },
      {
        path:"/mybookings",
        element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>
      },
      
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)