import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Landing from './pages/Landing.jsx'
import Dsahboard from './pages/Dsahboard.jsx'

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
    ]
  }
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRoutes}/>
)
