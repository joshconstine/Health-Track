import React, { useEffect } from "react";
import Appointment from "../routes/Appointment";



const AppointmentActions = ({AppointmentID}) => {
        // {
        //     "id": 1,
        //     "name": "xray",
        //     "cost": "100.00"
        // },
        // {
        //     "id": 2,
        //     "name": "ultrasound",
        //     "cost": "150.00"
        // },
const [billableServices, setBillableServices] = React.useState([]);
// {
//     "id": 1,
//     "name": "tb test",
//     "description": "Test for tuberculosis",
//     "lower_bound": "0.00",
//     "upper_bound": "10.00"
// },
const [labOrderTypes, setLabOrderTypes] = React.useState([]);  
const [formState, setFormState] = React.useState("");


const fetchBillableServices = async () => {
    const response = await fetch(`http://localhost:4000/billableServices`);
    const data = await response.json();
    setBillableServices(data);
}
const fetchLabOrderTypes = async () => {
    const response = await fetch(`http://localhost:4000/labTestTypes`);
    const data = await response.json();
    setLabOrderTypes(data);
}
useEffect(() => {
    fetchBillableServices();
    fetchLabOrderTypes();
}, []);

const setFormStateAction = (formState) => {
    setFormState(formState);
}
    return(
        <div>
            <button
                onClick={() => setFormStateAction("billableService")}
            >Add billable service</button>
            <button
                onClick={() => setFormStateAction("labOrder")}  
            >Order Lab</button>

            {formState === "billableService" && (
                <div>
                    <h2>Billable Services</h2>
                    <ul>
                        {billableServices.map((service) => (
                            <li key={service.id}>
                                {service.name} - {service.cost}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {formState === "labOrder" && (
                <div>
                    <h2>Lab Order Types</h2>
                    <ul>
                        {labOrderTypes.map((labOrder) => (
                            <li key={labOrder.id}>
                                {labOrder.name} - {labOrder.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default AppointmentActions;