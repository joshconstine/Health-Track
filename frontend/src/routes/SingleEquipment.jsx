import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleEquipment = () => {
  const params = useParams();
  const id = params.id;
  //   {
  //     "id": 1,
  //     "name": "xray_machine",
  //     "description": "Machine for taking X-rays",
  //     "owned_leased": "Owned",
  //     "status": "under maintenance",
  //     "equipment_id": 1,
  //     "lease_start": null,
  //     "lease_end": null,
  //     "leased_from": null,
  //     "lease_description": null,
  //     "date_purchased": "2020-01-01T08:00:00.000Z",
  //     "warranty_expiration": "2025-01-01T08:00:00.000Z",
  //     "warranty_description": "5-year warranty on parts"
  // }
  const [equipmentData, setEquipmentData] = useState({});
  //   [
  //     {
  //         "id": 1,
  //         "name": "calibration_issue",
  //         "description": "Requires recalibration",
  //         "resolution": "Repaired mechanical failure in X-Ray Machine"
  //     }
  // ]
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
  return (
    <div>
      <h1>Equipment {equipmentData.id}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <span>name: {equipmentData.name}</span>
        <span>description: {equipmentData.description}</span>
        <span>owned_leased: {equipmentData.owned_leased}</span>
        {equipmentData.owned_leased === "Owned" ? (
          <>
            <span>date_purchased: {equipmentData.date_purchased}</span>
            <span>
              warranty_expiration: {equipmentData.warranty_expiration}
            </span>
            <span>
              warranty_description: {equipmentData.warranty_description}
            </span>
          </>
        ) : (
          <>
            <span>lease_start: {equipmentData.lease_start}</span>
            <span>lease_end: {equipmentData.lease_end}</span>
            <span>leased_from: {equipmentData.leased_from}</span>
            <span>lease_description: {equipmentData.lease_description}</span>
          </>
        )}

        <span>status: {equipmentData.status}</span>
      </div>
      <ul>
        <h2>Maintenance</h2>
        {equipmentMaintenance.map((maintenance) => (
          <li
            key={maintenance.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span>name: {maintenance.name}</span>
            <span>description: {maintenance.description}</span>
            <span>resolution: {maintenance.resolution}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleEquipment;
