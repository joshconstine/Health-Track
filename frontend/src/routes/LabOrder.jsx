import React, { useState } from "react";
import { Link } from "react-router-dom";

const LabOrder = () => {
  const [labOrders, setLabOrders] = React.useState([]);
  //List of practitioners
  const [practitionerOptions, setPractitionerOptions] = useState([]);
  //selected practitioner
  const [selectedPractitionerId, setSelectedPractitionerId] = useState("");

  //List of patients
  const [patientOptions, setPatientOptions] = useState([]);
  //selected patient
  const [selectedPatientId, setSelectedPatientId] = useState("");

  //selected ordered date
  const [selectedOrderDate, setSelectedOrderDate] = useState("");

  //selected taken date
  const [selectedTakenDate, setSelectedTakenDate] = useState("");

  const fetchInitialData = async () => {
    const response = await fetch("http://localhost:4000/labOrders");
    const data = await response.json();
    setLabOrders(data);
    const response2 = await fetch("http://localhost:4000/practitioners");
    const data2 = await response2.json();
    setPractitionerOptions(data2);
    const response3 = await fetch("http://localhost:4000/patients");
    const data3 = await response3.json();
    setPatientOptions(data3);
  };

  // Build query parameters dynamically based on selected filters
  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (selectedPractitionerId)
      params.append("practitioner_id", selectedPractitionerId);
    if (selectedPatientId) params.append("patient_id", selectedPatientId);
    if (selectedOrderDate) params.append("date_ordered", selectedOrderDate);
    if (selectedTakenDate) params.append("date_taken", selectedTakenDate);

    return params.toString() ? `?${params.toString()}` : "";
  };
  // Fetch lab orders based on selected filters
  const fetchLabOrders = async () => {
    const queryParams = buildQueryParams();

    try {
      const response = await fetch(
        `http://localhost:4000/labOrders${queryParams}`
      );
      const data = await response.json();
      setLabOrders(data);
    } catch (error) {
      console.error("Error fetching lab orders:", error);
    }
  };

  React.useEffect(() => {
    fetchInitialData();
  }, []);

  React.useEffect(() => {
    fetchLabOrders();
  }, [
    selectedPractitionerId,
    selectedPatientId,
    selectedOrderDate,
    selectedTakenDate,
  ]);

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

  const handleResetClick = (e) => {
    e.preventDefault();
    setSelectedPractitionerId("");
    setSelectedPatientId("");
    setSelectedOrderDate("");
    setSelectedTakenDate("");
    fetchLabOrders();
    console.log(
      "just reset the selected practitioner value and will refetch all "
    );
  };

  return (
    <div>
      <h1>Lab order tracker</h1>
      <label htmlFor="practitionerId">Practitioner</label>
      <select
        id="practitionerId"
        required
        name="practitionerId"
        value={selectedPractitionerId}
        onChange={(e) => setSelectedPractitionerId(e.target.value)}
      >
        <option value="">Select Practitioner</option>
        {practitionerOptions.map((practitioner) => (
          <option value={practitioner.id} key={practitioner.id}>
            {practitioner.name}
          </option>
        ))}
      </select>

      <label htmlFor="patientId">Patient</label>
      <select
        id="patientId"
        required
        name="patientId"
        value={selectedPatientId}
        onChange={(e) => setSelectedPatientId(e.target.value)}
      >
        <option value="">Select Patient</option>
        {patientOptions.map((patient) => (
          <option value={patient.id} key={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>
      <label>Date Ordered</label>
      <input
        type="date"
        onChange={(e) => setSelectedOrderDate(e.target.value)}
        value={selectedOrderDate}
      />
      <label>Date Taken</label>
      <input
        type="date"
        onChange={(e) => setSelectedTakenDate(e.target.value)}
        value={selectedTakenDate}
      />

      <button onClick={handleResetClick}>reset</button>
      <table>
        <thead>
          <tr>
            <th>Lab Order ID</th>
            <th>Patient Name</th>
            <th>Physician Name</th>
            <th>Lab Order Name</th>
            <th>Lab Order Date</th>
            <th>Lab Taken Date</th>
            <th>Lab Technician</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {labOrders.map((labOrder) => (
            <tr key={labOrder.ID}>
              <td>{labOrder.ID}</td>
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
              <td>{labOrder.name}</td>
              <td>{labOrder.date_ordered}</td>
              <td>{labOrder.date_taken}</td>
              <td>
                <Link to={`/practitioners/${labOrder.lab_technician_id}`}>
                  {labOrder.technician_name}
                </Link>
              </td>
              <td>{labOrder.measured_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabOrder;
