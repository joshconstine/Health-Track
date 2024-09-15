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

