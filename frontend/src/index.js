import React from "react";
import Appointment from "./routes/Appointment";
import Patients from "./routes/Patients";
import LabOrder from "./routes/LabOrder"
import Dashboard from './routes/Dashboard';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/appointments",
        element: <Appointment />
      },

      {
        path: "/patients",
        element: <Patients />
      },
      {
        path: '/orders',
        element: <LabOrder />

      }
    ],
  },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



function Layout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main id="detail">
        <Outlet />
      </main>
    </div>
  );
}
