import * as React from "react";
import Appointment from "./routes/Appointment";
import Patients from "./routes/Patients";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
  
    {
      path: "/appointments",
      element: <Appointment />
    },
  
    {
      path: "/patients",
      element: <Patients />
    }
  
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );



function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


