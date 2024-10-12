import React , {useState, useEffect} from "react";
import {

} from "react-router-dom";
const MedicalEncounters = () => {
    const [medicalEncounters, setMedicalEncounters] = useState([]);

    const fetchMedicalEncounters = async () => {
        const response = await fetch('http://localhost:4000/medicalEncounters');
        const data = await response.json();
        setMedicalEncounters(data);
    }

    useEffect(() => {
        fetchMedicalEncounters();
    }, []);
    console.log(medicalEncounters)
  return (
      <ul>
        <h1>Medical Encounters</h1>

        {medicalEncounters.map((medicalEncounter) => {
                    return  <div key={medicalEncounter.id}>
                        <p>Encounter ID: {medicalEncounter.id}</p>
                        <p>Patient: {medicalEncounter.patient_name}</p>
                        <p>Practitioner: {medicalEncounter.practitioner_name}</p>
                        <p>Referral: {medicalEncounter.referral}</p>
                        <br></br>
                        
                    </div>

                                   })}

      </ul>
  );
};

export default MedicalEncounters;