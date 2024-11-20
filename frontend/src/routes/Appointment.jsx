import React from 'react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentActions from '../components/AppointmentActions';
import './Appointment.css';
const Appointment = () => {
  const params = useParams();
  const id = params.id;

  const [appointment, setAppointment] = useState({});
  const [labOrders, setOrders] = useState([]);
  const [billableServices, setSerives] = useState([]);

  const fetchAppointment = async (id) => {
    const response = await fetch(`http://localhost:4000/appointments/${id}`);
    const data = await response.json();
    setAppointment(data);
    const labOrderResponse = await fetch(
      `http://localhost:4000/appointments/${id}/labOrders`
    );
    const labOrderData = await labOrderResponse.json();
    setOrders(labOrderData);
    const billableServicesResponse = await fetch(
      `http://localhost:4000/appointments/${id}/billableServices`
    );
    const billableServicesData = await billableServicesResponse.json();
    setSerives(billableServicesData);
  };

  useEffect(() => {
    fetchAppointment(id);
  }, []);
  return (
    <div className='AppointmentContainer'>
      <AppointmentActions AppointmentID={id} 
      PatientID={appointment.patient_id}
      AppointmentPhysicianID={appointment.practitioner_id}
      Refetch={fetchAppointment}

      />
    <div className='AppointmentBody'>
      <div className='AppointmentDetail'>
        <h1>Appointment {appointment.id}</h1>
          <p>{appointment.first_name}</p>
          <p>{appointment.last_name}</p>
          <p>{appointment.name}</p>
          <p>{appointment.pager_number}</p>
          <p>{appointment.phone_number}</p>
          <p>{appointment.start_time}</p>
          <p>{appointment.end_time}</p>
        </div>
<div className='AppointmentLowerContainer'>
      <ul>
        {labOrders.map((order) => (
          <div key={order.id}>
            {' '}
            {/* Ensure you're using a unique key for each item */}
            <h3>Lab Name: {order.name}</h3>
            <p>Lower Bound: {order.lower_bound}</p>
            <p>Upper Bound: {order.upper_bound}</p>
            <p>Measured Value: {order.measured_value}</p>
            <p>Lab Technician: {order.lab_technician_name}</p>
          </div>
        ))}
      </ul>

      <ul>
        {billableServices.map((service) => (
          <div key={service.invoice_id}>
            {' '}
            {/* Ensure you're using a unique key for each item */}
            <h3>Service Name: {service.description}</h3>
            <p>Service Cost: {service.cost}</p>
          </div>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
};

export default Appointment;
