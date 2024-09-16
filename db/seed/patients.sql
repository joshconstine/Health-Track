-- Insert Patients
INSERT INTO patients (id, first_name, last_name, employee_id, insurance_carrier_id, primary_care_physician_id, address, phone_number, email, date_of_birth) VALUES
(1, 'Alice', 'Johnson', 1, 1, 1, '123 Maple St', '555-1234', 'alice.johnson@example.com', '1980-05-10'),
(2, 'Bob', 'Smith', 2, 2, 2, '456 Oak Ave', '555-5678', 'bob.smith@example.com', '1975-09-15'),
(3, 'Carol', 'Brown', 3, 1, 3, '789 Pine Rd', '555-8765', 'carol.brown@example.com', '1990-12-01'),
(4, 'David', 'Williams', 4, 3, 4, '101 Elm Blvd', '555-3456', 'david.williams@example.com', '1985-04-22'),
(5, 'Eve', 'Miller', 5, 2, 5, '202 Cedar Ln', '555-2345', 'eve.miller@example.com', '1978-07-08');

-- Insert Medical Encounters
INSERT INTO medical_encounters (id, patient_id, created_by_employee_id, practitioner_seen_id, date_of_encounter, patient_complaint, practitioner_notes, vital_signs, diagnosis, treatment_plan, referral, recommended_follow_up) VALUES
(1, 1, 1, 1, '2024-09-01', 'Headache and dizziness', 'Patient showed signs of dehydration', 'BP: 120/80, HR: 72', 'Dehydration', 'Increase fluid intake', NULL, 'Follow up in 1 week'),
(2, 2, 2, 2, '2024-09-03', 'Fever and cough', 'Possible flu', 'BP: 118/76, HR: 75', 'Flu', 'Rest and fluids, prescribed ibuprofen', NULL, 'Follow up if symptoms worsen'),
(3, 3, 3, 3, '2024-09-05', 'Lower back pain', 'Muscle strain', 'BP: 122/82, HR: 70', 'Muscle strain', 'Physical therapy exercises', 'Referred to physical therapy', 'Follow up in 2 weeks'),
(4, 4, 4, 4, '2024-09-07', 'Nausea and vomiting', 'Food poisoning', 'BP: 115/70, HR: 68', 'Food poisoning', 'Prescribed anti-nausea medication', NULL, 'Follow up if symptoms persist'),
(5, 5, 5, 5, '2024-09-10', 'Skin rash', 'Possible allergic reaction', 'BP: 118/74, HR: 76', 'Allergic reaction', 'Prescribed antihistamines', NULL, 'Follow up in 1 week if rash persists');

-- Insert Appointments
INSERT INTO appointments (id, appointment_type_id, patient_id, practitioner_timeblock_id) VALUES
(1, 1, 1, 1), -- Routine appointment
(2, 2, 2, 2), -- Urgent care appointment
(3, 3, 3, 3), -- Follow-up visit
(4, 1, 4, 4), -- Routine appointment
(5, 2, 5, 5); -- Urgent care appointment

-- Insert Practitioner Timeblocks (For Appointments)
INSERT INTO practitioner_timeblocks (id, practitioner_id, appointment_id, start_time, end_time) VALUES
(1, 1, 1, '2024-09-01 09:00:00', '2024-09-01 09:30:00'),
(2, 2, 2, '2024-09-03 10:00:00', '2024-09-03 10:30:00'),
(3, 3, 3, '2024-09-05 11:00:00', '2024-09-05 11:30:00'),
(4, 4, 4, '2024-09-07 12:00:00', '2024-09-07 12:30:00'),
(5, 5, 5, '2024-09-10 14:00:00', '2024-09-10 14:30:00');

