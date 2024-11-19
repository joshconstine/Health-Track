The userSeed.js file allows you to create an encrypted seed file to load into the database.
It will spit out the users.sql file which has the passwords encrypted with bcrypt.
in the command line you must run "node userSeed.js" to create a new encrypted seed file if you want to change any of the data.
Since the file has already been created all you need to do is reload your database with the new schema.sql, setup.sql, patients.sql, and users.sql