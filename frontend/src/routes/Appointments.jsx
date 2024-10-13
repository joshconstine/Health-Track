import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <table>
                <thead>
                    <tr>
                        <th>Appointment Id</th>
                        <th>Patient</th>
                        <th>Practitioner</th>
                        <th>Appointment Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>
                            <Link to={`/appointments/${appointment.id}`}>
                                {appointment.id}
                        </Link>
                                </td>
                            <td>
                                <Link to={`/patients/${appointment.patient_id}`}>
                                {appointment.patient_name}
                                </Link>
                                </td>
                            <td>
                                <Link to={`/practitioners/${appointment.practitioner_id}`}>
                                {appointment.practitioner_name}
                                </Link>
                                </td>
                            <td>{appointment.appointment_date}</td>
                            <td>{appointment.name}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default Appointments