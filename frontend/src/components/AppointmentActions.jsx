import React, { useEffect } from "react";
import Appointment from "../routes/Appointment";



const AppointmentActions = ({AppointmentID, PatientID, AppointmentPhysicianID, Refetch}) => {
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


// app.post("/labOrders", (req, res) => {
//     const {
//       appointment_id,
//       lab_test_type_id,
//       patient_id,
//       ordered_by_physician_id,
//     } = req.body;
  

const AddLabOrderToAppointment = async (labOrder) => {
    const response = await fetch(`http://localhost:4000/labOrders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            appointment_id: AppointmentID,
            lab_test_type_id: labOrder.id,
            patient_id: PatientID,
            ordered_by_physician_id: AppointmentPhysicianID,
        }),
    });
    const data = await response.json();
    console.log(data);
    Refetch(AppointmentID);
}


const AddBillableServiceToAppointment = async (service) => {
    const response = await fetch(`http://localhost:4000/providedBillableServices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            appointment_id: AppointmentID,
            billable_service_id: service.id,
            patient_id: PatientID,
        }),


    })
    const data = await response.json();
    console.log(data);
    Refetch(AppointmentID);
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
                              <span>
                                  {service.name} - {service.cost}
                                </span>
                                <button
                                    onClick={() => AddBillableServiceToAppointment(service)}
                                >Add</button>
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
                               <span>
                                 {labOrder.name} - {labOrder.description}
                                </span>
                                <button
                                    onClick={() => AddLabOrderToAppointment(labOrder)}
                                >Order</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default AppointmentActions;