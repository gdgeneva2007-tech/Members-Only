# All Routes:

AUTH ROUTES (routes/auth.js → mounted at /auth)
──────────────────────────────────────────────────────────────────
GET /auth/signup Show signup form to guests only
POST /auth/signup Validate form → hash password → save user → redirect to login
GET /auth/login Show login form to guests only
POST /auth/login Passport checks credentials → create session → redirect to home
POST /auth/logout Destroy session → redirect to home

MESSAGE ROUTES (routes/messages.js → mounted at /messages)
──────────────────────────────────────────────────────────────────
GET /messages/new Show new message form (logged in users only)
POST /messages/new Validate → save message with user id → redirect to home
POST /messages/:id/delete Delete message by id (admins only)

MEMBER ROUTES (routes/member.js → mounted at /member)
──────────────────────────────────────────────────────────────────
GET /member/join Show "enter passcode" form (logged in only)
POST /member/join Check passcode → if correct set is_member=true → redirect home
GET /member/admin Show "enter admin passcode" form (logged in only)
POST /member/admin Check passcode → if correct set is_admin=true → redirect home

INDEX ROUTE (routes/index.js → mounted at /)
──────────────────────────────────────────────────────────────────
GET / Fetch all messages → render home page
non-members see: title, text, "Anonymous"
members + admins see: title, text, author name, date
admins also see: delete button on each message

# Project Structure:

members-only/
├── config/
│ └── passport.js ← passport strategy setup
├── controllers/
│ ├── authController.js ← signup, login, logout
│ ├── messageController.js ← create, delete messages
│ └── memberController.js ← join club, join admin
├── db/
│ ├── pool.js
│ ├── queries.js
│ └── populatedb.js
├── middleware/
│ └── auth.js ← protect routes
├── routes/
│ ├── index.js ← home page
│ ├── auth.js ← signup login logout
│ ├── messages.js ← message routes
│ └── member.js ← membership routes
├── views/
│ ├── partials/
│ │ ├── header.ejs
│ │ └── footer.ejs
│ ├── index.ejs ← home, shows messages
│ ├── signup.ejs
│ ├── login.ejs
│ ├── join-club.ejs ← enter secret passcode
│ ├── new-message.ejs
│ └── error.ejs
├── public/
│ └── css/
│ └── output.css
├── app.js
├── input.css
├── tailwind.config.js
├── .env
├── .env.example
└── .gitignore

# Database design

users table
────────────────────────────────────────────
id SERIAL PRIMARY KEY
first_name VARCHAR(100) NOT NULL
last_name VARCHAR(100) NOT NULL
email VARCHAR(255) NOT NULL UNIQUE ← used as username
password VARCHAR(255) NOT NULL ← stores the HASH not plain text
is_member BOOLEAN DEFAULT FALSE ← joins club with passcode
is_admin BOOLEAN DEFAULT FALSE ← admin privileges

messages table
────────────────────────────────────────────
id SERIAL PRIMARY KEY
title VARCHAR(255) NOT NULL
text TEXT NOT NULL
created_at TIMESTAMP DEFAULT NOW()
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
← if user deleted, their messages delete too

# Where does authentication go?

Authentication (WHO are you?) → ROUTES
Authorization (WHAT can you do?) → ROUTES

The middleware functions from middleware/auth.js
are used in ROUTES, not controllers.

Controllers never import middleware/auth.js
Routes always import middleware/auth.js

Route = GATEKEEPER (should this person even enter?)
Controller = WORKER (do the actual work)

Checking "are you logged in?" is the GATEKEEPER's job.
If you fail the check, the worker never even runs.

routes/messages.js
router.get("/new", ensureLoggedIn, getNewMessageForm)
// ↑ gatekeeper ↑ worker
// runs first only runs if gatekeeper passes

The Controller stays clean

# JOIN query - all in one single database call

SELECT
messages.\*,
users.first_name,
users.last_name
FROM messages
INNER JOIN users ON messages.user_id = users.id;

# Get data from .env

process.env.SESSION_SECRET

# Restart the dev server after every .env change
