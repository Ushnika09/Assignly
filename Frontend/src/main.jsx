import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Landing from './pages/Landing.jsx'
import Dsahboard from './pages/Dsahboard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

const appRoutes=createBrowserRouter(
  [
    {
    element:<App/>,
    path:"/",
    children:[
      {
        element:<Landing/>,
        path:"/"
      },
      {
        element:<Dsahboard/>,
        path:"/dashboard"
      },
      {
        element:<Login/>,
        path:"/login"
      },
      {
        element:<Signup/>,
        path:"/signup"
      },
    ]
  }
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRoutes}/>
)
