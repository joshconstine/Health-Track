-- Setup SQL for EPR Application

-- Insert into practitioner_types
INSERT INTO practitioner_types (name) VALUES
('physician'),
('physician\'s assistant'),
('nurse'),
('pharmacist'),
('lab technician');

-- Insert into appointment_types
INSERT INTO appointment_types (name) VALUES
('routine'),
('urgent care'),
('follow up visit');

-- Insert into lab_test_types
INSERT INTO lab_test_types (name, description, lower_bound, upper_bound) VALUES
('tb test', 'Test for tuberculosis', 0.00, 10.00),
('red blood cell', 'Measures red blood cell count', 4.00, 5.50),
('iron count', 'Measures iron levels in blood', 40.00, 175.00);

-- Insert into equipment_types
INSERT INTO equipment_types (name, description) VALUES
('xray_machine', 'Machine for taking X-rays'),
('er_trauma_bed', 'Bed used in emergency rooms for trauma patients'),
('ultrasound_machine', 'Machine for performing ultrasounds'),
('heart_monitor', 'Device used to monitor heart activity'),
('defibrillator', 'Device used to restore heart rhythm in cardiac arrest'),
('ventilator', 'Device to support breathing'),
('IV_stand', 'Stand to hold intravenous fluids');

-- Insert into equipment_problem_types
INSERT INTO equipment_problem_types (name, description) VALUES
('malfunction', 'Equipment not working as expected'),
('calibration_issue', 'Requires recalibration'),
('power_failure', 'Equipment failed due to power issue'),
('wear_and_tear', 'Normal wear and tear requiring maintenance');

-- Insert into medications
INSERT INTO medications (name, description, recommended_dosage, recommended_frequency, side_effects) VALUES
('aspirin', 'Pain reliever and fever reducer', '500mg', 'Every 4 hours', 'Stomach upset, nausea'),
('ibuprofen', 'Anti-inflammatory and pain reliever', '400mg', 'Every 6 hours', 'Dizziness, nausea, headache'),
('metformin', 'Controls blood sugar levels', '500mg', 'Twice daily', 'Diarrhea, nausea, gas'),
('amoxicillin', 'Antibiotic used to treat infections', '500mg', 'Every 8 hours', 'Diarrhea, headache, rash');

-- Insert into medication_warnings
INSERT INTO medication_warnings (medication_id, related_medication_id, description) VALUES
(1, 2, 'Do not combine with ibuprofen due to risk of stomach bleeding'),
(3, 1, 'Not recommended to combine with aspirin as it may reduce effectiveness of blood sugar control'),
(4, 2, 'Do not take with ibuprofen due to interaction risk');

-- Insert into carrier_status
INSERT INTO carrier_status (name) VALUES
('pays on time'),
('late with payments'),
('difficult to get payments');

-- Insert into invoice_status
INSERT INTO invoice_status (name) VALUES
('paid'),
('overdue'),
('sent');

-- Insert into billable_services
INSERT INTO billable_services (name, description, cost) VALUES
('xray', 'X-ray imaging service', 100.00),
('ultrasound', 'Ultrasound imaging service', 150.00),
('blood_test', 'Blood test service', 50.00),
('urine_test', 'Urine test service', 25.00),
('physical_therapy', 'Physical therapy service', 75.00);

-- Insert into equipment_status
INSERT INTO equipment_status (name) VALUES
('operational'),
('under maintenance'),
('out of service');

-- Employees for Practitioners
INSERT INTO employees (employee_id, first_name, last_name, phone_number, pager_number) VALUES
(1, 'John', 'Doe', '555-1234', '555-9876'),
(2, 'Jane', 'Smith', '555-5678', '555-4321'),
(3, 'Michael', 'Brown', '555-8765', '555-6543'),
(4, 'Emily', 'Johnson', '555-3456', '555-7654'),
(5, 'Sarah', 'Lee', '555-2345', '555-8765'),
(6, 'James', 'Taylor', '555-6789', '555-5432'),
(7, 'Linda', 'Williams', '555-9876', '555-1234'),
(8, 'Robert', 'Miller', '555-4321', '555-5678'),
(9, 'David', 'Martinez', '555-8765', '555-6543'),
(10, 'Jennifer', 'Garcia', '555-3456', '555-7654'),
(11, 'William', 'Lopez', '555-2345', '555-8765'),
(12, 'Mary', 'Hernandez', '555-6789', '555-5432'),
(13, 'Richard', 'Young', '555-9876', '555-1234'),
(14, 'Patricia', 'King', '555-4321', '555-5678'),
(15, 'Charles', 'Scott', '555-8765', '555-6543'),
(16, 'Laura', 'Green', '555-3456', '555-7654'),
(17, 'Daniel', 'Adams', '555-2345', '555-8765'),
(18, 'Karen', 'Baker', '555-8765', '555-6543'),
(19, 'Mark', 'Gonzalez', '555-3456', '555-7654'),
(20, 'Susan', 'Evans', '555-2345', '555-8765');



