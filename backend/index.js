// backend/index.js
const checkForTimeblockOverlap = require('./helpers/checkForTimeblockOverlap');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const { TZDate } = require('@date-fns/tz');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Parser } = require('json2csv');

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: 'root',
  password: 'password',
  database: 'health',
  port: 3306,
  multipleStatements: true,
  timezone: 'Z',
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err
//   console.log('The solution is: ', rows[0].solution)
// })

const SECRET_KEY = 'secret'; // Eventually replace with a strong secret we should put this into an .env

app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow sending cookies with requests
  })
);
app.use(express.json());
app.use(cookieParser());

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

app.get('/', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Book Review: The Name of the Wind',
    },
    {
      id: '2',
      title: 'Game Review: Pokemon Brillian Diamond',
    },
    {
      id: '3',
      title: 'Show Review: Alice in Borderland',
    },
  ]);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  const query = `
    SELECT 
      uc.employee_id, 
      e.first_name, 
      e.last_name, 
      pt.name AS employee_type, 
      uc.password_hash
    FROM 
      user_credentials uc
    JOIN 
      employees e ON uc.employee_id = e.employee_id
    LEFT JOIN 
      practitioners p ON e.employee_id = p.employee_id
    LEFT JOIN 
      practitioner_types pt ON p.practitioner_type_id = pt.id
    WHERE 
      uc.username = ? AND uc.is_active = 1
  `;
  try {
    connection.query(query, [username], async (err, rows) => {
      if (err) {
        console.error('Error during login query', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const user = rows[0];

      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Successful login

      // Generate JWT token
      const token = jwt.sign(
        { employee_id: user.employee_id, employee_type: user.employee_type },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
      // Send the token as an HTTP-only cookie
      res
        .cookie('auth_token', token, {
          httpOnly: true, // Prevent access via JavaScript
          secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
          sameSite: 'Strict', // Protect against CSRF
          path: '/', // Make cookie available for the entire site
        })
        .json({
          message: 'Login successful',
          employee_id: user.employee_id,
          first_name: user.first_name,
          last_name: user.last_name,
          employee_type: user.employee_type || 'General Employee', // Default if no specific type
        });
    });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('auth_token').json({ message: 'Logged out successfully' });
});

// This sets up an API endpoint '/practitioners' that will respond to GET requests.
app.get('/patients', (req, res) => {
  // Define the SQL query that selects first and last names from the employees table
  // and gets their practitioner type from the practitioner_types table.
  const query = `
  SELECT p.id
  ,CONCAT(p.first_name, ' ', p.last_name) as name
  ,p.insurance_carrier_id
  ,ic.name as insurance_carrier
  ,p.primary_care_physician_id
  ,CONCAT(e.first_name, ' ', e.last_name) as primary_care_physician
  ,p.address
  ,p.phone_number
  ,p.created_at
  ,p.email
  ,p.date_of_birth
  , p.gender
  from patients p
  join  insurance_carrier ic on ic.id = p.insurance_carrier_id
  join practitioners pr on pr.id = p.primary_care_physician_id
  join employees e on e.employee_id = pr.employee_id;
`;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {
      // Run the SQL query
      if (err) throw err; // If there is an error, throw it

      res.json(rows); // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});

// This sets up an API endpoint '/practitioners' that will respond to GET requests.
app.get('/labOrders', (req, res) => {
  const selectedPractitionerId = req.query.practitioner_id || null;
  const selectedPatientId = req.query.patient_id || null;
  const selectedOrderDate = req.query.date_ordered || null;
  const selectedTakenDate = req.query.date_taken || null;

  // Base query
  let query = `
    SELECT 
      l.ID,
      ltt.name,
      l.patient_id,
      l.ordered_by_physician_id,
      l.appointment_id,
      l.lab_technician_id,
      l.measured_value,
      l.date_ordered,
      l.date_taken,
      CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
      CONCAT(orderd_by_employee.first_name, ' ', orderd_by_employee.last_name) AS practitioner_name,
      CONCAT(lab_tech_employee.first_name, ' ', lab_tech_employee.last_name) AS technician_name
    FROM lab_orders l
    JOIN health.lab_test_types ltt ON ltt.id = l.lab_test_type_id
    JOIN patients p ON p.id = l.patient_id
    JOIN practitioners orderd_by ON orderd_by.id = l.ordered_by_physician_id
    JOIN employees orderd_by_employee ON orderd_by.employee_id = orderd_by_employee.employee_id
    JOIN practitioners lab_tech ON lab_tech.id = l.lab_technician_id
    JOIN employees lab_tech_employee ON lab_tech.employee_id = lab_tech_employee.employee_id
  `;

  // Array to hold filters
  const filters = [];

  // Add filters dynamically
  if (selectedPractitionerId) {
    filters.push(
      `l.ordered_by_physician_id = ${connection.escape(selectedPractitionerId)}`
    );
  }
  if (selectedPatientId) {
    filters.push(`l.patient_id = ${connection.escape(selectedPatientId)}`);
  }
  if (selectedOrderDate) {
    filters.push(`l.date_ordered = ${connection.escape(selectedOrderDate)}`);
  }
  if (selectedTakenDate) {
    filters.push(`l.date_taken = ${connection.escape(selectedTakenDate)}`);
  }

  // If there are any filters, append them to the query
  if (filters.length > 0) {
    query += ' WHERE ' + filters.join(' AND ');
  }

  // Run the query
  try {
    connection.query(query, (err, rows) => {
      if (err) throw err;
      //return date in the format yyyy-mm-dd
      rows.forEach((row) => {

        row.date_ordered = row.date_ordered.toISOString().split("T")[0];
        row.date_taken = row.date_taken.toISOString().split("T")[0];

       
      });
      res.json(rows);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});


app.get("/patients/:id", (req, res) => {

  try {
    connection.query(
      `
SELECT p.id
    ,CONCAT(p.first_name, ' ', p.last_name) as name
    ,p.phone_number
    , p.address
,p.date_of_birth
,CONCAT(e.first_name, ' ', e.last_name) as primary_care_physician
, pr.id as primary_care_physician_id
, ic.name as insurance_carrier
, ic.id as insurance_carrier_id

 from patients p
 join practitioners pr on pr.id = p.primary_care_physician_id
    join employees e on e.employee_id = pr.employee_id
    join insurance_carrier ic on ic.id = p.insurance_carrier_id

 where p.id = ${req.params.id}
  `,
      (err, rows, fields) => {
        dt = req.query  .dataType;
        console.log(dt);
        if (dt === 'csv') { 
         // Convert the data to CSV
         const json2csvParser = new Parser();
         const csv = json2csvParser.parse(rows);
 
         // Set the appropriate headers for file download
         res.header('Content-Type', 'text/csv');
         res.header('Content-Disposition', `attachment; filename=patient_${req.params.id}.csv`);
 
         // Send the CSV file
         res.send(csv);
      } else {
        res.json(rows[0]);
      }
      } 
    );
  } catch (error) {
    console.log(error);
  }
});
app.get('/patients/:id/prescriptions', (req, res) => {
  // Define the SQL query that selects first and last names from the employees table
  // and gets their practitioner type from the practitioner_types table.
  const query = `
select p.id
,m.id
,m.name
,p.dosage
,p.usage_frequency
,p.refill_frequency
,fp.date_filled
,CONCAT(e.first_name, ' ', e.last_name) as filled_by
,pr.id as filled_by_id  
from prescriptions p
join medications m on p.medication_id = m.id
join filled_prescriptions fp on p.id = fp.prescription_id
join employees e on e.employee_id = fp.filled_by_id
join practitioners pr on pr.employee_id = e.employee_id
where p.patient_id = ${req.params.id}
                 `;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {
      // Run the SQL query
      if (err) throw err; // If there is an error, throw it

      res.json(rows); // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});
app.get('/patients/:id/medicalEncounters', (req, res) => {
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
                 join practitioner_types prt on pr.practitioner_type_id = prt.id
                  where p.id = ${req.params.id}
                 `;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {
      // Run the SQL query
      if (err) throw err; // If there is an error, throw it

      res.json(rows); // Send the result (rows) back to the client (your React app) in JSON format
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
    select p.id
      ,CONCAT(e.first_name, ' ', e.last_name) as name
      ,e.phone_number
      ,e.pager_number
      ,pt.name as practitioner_type
     , CASE
        WHEN ps.full_time = 1 THEN 'Full Time'
        ELSE 'Part Time'
        END as full_time
      ,CONCAT(ps.monday_start, ' - ', ps.monday_end) as monday
      ,CONCAT(ps.tuesday_start, ' - ', ps.tuesday_end) as tuesday
      ,CONCAT(ps.wednesday_start, ' - ', ps.wednesday_end) as wednesday
      ,CONCAT(ps.thursday_start, ' - ', ps.thursday_end) as thursday
      ,CONCAT(ps.friday_start, ' - ', ps.friday_end) as friday
      ,CONCAT(ps.saturday_start, ' - ', ps.saturday_end) as saturday
      ,CONCAT(ps.sunday_start, ' - ', ps.sunday_end) as sunday
      from practitioners p
      join employees e on e.employee_id = p.employee_id
      join practitioner_types pt on pt.id = p.practitioner_type_id
      join employee_schedule ps on ps.employee_id = e.employee_id
  `;

  // Try to run the query on the database
  try {
    connection.query(query, (err, rows) => {
      // Run the SQL query
      if (err) throw err; // If there is an error, throw it

      res.json(rows); // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});

app.get('/practitioners/:id', (req, res) => {
  try {
    connection.query(
      `
      select p.id
      ,CONCAT(e.first_name, ' ', e.last_name) as name
      ,e.phone_number
      ,e.pager_number
      ,pt.name as practitioner_type
      ,ps.full_time
      ,CONCAT(ps.monday_start, ' - ', ps.monday_end) as monday
      ,CONCAT(ps.tuesday_start, ' - ', ps.tuesday_end) as tuesday
      ,CONCAT(ps.wednesday_start, ' - ', ps.wednesday_end) as wednesday
      ,CONCAT(ps.thursday_start, ' - ', ps.thursday_end) as thursday
      ,CONCAT(ps.friday_start, ' - ', ps.friday_end) as friday
      ,CONCAT(ps.saturday_start, ' - ', ps.saturday_end) as saturday
      ,CONCAT(ps.sunday_start, ' - ', ps.sunday_end) as sunday
      from practitioners p
      join employees e on e.employee_id = p.employee_id
      join practitioner_types pt on pt.id = p.practitioner_type_id
      join employee_schedule ps on ps.employee_id = e.employee_id
      where p.id = ${req.params.id}
  `,
      (err, rows, fields) => {
        res.json(rows[0]);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get('/practitioners/:id/appointments', (req, res) => {
  try {
    connection.query(
      `
 select  a.id
     , DATE_FORMAT(pt.start_time, '%Y-%m-%d') AS appointment_date
     , DATE_FORMAT(pt.start_time, '%H:%i:%s') As appointment_time
     ,CONCAT(p.first_name, ' ', p.last_name) as patient_name
     ,CONCAT(e.first_name, ' ', e.last_name) as practitioner_name
     , x.name
     , pr.id as practitioner_id
     , p.id as patient_id
from appointments a
join appointment_types at on a.appointment_type_id = at.id
join practitioner_timeblocks prt on a.practitioner_timeblock_id = prt.id
join practitioners pr on prt.practitioner_id = pr.id
join employees e on pr.employee_id = e.employee_id
join practitioner_types prty on pr.practitioner_type_id = prty.id
join patients p on a.patient_id = p.id
    join practitioner_timeblocks pt on a.practitioner_timeblock_id = pt.id
join insurance_carrier ic on p.insurance_carrier_id = ic.id
join appointment_types x on x.id = a.appointment_type_id

where pr.id = ${req.params.id}
  `,
      (err, rows, fields) => {
        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/labTestTypes', (req, res) => {
  try {
    connection.query(
      'select id, name, description, lower_bound, upper_bound from lab_test_types',
      (err, rows, fields) => {
        if (err) throw err;

        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post('/labOrders', (req, res) => {
  const {
    appointment_id,
    lab_test_type_id,
    patient_id,
    ordered_by_physician_id,
  } = req.body;

  const query = `INSERT INTO lab_orders (appointment_id, lab_test_type_id, patient_id, ordered_by_physician_id) VALUES (${appointment_id}, ${lab_test_type_id}, ${patient_id}, ${ordered_by_physician_id})`;

  try {
    connection.query(query, (err, rows) => {
      if (err) throw err;

      res.json({ success: true });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/providedBillableServices', (req, res) => {
  const { appointment_id, billable_service_id, patient_id } = req.body;

  const query = `INSERT INTO provided_billable_services (appointment_id, billable_service_id, patient_id) VALUES (${appointment_id}, ${billable_service_id}, ${patient_id})`;

  try {
    connection.query(query, (err, rows) => {
      if (err) throw err;

      res.json({ success: true });
    });
  } catch (error) {
    console.log(error);
  }
});

// This sets up an API endpoint '/practitioners' that will respond to GET requests.
app.get('/medicalEncounters', (req, res) => {
  // Define the SQL query that selects first and last names from the employees table
  // and gets their practitioner type from the practitioner_types table.
  const query = `select distinct m.id
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
    connection.query(query, (err, rows) => {
      // Run the SQL query
      if (err) throw err; // If there is an error, throw it

      res.json(rows); // Send the result (rows) back to the client (your React app) in JSON format
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
    connection.query(query, (err, rows) => {
      // Run the SQL query
      if (err) throw err; // If there is an error, throw it

      res.json(rows); // Send the result (rows) back to the client (your React app) in JSON format
    });
  } catch (error) {
    // If there's an error in running the query or connecting to the database,
    // log the error and send a 500 status (server error) to the client.
    console.log(error);
    res.status(500).send('Server error');
  }
});

app.get('/appointments', (req, res) => {
  const queryA = `select a.id
     , DATE_FORMAT(pt.start_time, '%Y-%m-%d') AS appointment_date
     , DATE_FORMAT(pt.start_time, '%H:%i:%s') As appointment_time
     ,CONCAT(p.first_name, ' ', p.last_name) as patient_name
     ,CONCAT(e.first_name, ' ', e.last_name) as practitioner_name
     , x.name
     , pr.id as practitioner_id
     , p.id as patient_id
from appointments a
    join patients p on p.id = a.patient_id
    join practitioner_timeblocks pt on pt.id = a.practitioner_timeblock_id
    join practitioners pr on pr.id = pt.practitioner_id
    join employees e on e.employee_id = pr.employee_id
    join appointment_types x on x.id = a.appointment_type_id;
`;

  try {
    connection.query(queryA, (err, rows, fields) => {
      if (err) throw err;

      res.json(rows);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/appointments/:id', (req, res) => {
  try {
    connection.query(
      `select a.id
,p.first_name
,p.last_name
, p.id as patient_id
,at.name
,prty.name
,e.first_name
,e.last_name
,e.pager_number
,e.phone_number
,prt.start_time
,prt.end_time
, pr.id as practitioner_id
,ic.name
from appointments a
join appointment_types at on a.appointment_type_id = at.id
join practitioner_timeblocks prt on a.practitioner_timeblock_id = prt.id
join practitioners pr on prt.practitioner_id = pr.id
join employees e on pr.employee_id = e.employee_id
join practitioner_types prty on pr.practitioner_type_id = prty.id
join patients p on a.patient_id = p.id
join insurance_carrier ic on p.insurance_carrier_id = ic.id

where a.id = ${req.params.id}
  `,
      (err, rows, fields) => {
        res.json(rows[0]);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/appointments/:id/billableServices', (req, res) => {
  try {
    connection.query(
      `select bs.description
, bs.cost
, pbs.invoice_id
from billable_services bs
join provided_billable_services pbs on bs.id = pbs.billable_service_id
where pbs.appointment_id = ${req.params.id};`,
      (err, rows, fields) => {
        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/appointments/:id/labOrders', (req, res) => {
  try {
    connection.query(
      `select ltt.name
,ltt.lower_bound
,ltt.upper_bound
,lo.measured_value
, CONCAT(e.first_name, ' ', e.last_name) as lab_technician_name
from lab_orders lo
join lab_test_types ltt on lo.lab_test_type_id = ltt.id
left join practitioners pr on lo.lab_technician_id = pr.id
left join employees e on pr.employee_id = e.employee_id
where lo.appointment_id = ${req.params.id};`,
      (err, rows, fields) => {
        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/insuranceCarriers', (req, res) => {
  try {
    connection.query(
      'select ic.id, ic.name, ic.address,cs.name as status_name from insurance_carrier ic join carrier_status cs on ic.carrier_status_id = cs.id;',
      (err, rows, fields) => {
        if (err) throw err;

        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/insuranceCarriers/:id', (req, res) => {
  try {
    connection.query(
      `select ic.id, ic.name, ic.address,cs.name as status_name from insurance_carrier ic join carrier_status cs on ic.carrier_status_id = cs.id where ic.id = ${req.params.id}`,
      (err, rows, fields) => {
        if (err) throw err;

        res.json(rows[0]);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/insuranceCarriers/:id/invoices', (req, res) => {
  try {
    connection.query(
      `select i.id
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
`,
      (err, rows, fields) => {
        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get('/billableServices', (req, res) => {
  try {
    connection.query(
      'select bs.id, bs.name,bs.cost from billable_services bs',
      (err, rows, fields) => {
        if (err) throw err;

        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get('/appointmentTypes', (req, res) => {
  try {
    connection.query(
      'select id, name from appointment_types',
      (err, rows, fields) => {
        if (err) throw err;

        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// Utility function for handling errors and rolling back transactions
function handleQueryError(err, res, connection, message) {
  console.log('error', err);
  return connection.rollback(() => {
    return res.status(500).json({ error: message, details: err });
  });
}
app.get('/equipment', (req, res) => {
  try {
    connection.query(
      `
SELECT e.id
, et.name
, et.description
, case when e.is_owned = 1 then 'Owned' else 'Leased' end as owned_leased
, es.name as status
, e.department
FROM equipment e
JOIN equipment_types et ON e.equipment_type_id = et.id
JOIN equipment_status es ON e.equipment_status_id = es.id
`,
      (err, rows, fields) => {
        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/equipment/:id', (req, res) => {
  try {
    connection.query(
      `
SELECT e.id
, et.name
, et.description
, case when e.is_owned = 1 then 'Owned' else 'Leased' end as owned_leased
, es.name as status
, le.*
, oe.*
FROM equipment e
JOIN equipment_types et ON e.equipment_type_id = et.id
JOIN equipment_status es ON e.equipment_status_id = es.id
LEFT JOIN leased_equipment le ON e.id = le.equipment_id
LEFT JOIN owned_equipment oe ON e.id = oe.equipment_id
WHERE e.id = ${req.params.id}
`,
      (err, rows, fields) => {
        res.json(rows[0]);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/equipment/:id/maintenance', (req, res) => {
  try {
    connection.query(
      `

SELECT  e.id
, pt.name
, pt.description
, em.resolution
FROM equipment e
JOIN equipment_maintenance em ON e.id = em.equipment_id
jOIN equipment_problem_types pt ON em.equipment_problem_type_id = pt.id
WHERE e.id = ${req.params.id}
`,
      (err, rows, fields) => {
        res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post('/appointments', (req, res) => {
  console.log('post broken?');
  const { appointment_date, appointment_type_id, practitioner_id, patient_id } =
    req.body;
  const newStartTime = new TZDate(appointment_date);
  const newEndTime = new TZDate(
    new Date(appointment_date).setHours(newStartTime.getHours() + 1)
  );
  const dbDate = newStartTime.toISOString().slice(0, 19).replace('T', ' ');
  const dbEndTime = newEndTime.toISOString().slice(0, 19).replace('T', ' ');

  const existingPractitionerTimeblocksQuery = `SELECT * FROM practitioner_timeblocks WHERE practitioner_id = ? FOR UPDATE`;

  connection.beginTransaction((err) => {
    if (err)
      return res
        .status(500)
        .json({ error: 'Transaction start error', details: err });

    connection.query(
      existingPractitionerTimeblocksQuery,
      [practitioner_id],
      (err, existingTimeblocks) => {
        if (err)
          return res.status(500).json({
            error: 'Error fetching existing timeblocks',
            details: err,
          });

        //add offset to newStartTime and newEndTime
        if (
          checkForTimeblockOverlap(existingTimeblocks, newStartTime, newEndTime)
        ) {
          return res.status(400).json({
            error: 'Timeblock overlap',
            details: 'Practitioner already has an appointment at this time',
          });
        }

        // Insert the timeblock and appointment
        insertTimeblock(
          connection,
          practitioner_id,
          dbDate,
          dbEndTime,
          res,
          appointment_type_id,
          patient_id
        );
      }
    );
  });
});

function insertTimeblock(
  connection,
  practitioner_id,
  dbDate,
  dbEndTime,
  res,
  appointment_type_id,
  patient_id
) {
  const insertTimeblockQuery = `INSERT INTO practitioner_timeblocks (practitioner_id, start_time, end_time) VALUES (?, ?, ?)`;

  connection.query(
    insertTimeblockQuery,
    [practitioner_id, dbDate, dbEndTime],
    (err, result) => {
      if (err)
        return handleQueryError(
          err,
          res,
          connection,
          'Error inserting timeblock'
        );

      const practitioner_timeblock_id = result.insertId;
      insertAppointment(
        connection,
        practitioner_timeblock_id,
        appointment_type_id,
        patient_id,
        res
      );
    }
  );
}

function insertAppointment(
  connection,
  practitioner_timeblock_id,
  appointment_type_id,
  patient_id,
  res
) {
  const insertAppointmentQuery = `INSERT INTO appointments (appointment_type_id, patient_id, practitioner_timeblock_id) VALUES (?, ?, ?)`;

  connection.query(
    insertAppointmentQuery,
    [appointment_type_id, patient_id, practitioner_timeblock_id],
    (err, result) => {
      if (err)
        return handleQueryError(
          err,
          res,
          connection,
          'Error inserting appointment'
        );

      const appointment_id = result.insertId;
      updateTimeblockWithAppointment(
        connection,
        practitioner_timeblock_id,
        appointment_id,
        res
      );
    }
  );
}

function updateTimeblockWithAppointment(
  connection,
  practitioner_timeblock_id,
  appointment_id,
  res
) {
  const updateTimeblockQuery = `UPDATE practitioner_timeblocks SET appointment_id = ? WHERE id = ?`;

  connection.query(
    updateTimeblockQuery,
    [appointment_id, practitioner_timeblock_id],
    (err) => {
      if (err)
        return handleQueryError(
          err,
          res,
          connection,
          'Error updating timeblock'
        );

      connection.commit((err) => {
        if (err)
          return handleQueryError(
            err,
            res,
            connection,
            'Transaction commit error'
          );
        res.json({
          message: 'Appointment created successfully',
          appointment_id,
        });
      });
    }
  );
}

//404 page
app.use((req, res) => {
  res.status(404).send('404 page not found');
});

app.listen(4000, () => {
  console.log('listening for requests on port 4000');
});
