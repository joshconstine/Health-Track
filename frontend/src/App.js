import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Appointment from "./routes/Appointment";
import Patients from "./routes/Patients";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/appointments">
            < Appointment />
          </Route>
          <Route path="/patients">
            <Patients />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


