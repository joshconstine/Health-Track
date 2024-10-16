import React from "react";
import { Link } from "react-router-dom";

const LabOrder = () => {
    const [labOrders, setLabOrders] = React.useState([]);
    // labOrders =[{
    //     id:1 
    // }]
    const fetchLabOrders = async () => {
        const response = await fetch("http://localhost:4000/labOrders");
        const data = await response.json();
        setLabOrders(data);
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
            <table>
                <thead>
                    <tr>
                        <td>Lab Order ID</td>
                        <td>Lab Order Name</td>
                        <td>Patient</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LabOrder