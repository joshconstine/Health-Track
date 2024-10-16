
import React from 'react';
import AppointmentTable from '../components/AppointmentTable';
import '../index.css'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Appointment.css';
const Practitioner = () => {
  const params = useParams();
  const id = params.id;

  const [practitioner, setPractitioner] = useState({});
  const [appointments, setAppointments] = useState([]);

  const fetchPractitioner = async (id) => {
    const response = await fetch(`http://localhost:4000/practitioners/${id}`);
    const data = await response.json();
    setPractitioner(data);
    const response2 = await fetch(`http://localhost:4000/practitioners/${id}/appointments`);
    const data2 = await response2.json();
    setAppointments(data2);
  };

  useEffect(() => {
    fetchPractitioner(id);
  }, []);

  return (
    <div className='AppointmentContainer'>
    <div className='AppointmentBody'>
      <div className='AppointmentDetail'>
        <h1>Practitioner {practitioner.id}</h1>
            <p>{practitioner.name}</p>
            <p>Phone: {practitioner.phone_number}</p>
            <p>Pager: {practitioner.pager_number}</p>
            <p>Type: {practitioner.practitioner_type}</p>
            <p>Full Time: {practitioner.full_time}</p>
            <p>Monday: {practitioner.monday}</p>
            <p>Tuesday: {practitioner.tuesday}</p>
            <p>Wednesday: {practitioner.wednesday}</p>
            <p>Thursday: {practitioner.thursday}</p>
            <p>Friday: {practitioner.friday}</p>
            <p>Saturday: {practitioner.saturday}</p>
            <p>Sunday: {practitioner.sunday}</p>
        </div>
    </div>
      <AppointmentTable appointments={appointments} />
    </div>
  );
};

export default Practitioner;
