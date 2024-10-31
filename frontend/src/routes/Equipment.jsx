import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
const Equipment = () => {
  const [equipment, setEquipment] = useState([]);

  const fetchEquipment = async () => {
    const response = await fetch("http://localhost:4000/equipment");
    const data = await response.json();
    setEquipment(data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div>
      <h1>Equipment Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Equipment Id</th>
            <th>Type</th>
            <th>Description</th>
            <th>Ownnership</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((equipment) => (
            <tr key={equipment.id}>
              <td>
                <Link to={`/equipment/${equipment.id}`}>{equipment.id}</Link>
              </td>
              <td>{equipment.name}</td>
              <td>{equipment.description}</td>
              <td>{equipment.owned_leased}</td>
              <td>{equipment.department}</td>
              <td>{equipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Equipment;
