import React , {useState, useEffect} from "react";

const Appointment = () => {

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
                        <h3>Patient ID: {appointment.patient_id}</h3>
                            <p>Date: {appointment.date}</p>
                            <p>Time: {appointment.time}</p>
                            <p>Reason: {appointment.reason}</p>
                            <p>Created At: {appointment.created_at}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Appointment