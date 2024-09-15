-- Electronic Patient Record
CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    employee_id INTEGER NOT NULL,
    insurance_carrier_id INTEGER NOT NULL,
    primary_care_physician_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE medical_encounters (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    created_by_employee_id INTEGER NOT NULL,
    practitioner_seen_id INTEGER NOT NULL,
    date_of_encounter DATE NOT NULL,
    patient_complaint VARCHAR(1000),
    practitioner_notes VARCHAR(1000),
    vital_signs VARCHAR(1000),
    diagnosis VARCHAR(1000),
    treatment_plan VARCHAR(1000),
    referral VARCHAR(1000),
    recommended_follow_up VARCHAR(1000)
);

CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    appointment_type_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    practitioner_timeblock_id INTEGER NOT NULL
);



 CREATE TABLE appointment_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
 );


 -- Physician Scheduler

 CREATE TABLE practitioners  (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    practitioner_type_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL
 );

 CREATE TABLE practitioner_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
 );

 CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    pager_number VARCHAR(15) NOT NULL
 );


CREATE TABLE employee_schedule (
    employee_id INTEGER NOT NULL,
    full_time BOOLEAN NOT NULL,
    monday_start TIME,
    monday_end TIME,
    tuesday_start TIME,
    tuesday_end TIME,
    wednesday_start TIME,
    wednesday_end TIME,
    thursday_start TIME,
    thursday_end TIME,
    friday_start TIME,
    friday_end TIME,
    saturday_start TIME,
    saturday_end TIME,
    sunday_start TIME,
    sunday_end TIME,
    PRIMARY KEY (employee_id)
);

CREATE TABLE practitioner_timeblocks  (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    practitioner_id INTEGER NOT NULL,
    appointment_id INTEGER ,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL

);

-- Lab Order Teacking

CREATE TABLE lab_orders (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    ordered_by_physician_id INTEGER NOT NULL,
    lab_test_type_id INTEGER NOT NULL,
    appointment_id INTEGER,
    lab_technician_id INTEGER,
    measured_value DECIMAL(10,2),
    date_taken DATE
);



CREATE TABLE lab_test_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    lower_bound DECIMAL(10,2),
    upper_bound DECIMAL(10,2)
);

-- Pharmacy Order Tracking

CREATE TABLE medications (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    recommended_dosage VARCHAR(255),
    recommended_frequency VARCHAR(255),
    side_effects VARCHAR(1000)
);

CREATE TABLE medication_warnings (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    medication_id INTEGER NOT NULL,
    related_medication_id INTEGER NOT NULL,
   description VARCHAR(1000)
);


CREATE TABLE perscriptions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    perscribed_by_id INTEGER NOT NULL,
    medication_id INTEGER NOT NULL,
    dosage VARCHAR(255),
    usage_frequency VARCHAR(255),
    refill_frequency VARCHAR(255)
);


CREATE TABLE filled_perscriptions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    perscription_id INTEGER NOT NULL,
    filled_by_id INTEGER NOT NULL,
    date_filled DATE NOT NULL

);


-- Insurance Billing

CREATE TABLE insurance_carrier (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    carrier_status_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL
);



CREATE TABLE carrier_status (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE billable_services (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    cost DECIMAL(10,2)
);

create table provided_billable_services (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    billable_service_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    appointment_id INTEGER NOT NULL,
    invoice_id INTEGER

);



Create table invoices (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    insurance_carrier_id INTEGER NOT NULL,
    invoice_status_id INTEGER NOT NULL,
    date_sent DATE NOT NULL
);



Create table invoice_status (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE invoice_provided_billable_services (
    invoice_id INTEGER NOT NULL,
    provided_billable_service_id INTEGER NOT NULL,
    PRIMARY KEY (invoice_id, provided_billable_service_id)
);




-- Equipment inventory and maintenance

CREATE TABLE equipment  (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    equipment_type_id  INTEGER NOT NULL,
    is_owned BOOLEAN NOT NULL
);



CREATE TABLE equipment_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000)
);



