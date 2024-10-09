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
                        <span>{medicalEncounter.id} </span>
                        <span>{medicalEncounter.first_name} </span>
                    </div>

                                   })}

      </ul>
  );
};

export default MedicalEncounters;