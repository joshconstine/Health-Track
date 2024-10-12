import React , {useState, useEffect} from "react";
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
            <ul>
                {appointments.map((appointment) => (
                    <div key={appointment.id}>  {/* Ensure you're using a unique key for each item */}
                        <h3>Patient ID: {appointment.first_name}</h3>
                        <Link
                            to={`/appointments/${appointment.id}`}
                        >{appointment.id}</Link>
                            <p>Date: {appointment.appointment_date}</p>
                            <p>Date: {appointment.appointment_date}</p>
                            <p>Time: {appointment.appointment_time}</p>
                            <p>Reason: {appointment.name}</p>
                            <p>Created At: {appointment.created_at}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Appointments