// db/queries.js
// TEMPLATE: getUserByEmail and getUserById are always needed
// Add your project-specific queries below

const pool = require("./pool");

// ── REQUIRED BY PASSPORT - do not remove ──────────────

async function getUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
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
async function getAllMessages(){
  const {rows}=await pool.query(
    `SELECT messages.*,users.first_name,users.last_name FROM messages INNER JOIN users ON messages.user_id=users.id`
  )
  return rows;
}

async function getOneMessage(id){
  const {rows}=await pool.query("SELECT messages.*, users.first_name,users.last_name FROM messages INNER JOIN users ON messages.user_id=users.id WHERE messages.id=$1",[id])
  return rows[0]
}

async function createMessage(userId,msg){
  await pool.query(`INSERT INTO messages (title,text,user_id) VALUES ($1,$2,$3)`,[msg.title,msg.text,userId])
}

async function deleteMessage(id){
  await pool.query("DELETE FROM messages WHERE id=$1",[id])
}

async function findMessageById(id){
  const {rows}=await pool.query("SELECT * FROM messages WHERE id=$1",[id])
  return rows[0];
}

async function joinMembers(id){
  await pool.query("UPDATE users SET is_member=true WHERE id=$1",[id])
}

async function joinAdmins(id){
  await pool.query("UPDATE users SET is_admin=true WHERE id=$1",[id])
}

// ──────────────────────────────────────────────────────

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  getAllMessages,getOneMessage,createMessage,deleteMessage,findMessageById,
  joinMembers,joinAdmins
  // add your functions here
};