import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import AllServices from "../Pages/AllServices/AllServices";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import UpdateService from "../Pages/UpdateService/UpdateService";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layout/DashboardLayout";
import MyServices from "../Pages/MyServices/MyServices";
import MyBookings from "../Pages/MyBookings/MyBookings";
import AddService from "../Pages/AddService/AddService";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('https://home-hero-server-sigma.vercel.app/services')
      },
      {
        path: "/all-services",
        element: <AllServices></AllServices>,
        loader: () => fetch('https://home-hero-server-sigma.vercel.app/services')
      },
      {
        path: "/contact",
        element: <Contact />
      },

      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      // {
      //   path: "/add-service",
      //   element: <PrivateRoute><AddService></AddService></PrivateRoute>
      // },
      {
        path: "/service-details/:id",
        element: <PrivateRoute> <ServiceDetails></ServiceDetails></PrivateRoute>
      },

      {
        path: "/update-service/:id",
        element: <PrivateRoute> <UpdateService></UpdateService></PrivateRoute>,
        loader: ({ params }) => fetch(`https://home-hero-server-sigma.vercel.app/services/${params.id}`)
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'dashboard-home',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: 'add-service',
        element: <AddService></AddService>
      },
      {
        path: 'my-services',
        element: <MyServices></MyServices>
      },
      {
        path: 'my-bookings',
        element: <MyBookings></MyBookings>
      },
    ]
  },
]);
