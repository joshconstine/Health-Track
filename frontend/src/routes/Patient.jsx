

import React from 'react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Appointment.css';
const Patient = () => {
  const params = useParams();
  const id = params.id;

  const [patient, setPatient] = useState({});
  const [medicalEncounters, setMedicalEncounters] = useState([]);

  const fetchPatient = async (id) => {
    const response = await fetch(`http://localhost:4000/patients/${id}`);
    const data = await response.json();
    setPatient(data);
    const response2 = await fetch(`http://localhost:4000/patients/${id}/medicalEncounters`);
    const data2 = await response2.json();
    setMedicalEncounters(data2);
  };

  useEffect(() => {
    fetchPatient(id);
  }, [])

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
              Primary Care Provider: <Link to={`/practitioners/${patient.primary_care_physician_id}`}>
                {patient.primary_care_physician}
                </Link>
                </p>
            <p>
               Insurance Provider: <Link to={`/insuranceCarriers/${patient.insurance_carrier_id}`}>
             {patient.insurance_carrier}
                </Link>
                </p>
        </div>
    </div>
    <div className='AppointmentLowerContainer'>
    </div>
        <ul>
            <span>Perscriptions</span>
        </ul>
        <ul>
            <span>Medical Encounters</span>
            {medicalEncounters.map((medicalEncounter) => (
              <div key={medicalEncounter.id}>
               <p>Encounter ID: {medicalEncounter.id}</p>
               <p>Patient: {medicalEncounter.patient_name}</p>
               <p>Practitioner: {medicalEncounter.practitioner_name}</p>
               <p>Referral: {medicalEncounter.referral}</p>
               <br></br>
               
           </div>
            ))}
        </ul>
    </div>
  );
};

export default Patient;
