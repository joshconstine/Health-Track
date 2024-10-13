
import React from 'react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Appointment.css';
const Practitioner = () => {
  const params = useParams();
  const id = params.id;

  const [practitioner, setPractitioner] = useState({});

  const fetchPractitioner = async (id) => {
    const response = await fetch(`http://localhost:4000/practitioners/${id}`);
    const data = await response.json();
    setPractitioner(data);
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
          <p>{practitioner.type}</p>
        </div>
    </div>
    </div>
  );
};

export default Practitioner;
