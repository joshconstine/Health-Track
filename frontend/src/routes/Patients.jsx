
import React , {useState, useEffect} from "react";
import MedicalEncounters from "../components/MedicalEncounters";

import { Link } from 'react-router-dom';
const Patients = () => {

    const [patients, setPatients] = useState([]);

    const fetchPatients = async () => {
        const response = await fetch('http://localhost:4000/patients');
        const data = await response.json();
        setPatients(data);
    }

    useEffect(() => {
        fetchPatients();
    }, []);
   
    return (
        <div>
            <h1>Patients</h1>
           
            <table>
                <thead>
                    <tr>
                        <th>Patient Id</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Date of Birth</th>
                        <th>Primary Care Physician</th>
                        <th>Insurance Carrier</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>
                                <Link to={`/patients/${patient.id}`}>
                                    {patient.id}
                                </Link>
                            </td>
                            <td>{patient.name}</td>
                            <td>{patient.phone_number}</td>
                            <td>{patient.address}</td>
                            <td>{patient.date_of_birth}</td>
                            <td>
                                <Link to={`/practitioners/${patient.primary_care_physician_id}`}>
                                    {patient.primary_care_physician}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/insuranceCarriers/${patient.insurance_carrier_id}`}>
                                    {patient.insurance_carrier}
                                </Link>
                            </td>
                            <td>
                                {patient.gender}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <MedicalEncounters />
        </div>
    );
}

export default Patients;