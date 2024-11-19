import React, { useState } from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Appointment from "./routes/Appointment";
import Appointments from "./routes/Appointments";
import CreateAppointment from "./routes/CreateAppointment";
import Equipment from "./routes/Equipment";
import ErrorPage from "./routes/ErrorPage";
import InsuranceCarrier from "./routes/InsuranceCarrier";
import InsuranceCarriers from "./routes/InsuranceCarriers";
import LabOrder from "./routes/LabOrder";
import Login from "./routes/Login";
import Patient from "./routes/Patient";
import Patients from "./routes/Patients";
import Practitioner from "./routes/Practitioner";
import Practitioners from "./routes/Practitioners";
import Register from "./routes/Register";
import SingleEquipment from "./routes/SingleEquipment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/", element: <Practitioners /> },
      { path: "/appointments", element: <Appointments /> },
      { path: "/equipment", element: <Equipment /> },
      { path: "/equipment/:id", element: <SingleEquipment /> },
      { path: "/appointments/:id", element: <Appointment /> },
      { path: "/patients", element: <Patients /> },
      { path: "/patients/:id", element: <Patient /> },
      { path: "/orders", element: <LabOrder /> },
      { path: "/insuranceCarriers", element: <InsuranceCarriers /> },
      { path: "/insuranceCarriers/:id", element: <InsuranceCarrier /> },
      { path: "/practitioners/:id", element: <Practitioner /> },
      { path: "/createAppointment", element: <CreateAppointment /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state globally

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/logout", { method: "POST", credentials: "include"});
      setIsLoggedIn(false);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <header>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </header>
      <main>
        <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
      </main>
    </div>
  );
}