CREATE TABLE owned_equipment (
    equipment_id INTEGER ,
    date_purchased DATE NOT NULL,
    warranty_expiration DATE NOT NULL,
    warranty_description VARCHAR(1000),
    PRIMARY KEY (equipment_id)
);

CREATE TABLE leased_equipment (
    equipment_id INTEGER ,
    lease_start DATE NOT NULL,
    lease_end DATE NOT NULL,
    leased_from VARCHAR(255) NOT NULL,
    lease_description VARCHAR(1000),
    PRIMARY KEY (equipment_id)
);

CREATE TABLE equipment_maintenance (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    equipment_id INTEGER NOT NULL,
    equipment_problem_type_id INTEGER NOT NULL,
    equipment_status_id INTEGER NOT NULL,
    resolution VARCHAR(1000)
);


CREATE TABLE equipment_problem_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000)
);

CREATE TABLE equipment_status (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Alter Table for Foreign Keys

-- Patients
ALTER TABLE patients
ADD CONSTRAINT fk_patient_employee_id
FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_patient_insurance_carrier_id
FOREIGN KEY (insurance_carrier_id) REFERENCES insurance_carrier(id),
ADD CONSTRAINT fk_patient_primary_care_physician_id
FOREIGN KEY (primary_care_physician_id) REFERENCES practitioners(id);

-- Medical Encounters
ALTER TABLE medical_encounters
ADD CONSTRAINT fk_medical_encounter_patient_id
FOREIGN KEY (patient_id) REFERENCES patients(id),
ADD CONSTRAINT fk_medical_encounter_created_by_employee_id
FOREIGN KEY (created_by_employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_medical_encounter_practitioner_seen_id
FOREIGN KEY (practitioner_seen_id) REFERENCES practitioners(id);

-- Appointments
ALTER TABLE appointments
ADD CONSTRAINT fk_appointment_appointment_type_id
FOREIGN KEY (appointment_type_id) REFERENCES appointment_types(id),
ADD CONSTRAINT fk_appointment_patient_id
FOREIGN KEY (patient_id) REFERENCES patients(id),
ADD CONSTRAINT fk_appointment_practitioner_timeblock_id
FOREIGN KEY (practitioner_timeblock_id) REFERENCES practitioner_timeblocks(id);

-- Practitioners
ALTER TABLE practitioners
ADD CONSTRAINT fk_practitioner_practitioner_type_id
FOREIGN KEY (practitioner_type_id) REFERENCES practitioner_types(id),
ADD CONSTRAINT fk_practitioner_employee_id
FOREIGN KEY (employee_id) REFERENCES employees(employee_id);

-- Employee Schedule
ALTER TABLE employee_schedule
ADD CONSTRAINT fk_employee_schedule_employee_id
FOREIGN KEY (employee_id) REFERENCES employees(employee_id);

-- Practitioner Timeblocks
ALTER TABLE practitioner_timeblocks
ADD CONSTRAINT fk_practitioner_timeblock_practitioner_id
FOREIGN KEY (practitioner_id) REFERENCES practitioners(id),
ADD CONSTRAINT fk_practitioner_timeblock_appointment_id
FOREIGN KEY (appointment_id) REFERENCES appointments(id);

-- Lab Orders
ALTER TABLE lab_orders
ADD CONSTRAINT fk_lab_order_patient_id
FOREIGN KEY (patient_id) REFERENCES patients(id),
ADD CONSTRAINT fk_lab_order_ordered_by_physician_id
FOREIGN KEY (ordered_by_physician_id) REFERENCES practitioners(id),
ADD CONSTRAINT fk_lab_order_lab_test_type_id
FOREIGN KEY (lab_test_type_id) REFERENCES lab_test_types(id),
ADD CONSTRAINT fk_lab_order_appointment_id
FOREIGN KEY (appointment_id) REFERENCES appointments(id),
ADD CONSTRAINT fk_lab_order_lab_technician_id
FOREIGN KEY (lab_technician_id) REFERENCES employees(employee_id);

-- Medication Warnings
ALTER TABLE medication_warnings
ADD CONSTRAINT fk_medication_warning_medication_id
FOREIGN KEY (medication_id) REFERENCES medications(id),
ADD CONSTRAINT fk_medication_warning_related_medication_id
FOREIGN KEY (related_medication_id) REFERENCES medications(id);

-- Perscriptions
ALTER TABLE perscriptions
ADD CONSTRAINT fk_perscription_patient_id
FOREIGN KEY (patient_id) REFERENCES patients(id),
ADD CONSTRAINT fk_perscription_perscribed_by_id
FOREIGN KEY (perscribed_by_id) REFERENCES practitioners(id),
ADD CONSTRAINT fk_perscription_medication_id
FOREIGN KEY (medication_id) REFERENCES medications(id);

-- Filled Perscriptions
ALTER TABLE filled_perscriptions
ADD CONSTRAINT fk_filled_perscription_perscription_id
FOREIGN KEY (perscription_id) REFERENCES perscriptions(id),
ADD CONSTRAINT fk_filled_perscription_filled_by_id
FOREIGN KEY (filled_by_id) REFERENCES employees(employee_id);

-- Insurance Carrier
ALTER TABLE insurance_carrier
ADD CONSTRAINT fk_insurance_carrier_status_id
FOREIGN KEY (carrier_status_id) REFERENCES carrier_status(id);

-- Provided Billable Services
ALTER TABLE provided_billable_services
ADD CONSTRAINT fk_provided_billable_service_billable_service_id
FOREIGN KEY (billable_service_id) REFERENCES billable_services(id),
ADD CONSTRAINT fk_provided_billable_service_patient_id
FOREIGN KEY (patient_id) REFERENCES patients(id),
ADD CONSTRAINT fk_provided_billable_service_appointment_id
FOREIGN KEY (appointment_id) REFERENCES appointments(id),
ADD CONSTRAINT fk_provided_billable_service_invoice_id
FOREIGN KEY (invoice_id) REFERENCES invoices(id);

-- Invoices
ALTER TABLE invoices
ADD CONSTRAINT fk_invoice_patient_id
FOREIGN KEY (patient_id) REFERENCES patients(id),
ADD CONSTRAINT fk_invoice_insurance_carrier_id
FOREIGN KEY (insurance_carrier_id) REFERENCES insurance_carrier(id),
ADD CONSTRAINT fk_invoice_status_id
FOREIGN KEY (invoice_status_id) REFERENCES invoice_status(id);

-- Invoice Provided Billable Services
ALTER TABLE invoice_provided_billable_services
ADD CONSTRAINT fk_invoice_provided_billable_service_invoice_id
FOREIGN KEY (invoice_id) REFERENCES invoices(id),
ADD CONSTRAINT fk_invoice_provided_billable_service_id
FOREIGN KEY (provided_billable_service_id) REFERENCES provided_billable_services(id);

-- Equipment
ALTER TABLE equipment
ADD CONSTRAINT fk_equipment_type_id
FOREIGN KEY (equipment_type_id) REFERENCES equipment_types(id);

-- Owned Equipment
ALTER TABLE owned_equipment
ADD CONSTRAINT fk_owned_equipment_equipment_id
FOREIGN KEY (equipment_id) REFERENCES equipment(id);

-- Leased Equipment
ALTER TABLE leased_equipment
ADD CONSTRAINT fk_leased_equipment_equipment_id
FOREIGN KEY (equipment_id) REFERENCES equipment(id);

-- Equipment Maintenance
ALTER TABLE equipment_maintenance
ADD CONSTRAINT fk_equipment_maintenance_equipment_id
FOREIGN KEY (equipment_id) REFERENCES equipment(id),
ADD CONSTRAINT fk_equipment_maintenance_problem_type_id
FOREIGN KEY (equipment_problem_type_id) REFERENCES equipment_problem_types(id),
ADD CONSTRAINT fk_equipment_maintenance_status_id
FOREIGN KEY (equipment_status_id) REFERENCES equipment_status(id);
