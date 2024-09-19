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

app.get('/patients', (req, res) => {
  try {
  connection.query('SELECT * FROM patients', (err, rows, fields) => {
    if (err) throw err

    res.json(rows)
  })
} catch (error) {
  console.log(error)
}
})


app.get('/insuranceCarriers', (req, res) => {
  try {
  connection.query('select i.id, i.name, i.address, cs.name from insurance_carrier i join carrier_status cs on i.carrier_status_id = cs.id', (err, rows, fields) => {
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
