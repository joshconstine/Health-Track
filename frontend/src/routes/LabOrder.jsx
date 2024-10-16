import React, {useState} from "react";
import { Link } from "react-router-dom";

const LabOrder = () => {
    const [labOrders, setLabOrders] = React.useState([]);
    //List of practitioners
    const [practitionerOptions, setPractitionerOptions] = useState([]); 
    //selected practitioner
    const [practitionerId, setPractitionerId] = useState('');
    

    const fetchLabOrders = async () => {
        const response = await fetch("http://localhost:4000/labOrders");
        const data = await response.json();
        setLabOrders(data); 
        const response2 = await fetch('http://localhost:4000/practitioners');
        const data2 = await response2.json();
        setPractitionerOptions(data2);
    }

    React.useEffect(() => {
        fetchLabOrders();
    }, []);
    // {
    //     "ID": 1,
    //     "name": "tb test",
    //     "patient_id": 1,
    //     "ordered_by_physician_id": 1,
    //     "appointment_id": 1,
    //     "lab_technician_id": 1,
    //     "measured_value": "12.50",
    //     "date_taken": "2023-01-05T00:00:00.000Z",
    //     "patient_name": "Alice Johnson",
    //     "practitioner_name": "John Doe"
    // },
    return (
        <div>
            <h1>Lab order tracker</h1>
                <label htmlFor="practitionerId">Practitioner</label>
                <select id="practitionerId" required name="practitionerId" value={practitionerId} onChange={(e) => setPractitionerId(e.target.value)}>
                    <option value="">Select Practitioner</option>
                    {practitionerOptions.map((practitioner) => (
                        <option value={practitioner.id} key={practitioner.id}>{practitioner.name}</option>
                    ))}
                </select>
            <table>
                <thead>
                    <tr>
                        <td>Lab Order ID</td>
                        <td>Lab Order Name</td>
                        <td>Patient</td>
                        <td>Physician Name</td>
                    </tr>
                </thead>
                <tbody>
                    {labOrders.map((labOrder) => (
                        <tr key={labOrder.ID}>
                            <td>{labOrder.ID}</td>
                            <td>{labOrder.name}</td>
                            <td>
                                <Link to={`/patients/${labOrder.patient_id}`}>
                                    {labOrder.patient_name}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/practitioners/${labOrder.ordered_by_physician_id}`}>
                                    {labOrder.practitioner_name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LabOrder