-- Practitioners
INSERT INTO practitioners (id, practitioner_type_id, employee_id) VALUES
(1, 1, 1), -- Physician
(2, 1, 2), -- Physician
(3, 1, 3), -- Physician
(4, 1, 4), -- Physician
(5, 1, 5), -- Physician
(6, 2, 6), -- Physician's Assistant
(7, 2, 7), -- Physician's Assistant
(8, 2, 8), -- Physician's Assistant
(9, 3, 9), -- Nurse
(10, 3, 10), -- Nurse
(11, 3, 11), -- Nurse
(12, 3, 12), -- Nurse
(13, 3, 13), -- Nurse
(14, 3, 14), -- Nurse
(15, 3, 15), -- Nurse
(16, 3, 16), -- Nurse
(17, 4, 17), -- Pharmacist (Full-time)
(18, 4, 18), -- Pharmacist (Part-time)
(19, 5, 19), -- Lab Technician (Full-time)
(20, 5, 20); -- Lab Technician (Part-time)

-- Employee Schedules (Full-time and Part-time for pharmacists and lab technicians)
INSERT INTO employee_schedule (employee_id, full_time, monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end) VALUES
 (1, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
 (2, FALSE, '12:00', '16:00', '12:00', '16:00', NULL, NULL, NULL, NULL, NULL, NULL),
 (3, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
 (4, FALSE, '13:00', '17:00', '13:00', '17:00', NULL, NULL, NULL, NULL, NULL, NULL),
(5, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(6, FALSE, '12:00', '16:00', '12:00', '16:00', NULL, NULL, NULL, NULL, NULL, NULL),
(7, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(8, FALSE, '13:00', '17:00', '13:00', '17:00', NULL, NULL, NULL, NULL, NULL, NULL),
(9, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(10, FALSE, '12:00', '16:00', '12:00', '16:00', NULL, NULL, NULL, NULL, NULL, NULL),
(12, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(13, FALSE, '13:00', '17:00', '13:00', '17:00', NULL, NULL, NULL, NULL, NULL, NULL),
(14, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(15, FALSE, '12:00', '16:00', '12:00', '16:00', NULL, NULL, NULL, NULL, NULL, NULL),
(16, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(17, FALSE, '13:00', '17:00', '13:00', '17:00', NULL, NULL, NULL, NULL, NULL, NULL),
(18, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00'),
(19, FALSE, '12:00', '16:00', '12:00', '16:00', NULL, NULL, NULL, NULL, NULL, NULL),
(20, TRUE, '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00', '08:00', '16:00');

-- Equipment Data
INSERT INTO equipment (id, equipment_type_id, is_owned) VALUES
(1, 1, TRUE), -- X-Ray Machine (Owned)
(2, 2, TRUE), -- ER Trauma Bed (Owned)
(3, 3, TRUE), -- MRI Machine (Owned)
(4, 4, TRUE), -- Ultrasound Machine (Owned)
(5, 5, TRUE); -- EKG Machine (Owned)

-- Owned Equipment Details
INSERT INTO owned_equipment (equipment_id, date_purchased, warranty_expiration, warranty_description) VALUES
(1, '2020-01-01', '2025-01-01', '5-year warranty on parts'),
(2, '2019-05-15', '2024-05-15', '5-year warranty on frame'),
(3, '2021-08-22', '2026-08-22', '5-year warranty on electronics'),
(4, '2022-02-10', '2027-02-10', '5-year warranty on transducers'),
(5, '2023-03-05', '2028-03-05', '5-year warranty on sensors');

-- Equipment Maintenance Data
INSERT INTO equipment_maintenance (id, equipment_id, equipment_problem_type_id, equipment_status_id, resolution) VALUES
(1, 1, 1, 2, 'Repaired mechanical failure in X-Ray Machine'),
(2, 3, 3, 1, 'Recalibrated MRI Machine sensors');
