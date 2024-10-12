// backend/index.js
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()

const connection = mysql.createConnection({
  host:  process.env.DB_HOST || "localhost",
  user: "root",
  password: "password",
  database: "health",
  port: 3306
})

connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err
//   console.log('The solution is: ', rows[0].solution)
// })


app.use(cors())

app.get('/', (req, res) => {
  res.json([
    {
      "id":"1",
      "title":"Book Review: The Name of the Wind"
    },
    {
      "id":"2",
      "title":"Game Review: Pokemon Brillian Diamond"
    },
    {
      "id":"3",
      "title":"Show Review: Alice in Borderland"
    }
  ])
})

// This sets up an API endpoint '/practitioners' that will respond to GET requests.
app.get('/patients', (req, res) => {

  // Define the SQL query that selects first and last names from the employees table
  // and gets their practitioner type from the practitioner_types table.
  const query = `SELECT * FROM patients`;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {  // Run the SQL query
      if (err) throw err;  // If there is an error, throw it

      res.json(rows);  // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});

// This sets up an API endpoint '/practitioners' that will respond to GET requests.
app.get('/medicalEncounters', (req, res) => {

  // Define the SQL query that selects first and last names from the employees table
  // and gets their practitioner type from the practitioner_types table.
  const query = `select m.id
    ,m.practitioner_seen_id
    ,m.patient_complaint
    ,m.vital_signs
    ,m.practitioner_notes
    ,m.referral
    ,m.recommended_follow_up
    ,m.diagnosis
    ,CONCAT(p.first_name, ' ', p.last_name) as patient_name
    ,CONCAT(e.first_name, ' ', e.last_name) as practitioner_name
    ,prt.name as practitioner_type
    ,l.date_taken


        from medical_encounters m
                 join patients p on m.patient_id = p.id
                 join lab_orders l on l.patient_id = p.id
                 join lab_test_types t on l.lab_test_type_id = t.id
                 join practitioners pr on m.practitioner_seen_id = pr.id
                 join employees e on pr.employee_id = e.employee_id
                 join practitioner_types prt on pr.practitioner_type_id = prt.id`;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {  // Run the SQL query
      if (err) throw err;  // If there is an error, throw it

      res.json(rows);  // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});

// This sets up an API endpoint '/practitioners' that will respond to GET requests.
app.get('/practitioners', (req, res) => {

  // Define the SQL query that selects first and last names from the employees table
  // and gets their practitioner type from the practitioner_types table.
  const query = `
    SELECT 
      e.first_name,           // Get the employee's first name
      e.last_name,            // Get the employee's last name
      pt.name AS practitioner_type  // Get the practitioner's type (e.g., doctor, nurse) and call it 'practitioner_type'
    FROM 
      practitioner p          // Get data from the 'practitioner' table (alias it as 'p')
    JOIN 
      employees e             // Join the 'employees' table to match employees to practitioners
      ON p.employee_id = e.employee_id  // The practitioner is linked to the employee via employee_id
    JOIN 
      practitioner_types pt   // Join 'practitioner_types' to get the type of practitioner (like doctor, nurse)
      ON p.practitioner_type_id = pt.id  // Match the practitioner type using practitioner_type_id
  `;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {  // Run the SQL query
      if (err) throw err;  // If there is an error, throw it

      res.json(rows);  // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});

app.get('/appointments', (req, res) => {
  const queryA = "select a.id, DATE_FORMAT(pt.start_time, '%Y-%m-%d') AS appointment_date, DATE_FORMAT(pt.start_time, '%H:%i:%s') As appointment_time, p.first_name, x.name from appointments a join patients p on p.id = a.patient_id join practitioner_timeblocks pt on pt.id = a.practitioner_timeblock_id join appointment_types x on x.id = a.appointment_type_id;"

  try {
  connection.query(queryA, (err, rows, fields) => {
    if (err) throw err

    res.json(rows)
  })
} catch (error) {
  console.log(error)
}
})

app.get('/insuranceCarriers', (req, res) => {
  try {
  connection.query('select ic.id, ic.name, ic.address,cs.name as status_name from insurance_carrier ic join carrier_status cs on ic.carrier_status_id = cs.id;', (err, rows, fields) => {
    if (err) throw err

    res.json(rows)
  })
} catch (error) {
  console.log(error)
}
})

app.get('/insuranceCarriers/:id', (req, res) => {
  try {
  connection.query(`select ic.id, ic.name, ic.address,cs.name as status_name from insurance_carrier ic join carrier_status cs on ic.carrier_status_id = cs.id where ic.id = ${req.params.id}`, (err, rows, fields) => {
    if (err) throw err

    res.json(rows[0])
  })
} catch (error) {
  console.log(error)
}
})

app.get('/insuranceCarriers/:id/invoices', (req, res) => {
  try {
  connection.query(`select i.id
,i.insurance_carrier_id
, ic.name
,i.date_sent
, p.first_name as patient_first_name
, p.last_name as patient_last_name
,i.invoice_status_id
,invs.name
,i.date_sent as invoice_date
from invoices i
join insurance_carrier ic on i.insurance_carrier_id = ic.id
join patients p on i.patient_id = p.id
join invoice_status invs on i.invoice_status_id = invs.id
where ic.id =  ${req.params.id}
`, (err, rows, fields) => {
    if (err) throw err

    res.json(rows)
  })
} catch (error) {
  console.log(error)
}
})
app.get('/billableServices', (req, res) => {
  try {
  connection.query('select bs.id, bs.name,bs.cost from billable_services bs', (err, rows, fields) => {
    if (err) throw err

    res.json(rows)
  })
} catch (error) {
  console.log(error)
}
})
//404 page
app.use((req, res) => {
  res.status(404).send('404 page not found')
})

app.listen(4000, () => {
  console.log('listening for requests on port 4000')
})
