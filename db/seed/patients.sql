-- Insert Patients
INSERT INTO patients (id, first_name, last_name, insurance_carrier_id, primary_care_physician_id, address, phone_number, email, date_of_birth) VALUES
(1, 'Alice', 'Johnson', 1, 1, '123 Maple St', '555-1234', 'alice.johnson@example.com', '1980-05-10'),
(2, 'Bob', 'Smith', 2, 2, '456 Oak Ave', '555-5678', 'bob.smith@example.com', '1975-09-15'),
(3, 'Carol', 'Brown', 1, 3, '789 Pine Rd', '555-8765', 'carol.brown@example.com', '1990-12-01'),
(4, 'David', 'Williams', 3, 4, '101 Elm Blvd', '555-3456', 'david.williams@example.com', '1985-04-22'),
(5, 'Eve', 'Miller', 2, 5, '202 Cedar Ln', '555-2345', 'eve.miller@example.com', '1978-07-08');

-- Insert Medical Encounters
INSERT INTO medical_encounters (id, patient_id, created_by_employee_id, practitioner_seen_id, date_of_encounter, patient_complaint, practitioner_notes, vital_signs, diagnosis, treatment_plan, referral, recommended_follow_up) VALUES
(1, 1, 1, 1, '2024-09-01', 'Headache and dizziness', 'Patient showed signs of dehydration', 'BP: 120/80, HR: 72', 'Dehydration', 'Increase fluid intake', NULL, 'Follow up in 1 week'),
(2, 2, 2, 2, '2024-09-03', 'Fever and cough', 'Possible flu', 'BP: 118/76, HR: 75', 'Flu', 'Rest and fluids, prescribed ibuprofen', NULL, 'Follow up if symptoms worsen'),
(3, 3, 3, 3, '2024-09-05', 'Lower back pain', 'Muscle strain', 'BP: 122/82, HR: 70', 'Muscle strain', 'Physical therapy exercises', 'Referred to physical therapy', 'Follow up in 2 weeks'),
(4, 4, 4, 4, '2024-09-07', 'Nausea and vomiting', 'Food poisoning', 'BP: 115/70, HR: 68', 'Food poisoning', 'Prescribed anti-nausea medication', NULL, 'Follow up if symptoms persist'),
(5, 5, 5, 5, '2024-09-10', 'Skin rash', 'Possible allergic reaction', 'BP: 118/74, HR: 76', 'Allergic reaction', 'Prescribed antihistamines', NULL, 'Follow up in 1 week if rash persists');

-- Insert Practitioner Timeblocks (For Appointments)
INSERT INTO practitioner_timeblocks (id, practitioner_id, start_time, end_time) VALUES
(1,  1, '2024-09-01 09:00:00', '2024-09-01 09:30:00'),
(2,  2, '2024-09-03 10:00:00', '2024-09-03 10:30:00'),
(3,  3, '2024-09-05 11:00:00', '2024-09-05 11:30:00'),
(4,  4, '2024-09-07 12:00:00', '2024-09-07 12:30:00'),
(5,  5, '2024-09-10 14:00:00', '2024-09-10 14:30:00');

-- Insert Appointments
INSERT INTO appointments (id, appointment_type_id, patient_id, practitioner_timeblock_id) VALUES
(1, 1, 1, 1), -- Routine appointment
(2, 2, 2, 2), -- Urgent care appointment
(3, 3, 3, 3), -- Follow-up visit
(4, 1, 4, 4), -- Routine appointment
(5, 2, 5, 5); -- Urgent care appointment

update practitioner_timeblocks set appointment_id = 1 where id = 1;
update practitioner_timeblocks set appointment_id = 2 where id = 2;
update practitioner_timeblocks set appointment_id = 3 where id = 3;
update practitioner_timeblocks set appointment_id = 4 where id = 4;
update practitioner_timeblocks set appointment_id = 5 where id = 5;

-- Insert Provided Billable Services
INSERT INTO provided_billable_services (id, billable_service_id, patient_id, appointment_id) VALUES
(1, 1, 1, 1), -- X-ray for patient 1, appointment 1
(2, 2, 1, 1), -- Physical exam for patient 1, appointment 1 (Multiple services in one appointment)
(3, 3, 2, 2), -- TB Test for patient 2, appointment 2
(4, 1, 2, 2), -- X-ray for patient 2, appointment 2 (Multiple services in one appointment)
(5, 4, 3, 3), -- Routine check-up for patient 3, appointment 3
(6, 2, 3, 3), -- Physical exam for patient 3, appointment 3 (Multiple services in one appointment)
(7, 3, 4, 4), -- TB Test for patient 4, appointment 4
(8, 5, 5, 5); -- Additional billable service for patient 5, appointment 5

