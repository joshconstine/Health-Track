import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppointmentTable from "../components/AppointmentTable";
const Appointments = () => {

    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:4000/appointments');
        const data = await response.json();
        setAppointments(data);
    }

    useEffect(() => {
        fetchAppointments();
    }, []);
    return (
        <div>
            <h1>Appointments</h1>
            <AppointmentTable appointments={appointments} />
        </div>
    )
}

export default Appointments