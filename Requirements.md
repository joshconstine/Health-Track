# Requirements

## Features

- Electronic Patient Record
- Physician Scheduler
- Lab Order Tracking
- Pharmacy Order Tracking
- Insurance Billing
- Equipment Inventory and Maintenance.

# Electronic Patient Record
 - Omar & Talia

## Views
- all patients  
- list of medical endounters 
    -filter by patient
    -create a medical encounter

- patient report 
    -printable
    -optonally inlcude medical encounter information

## Backend routes

- GET /patients

- GET /medicalEncounters

- GET /medicalEncounters/{PatientID}

- GET /patientReport/{PatientID}?includeEncounterInformation=true&fields=['date', 'practicioner']


# Physician Scheduler
- Stephen & Reuben  

## Views
- all appoitments

- Physician list

- single Physician view
    - Physician calendar
        - see all current appoitments
        - block out time (half hour increments)
    - book patient appoitment


## Backend routes

boolean
- GET /physician/{PhysicianID}


- GET /appoitments

- GET /calendarTimeblocks?appoitmentsOnly=

- GET /calendarTimeblocks/{PhysicianID}?startDate=mm/dd/yyyy&endDate=mm/dd/yyyy

- POST /appoitments 

- POST /calendarTimeblocks



# Lab Order Tracking
- Amine & Anthony


## Views
- all lab tests
     - orders by patient name, by date ordered, by date performed, and by ordering physician.
    - create lab test button

## Backend routes

-GET /labTests

-GET /labTestTypes

-POST /labTest


#  Pharmacy Order Tracking (PT)

## Views
- list of order perscriptions
    - search by perscription id, patientname, medication

- reports refer to page #8

## Backend routers

- GET /perscriptions?patientName=john&medication=ibprofen

- GET /perscriptions/{perscriptionID}


- GET /perscriptionReport?physician=john&month=mm/yyyyy

- GET /medications




#  Insurance Billing (IB)
- Joshua & Kane

## Views
-  

## Backend routers

- GET /insuranceCarriers


- GET /invoice/{insuranceCarrierID}?startDate=mm/dd/yyyy&endDate=mm/dd/yyyy



- GET /invoice/?patientName=john


#  Equipment Inventory and Maintenance 


## Views

-  equipment list

- equipment problems list

## Backend routers

- GET /equipment?problems=true
- GET /equipment/{equipmentID}
- GET /vendors
