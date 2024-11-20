const bcrypt = require('bcryptjs');
const fs = require('fs');

// Example seed data with plain-text passwords
const seedData = [
  {
    employee_id: 1,
    username: 'john.doe',
    password: 'password123',
    is_active: true,
  },
  {
    employee_id: 2,
    username: 'jane.smith',
    password: 'qwerty123',
    is_active: true,
  },
  {
    employee_id: 3,
    username: 'michael.brown',
    password: 'letmein456',
    is_active: false,
  },
  {
    employee_id: 4,
    username: 'emily.johnson',
    password: 'passw0rd',
    is_active: true,
  },
  {
    employee_id: 5,
    username: 'sarah.lee',
    password: '12345678',
    is_active: true,
  },
  {
    employee_id: 6,
    username: 'james.taylor',
    password: 'ilovecats',
    is_active: true,
  },
  {
    employee_id: 7,
    username: 'linda.williams',
    password: 'monkey123',
    is_active: true,
  },
  {
    employee_id: 8,
    username: 'robert.miller',
    password: 'abc123456',
    is_active: true,
  },
  {
    employee_id: 9,
    username: 'david.m',
    password: 'sunshine',
    is_active: true,
  },
  {
    employee_id: 10,
    username: 'jennifer.g',
    password: 'football',
    is_active: true,
  },
];

// Function to hash passwords and generate seed SQL
async function generateHashedSeed() {
  const hashedData = [];

  for (const user of seedData) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password with 10 salt rounds
    hashedData.push({
      ...user,
      password_hash: hashedPassword, // Add hashed password
    });
  }

  // Generate SQL INSERT statements
  const seedSQL = hashedData
    .map(
      (user) =>
        `INSERT INTO user_credentials (employee_id, username, password_hash, is_active) VALUES (${
          user.employee_id
        }, '${user.username}', '${user.password_hash}', ${
          user.is_active ? 1 : 0
        });`
    )
    .join('\n');

  // Write to a file
  fs.writeFileSync('users.sql', seedSQL);

  console.log('Seed data with hashed passwords has been generated!');
}

generateHashedSeed();
