import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import AddService from "../Pages/AddService/AddService";
import AllServices from "../Pages/AllServices/AllServices";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import MyServices from "../Pages/MyServices/MyServices";
import UpdateService from "../Pages/UpdateService/UpdateService";
import MyBookings from "../Pages/MyBookings/MyBookings";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

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
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "/service-details/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails></ServiceDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },

      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },

      {
        path: "/update-service/:id",
        element: (
          <PrivateRoute>
            <UpdateService></UpdateService>
          </PrivateRoute>
        ),
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
]);
