

import React from 'react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Appointment.css';
const Patient = () => {
  const params = useParams();
  const id = params.id;

  const [patient, setPatient] = useState({});

  const fetchPatient = async (id) => {
    const response = await fetch(`http://localhost:4000/patients/${id}`);
    const data = await response.json();
    setPatient(data);
  };

  useEffect(() => {
    fetchPatient(id);
  }, []);
  return (
    <div className='AppointmentContainer'>
    <div className='AppointmentBody'>
      <div className='AppointmentDetail'>
        <h1>Patient {patient.id}</h1>
          <p>{patient.name}</p>
            <p>{patient.phone_number}</p>
            <p>{patient.address}</p>
            <p>{patient.date_of_birth}</p>
            <p>
                <Link to={`/practitioners/${patient.primary_care_physician_id}`}>
                {patient.primary_care_physician}
                </Link>
                </p>
            <p>
                <Link to={`/insuranceCarriers/${patient.insurance_carrier_id}`}>
                {patient.insurance_carrier}
                </Link>
                </p>

        </div>
    </div>
    </div>
  );
};

export default Patient;
