import React from "react";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Appointment = () =>{
    const params = useParams();
    const id = params.id;

    const [appointment, setAppointment] = useState({});

    const fetchAppointment = async (id) => {
        const response = await fetch(`http://localhost:4000/appointments/${id}`);
        const data = await response.json();
        setAppointment(data);
    }

    useEffect(() => {
        fetchAppointment(id);
    }, []);
    return(
        <div>
            <h1>Appointment</h1>
            <p>{appointment.first_name}</p>
            <p>{appointment.id}</p>
        </div>
    )
}

export default Appointment;