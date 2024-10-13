import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateAppointment = () => {
    const [practitionerOptions, setPractitionerOptions] = useState([]); 
    const [patientOptions, setPatientOptions] = useState([]);
    const [appointmentTypeOptions, setAppointmentTypeOptions] = useState([]);
    const [createdAppointmentID, setCreatedAppointmentID] = useState('');
   
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [practitionerId, setPractitionerId] = useState('');
    const [patientId, setPatientId] = useState('');
    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/practitioners');
        const data = await response.json();
        setPractitionerOptions(data);
        const response2 = await fetch('http://localhost:4000/patients');
        const data2 = await response2.json();
        setPatientOptions(data2);
        const response3 = await fetch('http://localhost:4000/appointmentTypes');
        const data3 = await response3.json();
        setAppointmentTypeOptions(data3);
    }
        
    useEffect(() => {
        fetchData();
    }
    , []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                appointment_date: appointmentDate,
                appointment_type_id: appointmentType,
                practitioner_id: practitionerId,
                patient_id: patientId,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setCreatedAppointmentID(data.appointment_id);
        } else {
            alert('Appointment Creation Failed');
        }
    }
    return (



        <div>
            <h1>CreateAppointment</h1>
            <form onSubmit={handleSubmit}>
                <label for="appointmentDate">Appointment Date</label>
                <input required type="datetime-local" id="appointmentDate" name="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                <label for="appointmentType">Appointment Type</label>
                <select required id="appointmentType" name="appointmentType" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)}>
                    <option value="">Select Appointment Type</option>
                    {appointmentTypeOptions.map((appointmentType) => (
                        <option value={appointmentType.id}>{appointmentType.name}</option>
                    ))}
                </select>
                <label for="practitionerId">Practitioner</label>
                <select id="practitionerId" required name="practitionerId" value={practitionerId} onChange={(e) => setPractitionerId(e.target.value)}>
                    <option value="">Select Practitioner</option>
                    {practitionerOptions.map((practitioner) => (
                        <option value={practitioner.id}>{practitioner.name}</option>
                    ))}
                </select>
                <label for="patientId">Patient</label>
                <select id="patientId" name="patientId" required value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                    <option value="">Select Patient</option>
                    {patientOptions.map((patient) => (
                        <option value={patient.id}>{patient.name}</option>
                    ))}
                </select>
                <button type="submit">Create Appointment</button>
            </form>

            {createdAppointmentID && <div><Link to={`/appointments/${createdAppointmentID}`}>
            Appointment Created Successfully with ID: {createdAppointmentID}</Link></div>}
        </div>
    );
}

export default CreateAppointment;