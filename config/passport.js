// config/passport.js
// TEMPLATE: only change usernameField if you use something other than "email"

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // DEBUG 1: did passport receive the form values?
        console.log("=== PASSPORT LOGIN ATTEMPT ===");
        console.log("Email received:", email);
        console.log("Password received:", password);

        const user = await db.getUserByEmail(email);

        // DEBUG 2: did we find the user in the database?
        console.log("User found in database:", user);

        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        // DEBUG 3: what are we comparing?
        console.log("Comparing:");
        console.log("  Plain password from form:", password);
        console.log("  Hashed password from db:", user.password);

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;