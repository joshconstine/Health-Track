
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
            <ul>
                {patients.map((patient) => {
                    return  <div key={patient.id}>
                        <h3>
                            <Link to={`/patients/${patient.id}`}>
                            {patient.first_name} {patient.last_name}
                            </Link>
                            </h3>
                        <p>{patient.email}</p>
                        <p>{patient.phone_number}</p>
                        <p>{patient.address}</p>
                        <p>{patient.date_of_birth}</p>
                        <p>{patient.created_at}</p>
                    </div>

                                   })}
            </ul>
            <MedicalEncounters />
        </div>
    );
}

export default Patients;