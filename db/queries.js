// db/queries.js
// TEMPLATE: getUserByEmail and getUserById are always needed
// Add your project-specific queries below

const pool = require("./pool");

// ── REQUIRED BY PASSPORT - do not remove ──────────────

async function getUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function createUser(user) {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, first_name, last_name, email`,
    [user.firstName, user.lastName, user.email, user.password]
  );
  return rows[0];
}

// ── ADD YOUR PROJECT-SPECIFIC QUERIES BELOW ───────────


// ──────────────────────────────────────────────────────

module.exports = {
  getUserByEmail,
  getUserById,
  createUser
  // add your functions here
};