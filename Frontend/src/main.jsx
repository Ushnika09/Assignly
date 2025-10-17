import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Agent from './pages/Agent.jsx';
import Upload from './pages/Upload.jsx';
import Report from './pages/Report.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from "./pages/Dashboard.jsx"
import { UserProvider } from './context/UserContext.jsx';
import App from './App.jsx';
import Home from "./pages/Home.jsx";
import { AgentsProvider } from "./context/AgentContext.jsx";


const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { 
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
          { index:true, element: <Home/>},
          { path: "agent", element: <Agent /> },
          { path: "upload", element: <Upload /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AgentsProvider>

      <UserProvider>
    <RouterProvider router={appRoutes} />
  </UserProvider>
  </AgentsProvider>
);
