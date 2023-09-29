import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from './components/root/Root';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import HeroRegister from './components/heroRegister/HeroRegister';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      },
      {
        path: "/heroRegister",
        element: <HeroRegister/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
