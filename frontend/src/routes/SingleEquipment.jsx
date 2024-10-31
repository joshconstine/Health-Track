import React from 'react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SingleEquipment.css';

const SingleEquipment = () => {
  const params = useParams();
  const id = params.id;
  const [equipmentData, setEquipmentData] = useState({});
  const [equipmentMaintenance, setEquipmentMaintenance] = useState([]);
  const fetchEquipment = async (id) => {
    const response = await fetch(`http://localhost:4000/equipment/${id}`);
    const data = await response.json();
    setEquipmentData(data);
    const response2 = await fetch(
      `http://localhost:4000/equipment/${id}/maintenance`
    );
    const data2 = await response2.json();
    setEquipmentMaintenance(data2);
  };
  useEffect(() => {
    fetchEquipment(id);
  }, []);

  console.log(equipmentMaintenance.length);
  return (
    <div className='EquipmentContainer'>
      <div className='EquipmentBody'>
        <h1>Equipment {equipmentData.id}</h1>
        <p>name: {equipmentData.name}</p>
        <p>description: {equipmentData.description}</p>
        <p>owned_leased: {equipmentData.owned_leased}</p>
        {equipmentData.owned_leased === 'Owned' ? (
          <>
            <p>date_purchased: {equipmentData.date_purchased}</p>
            <p>warranty_expiration: {equipmentData.warranty_expiration}</p>
            <p>warranty_description: {equipmentData.warranty_description}</p>
          </>
        ) : (
          <>
            <p>lease_start: {equipmentData.lease_start}</p>
            <p>lease_end: {equipmentData.lease_end}</p>
            <p>leased_from: {equipmentData.leased_from}</p>
            <p>lease_description: {equipmentData.lease_description}</p>
          </>
        )}

        <p>status: {equipmentData.status}</p>
      </div>
      {equipmentMaintenance.length > 0 ? (
        <div>
          <h2 align='center'>Maintenance</h2>
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Description</th>
                <th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              {equipmentMaintenance.map((maintenance) => (
                <tr key={maintenance.id}>
                  <td>{maintenance.name}</td>
                  <td>{maintenance.description}</td>
                  <td>{maintenance.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleEquipment;
