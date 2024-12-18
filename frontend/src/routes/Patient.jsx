

import React from 'react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Appointment.css';
import { bg } from 'date-fns/locale';
const Patient = () => {
  const params = useParams();
  const id = params.id;

  const [patient, setPatient] = useState({});
  const [medicalEncounters, setMedicalEncounters] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPatient = async (id) => {
    const response = await fetch(`http://localhost:4000/patients/${id}`);
    const data = await response.json();
    setPatient(data);
    const response2 = await fetch(`http://localhost:4000/patients/${id}/medicalEncounters`);
    const data2 = await response2.json();
    setMedicalEncounters(data2);
    const response3 = await fetch(`http://localhost:4000/patients/${id}/prescriptions`);
    const data3 = await response3.json();
    setPrescriptions(data3);
  };

  useEffect(() => {
    fetchPatient(id);
  }, [])
  const downloadUserData = async () => {
    const response = await fetch(`http://localhost:4000/patients/${id}?dataType=csv`);
    
    // Get the response as text (CSV format)
    const data = await response.text();
  
    // Create a Blob with the CSV data
    const element = document.createElement('a');
    const file = new Blob([data], { type: 'text/csv' });  // Use 'text/csv' for CSV files
    element.href = URL.createObjectURL(file);
    
    // Set the download attribute with the filename
    element.download = `patient_${id}.csv`;
    
    // Append the element to the body, trigger the click event, and remove it
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);  // Clean up by removing the element after download
  }
  
  return (
    <div className='AppointmentContainer'>
    <div className='AppointmentBody'>
      <div className='AppointmentDetail'>
        <h1>Patient {patient.id}</h1>
        <button onClick={downloadUserData} 
           style={{
            backgroundColor: '#3b82f6', // blue-500
            color: 'white',
            fontWeight: '600', // semi-bold
            padding: '0.5rem 1rem', // py-2 px-4
            borderRadius: '0.5rem', // rounded-lg
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
        >export data</button>
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
      <h2>Prescriptions</h2>
      <table>
        <thead>
          <tr>
            <th>Prescription ID</th>
            <th>Name</th>
            <th>Dosage</th>
            <th>Usage Frequency</th>
            <th>Refill Frequency</th>
            <th>Date Filled</th>
            <th>Filled By</th>
          </tr>

        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.id}</td>
              <td>{prescription.name}</td>
              <td>{prescription.dosage}</td>
              <td>{prescription.usage_frequency}</td>
              <td>{prescription.refill_frequency}</td>
              <td>{prescription.date_filled}</td>
              <td>
                {prescription.filled_by}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
       
      <h2>Medical Encounters</h2>
      <table>
        <thead>
          <tr>
            <th>Medical Encounter ID</th>
            <th>Practitioner Seen</th>
            <th>Patient Complaint</th>
            <th>Vital Signs</th>
            <th>Practitioner Notes</th>
            <th>Referral</th>
            <th>Recommended Follow Up</th>
            <th>Diagnosis</th>
            <th>Date Taken</th>
          </tr>
        </thead>
        <tbody>
          {medicalEncounters.map((medicalEncounter) => (
            <tr key={medicalEncounter.id}>
              <td>{medicalEncounter.id}</td>
              <td>
                <Link to={`/practitioners/${medicalEncounter.practitioner_seen_id}`}>
                  {medicalEncounter.practitioner_name}
                </Link>
              </td>
              <td>{medicalEncounter.patient_complaint}</td>
              <td>{medicalEncounter.vital_signs}</td>
              <td>{medicalEncounter.practitioner_notes}</td>
              <td>{medicalEncounter.referral}</td>
              <td>{medicalEncounter.recommended_follow_up}</td>
              <td>{medicalEncounter.diagnosis}</td>
              <td>{medicalEncounter.date_taken}</td>
            </tr>
          ))}
        </tbody>

    </table>  
    </div>
  );
};

export default Patient;
