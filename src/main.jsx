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
import RoomDetails from './Componenets/Rooms/RoomDetails ';
import DoReview from './Componenets/Review/DoReview';
import AboutUs from './Componenets/About us/Aboutus';



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
        element:<Room></Room>,
        loader: ()=> fetch('https://pearl-ashore-server.vercel.app/rooms')
      },
      {
        path:"/rooms/:id",
        element:<RoomDetails></RoomDetails>,
        loader: ({params}) => fetch(`https://pearl-ashore-server.vercel.app/rooms/${params.id}`)
        
      },
      {
        path:"/mybookings",
        element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
        
      },
      {
        path:"/reviews/:id",
        element:<PrivateRoute><DoReview></DoReview></PrivateRoute>,
        loader: ({params}) => fetch(`https://pearl-ashore-server.vercel.app/bookings/${params.id}`)
      },
      {
        path:"/aboutus",
        element:<AboutUs></AboutUs>,
        
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
