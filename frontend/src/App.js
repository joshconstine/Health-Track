import React, { useEffect, useState } from 'react';
import './App.css';

import Appointment from './components/Appointment';

function App() {

  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    try {

    const res = await fetch("http://localhost:4000/patients");

    const data = await res.json();
            setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">

      <div>
        {patients.map((patient) => (
          <div key={patient.id}>
            <h1>{patient.name}</h1>
            <p>{patient.employee_id}</p>
          </div>
        ))}

      </div>
      <div>
        <Appointment />
      </div>
    </div>
  );
}

export default App;
