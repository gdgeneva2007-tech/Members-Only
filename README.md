# Final template structure:

express-auth-template/
├── config/
│ └── passport.js ← TEMPLATE, never changes
├── controllers/
│ └── authController.js ← TEMPLATE, never changes
├── db/
│ ├── pool.js ← TEMPLATE, never changes
│ ├── queries.js ← TEMPLATE starter, add your queries
│ └── populatedb.js ← TEMPLATE starter, add your tables
├── middleware/
│ └── auth.js ← TEMPLATE, never changes
├── routes/
│ ├── index.js ← TEMPLATE starter
│ └── auth.js ← TEMPLATE, never changes
├── views/
│ ├── partials/
│ │ ├── header.ejs ← TEMPLATE, change app name
│ │ └── footer.ejs ← TEMPLATE, change app name
│ ├── index.ejs ← TEMPLATE starter
│ ├── signup.ejs ← TEMPLATE, never changes
│ ├── login.ejs ← TEMPLATE, never changes
│ └── error.ejs ← TEMPLATE, never changes
├── public/
│ └── css/
│ └── output.css
├── app.js ← TEMPLATE, add your routers
├── input.css ← TEMPLATE, never changes
├── tailwind.config.js ← TEMPLATE, never changes
├── .env.example ← TEMPLATE, add your variables
├── .gitignore ← TEMPLATE, never changes
└── package.json ← TEMPLATE, never changes
