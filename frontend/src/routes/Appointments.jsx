import React, { useEffect, useState } from "react";
import AppointmentTable from "../components/AppointmentTable";
import { Link } from "react-router-dom";
import './Appointments.css';
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
            <div className="TopContainer">

                <h1>Appointments</h1>
                <div>
                <button >
                    <Link to='/createAppointment'>Create Appointment</Link>
                    </button>
                </div>
            </div>
            <AppointmentTable appointments={appointments} />
        </div>
    )
}

export default Appointments