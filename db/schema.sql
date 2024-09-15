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
    date_of_birth DATE NOT NULL,
)

CREATE TABLE medical_encounters (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    practicioner_seen INTEGER NOT NULL,
    date_of_encounter DATE NOT NULL,
    patient_complaint VARCHAR(1000),
    practitioner_notes VARCHAR(1000),
    vital_signs VARCHAR(1000),
    diagnosis VARCHAR(1000),
    treatment_plan VARCHAR(1000),
    referral VARCHAR(1000),
    recomended_follow_up VARCHAR(1000),
)

CREATE TABLE appointments ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT
    appointment_type_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    practitioner_timeblock_id INTEGER NOT NULL,
)
 
 CREATE TABLE appointment_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
 )

 -- Physician Scheduler 
 
 CREATE TABLE practitioners  (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    practitioner_type_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
 )

 Create TABLE practitioner_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
 )

 Create Table employees ( 
    employee_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    pager_number VARCHAR(15) NOT NULL,    
 )

Create Table employee_schedule ( 
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
)

Create Table practitioner_timeblocks  ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    practitioner_id INTEGER NOT NULL,
    appoitment_id INTEGER ,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,

)

-- Lab Order Teacking 

Create Table lab_orders (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    ordered_by_physician_id INTEGER NOT NULL,
    lab_test_type_id INTEGER NOT NULL,
    appoitment_id INTEGER,
    lab_technician_id INTEGER,
    measured_value DECIMAL(10,2),
    date_taken DATE,
)

Create Table lab_test_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    lower_bound DECIMAL(10,2),
    upper_bound DECIMAL(10,2),
)

-- Pharmacy Order Tracking

Create Table medications (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    recomended_dosage VARCHAR(255),
    recomended_frequency VARCHAR(255),
    side_effects VARCHAR(1000),
)   

Create Table medication_warnings (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    medication_id INTEGER NOT NULL,
    related_medication_id INTEGER NOT NULL,
    description VARCHAR(1000),
)

Create Table perscriptions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    perscribed_by_id INTEGER NOT NULL,
    medication_id INTEGER NOT NULL,
    dosage VARCHAR(255),
    usage_frequency VARCHAR(255),
    refill_frequency VARCHAR(255),
)


Create Table filled_perscriptions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    perscription_id INTEGER NOT NULL,
    filled_by_id INTEGER NOT NULL,
    date_filled DATE NOT NULL,
)

-- Insurance Billing

Create Table insurance_carrier ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    carrier_status_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
)

Create Table carrier_status (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
)


Create Table billable_services (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    cost DECIMAL(10,2),
)

create table provided_billable_services (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    billable_service_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    appoitment_id INTEGER NOT NULL,
    invoice_id INTEGER ,
)


Create table invoices (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_id INTEGER NOT NULL,
    insurance_carrier_id INTEGER NOT NULL,
    date_sent DATE NOT NULL,
    invoice_status_id INTEGER NOT NULL,
)

Create table invoice_status (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
)

Create Table invoice_provided_billable_services (
    invoice_id INTEGER NOT NULL,
    provided_billable_service_id INTEGER NOT NULL,
)

-- Equipment inventory and maintenance

CREATE TABLE equipment  ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    equipment_type_id  INTEGER NOT NULL,
    is_owned BOOLEAN NOT NULL,

) 

Create Table equipment_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
)

CREATE TABLE owned_equipment (
    equipment_id INTEGER , --PK
    date_purchased DATE NOT NULL,
    warrenty_expiration DATE NOT NULL,
    warrenty_description VARCHAR(1000),
)

CREATE TABLE leased_equipment (
    equipment_id INTEGER , --PK
    lease_start DATE NOT NULL,
    lease_end DATE NOT NULL,
    leased_from VARCHAR(255) NOT NULL,
    lease_description VARCHAR(1000),
)

Create TABLE equipment_maintenance (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    equipment_id INTEGER NOT NULL,
    equipment_problem_type_id INTEGER NOT NULL,
    equipment_status_id INTEGER NOT NULL,
    resolution VARCHAR(1000),

)   

Create Table equipment_problem_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
)

Create Table equipment_status (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
)