-- Insert Prescriptions
INSERT INTO prescriptions (id, patient_id, prescribed_by_id, medication_id, dosage, usage_frequency, refill_frequency) VALUES
(1, 1, 1, 1, '500 mg', 'Once a day', 'Monthly'), -- Prescription 1 for patient 1
(2, 1, 1, 2, '250 mg', 'Twice a day', 'Bi-weekly'), -- Prescription 2 for patient 1 (Multiple prescriptions)
(3, 2, 2, 3, '100 mg', 'Once a day', 'Weekly'), -- Prescription for patient 2
(4, 3, 3, 1, '200 mg', 'Twice a day', 'Monthly'), -- Prescription for patient 3
(5, 3, 3, 4, '50 mg', 'Once a day', 'No refill'), -- Prescription 2 for patient 3 (Multiple prescriptions)
(6, 4, 4, 1, '500 mg', 'Once a day', 'Monthly'), -- Prescription for patient 4
(7, 5, 5, 2, '250 mg', 'Twice a day', 'Bi-weekly'); -- Prescription for patient 5

-- Insert Filled Prescriptions
INSERT INTO filled_prescriptions (id, prescription_id, filled_by_id, date_filled) VALUES
(1, 1, 10, '2023-01-01'), -- Filled Prescription 1 for patient 1
(2, 1, 10, '2023-02-01'), -- Second fill for Prescription 1 for patient 1 (Multiple fills for one prescription)
(3, 2, 11, '2023-03-01'), -- Filled Prescription 2 for patient 1
(4, 3, 11, '2023-04-01'), -- Filled Prescription for patient 2
(5, 4, 12, '2023-05-01'), -- Filled Prescription for patient 3
(6, 4, 12, '2023-06-01'), -- Second fill for Prescription for patient 3 (Multiple fills)
(7, 5, 13, '2023-07-01'), -- Filled Prescription 2 for patient 3
(8, 6, 10, '2023-08-01'), -- Filled Prescription for patient 4
(9, 7, 11, '2023-09-01'); -- Filled Prescription for patient 5


-- Insert Invoices
INSERT INTO invoices (id, patient_id, insurance_carrier_id, invoice_status_id, date_sent) VALUES
(1, 1, 1, 1, '2023-01-01'), -- Invoice for patient 1 (Paid)
(2, 2, 2, 2, '2023-02-01'), -- Invoice for patient 2 (Overdue)
(3, 3, 3, 3, '2023-03-01'), -- Invoice for patient 3 (Sent)
(4, 4, 4, 1, '2023-04-01'), -- Invoice for patient 4 (Paid)
(5, 5, 5, 2, '2023-05-01'); -- Invoice for patient 5 (Overdue)
-- Insert Invoice Provided Billable Services
INSERT INTO invoice_provided_billable_services (invoice_id, provided_billable_service_id) VALUES
(1, 1), -- Provided billable service for invoice 1
(2, 2), -- Provided billable service for invoice 2
(3, 3), -- Provided billable service for invoice 3
(4, 4), -- Provided billable service for invoice 4
(5, 5); -- Provided billable service for invoice 5
-- Insert Lab Orders
INSERT INTO lab_orders (id, patient_id, ordered_by_physician_id, lab_test_type_id, appointment_id, lab_technician_id, measured_value, date_taken) VALUES
(1, 1, 1, 1, 1, 1, 12.5, '2023-01-05'), -- Lab order for patient 1
(2, 2, 2, 2, 2, 2, 15.0, '2023-02-10'), -- Lab order for patient 2
(3, 3, 3, 3, 3, 3, 18.5, '2023-03-15'), -- Lab order for patient 3
(4, 4, 4, 1, 4, 4, 11.5, '2023-04-20'), -- Lab order for patient 4
(5, 5, 5, 2, 5, 5, 14.0, '2023-05-25'); -- Lab order for patient 5


UPDATE provided_billable_services SET invoice_id  = 1;