const express = require('express')
const next = require('next')

/* Connect to postgresql database */
const { pool } = require('../dbConfig');

const bcrypt = require("bcrypt");

/* Initialize passportJS as middleware */
const passport = require("passport");
const initializePassport = require('../passportConfig');
initializePassport(passport);

const flash = require('express-flash');


const session = require("express-session");

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
const handle = app.getRequestHandler()



app.prepare().then(() => {
  const server = express();
  
  // parse application/json
  server.use(express.json());

  // parse application/x-www-form-urlencoded
  server.use(express.urlencoded({ extended: true }));

  //use sessions
  server.use(session({
    secret: 'secret',
    resave: false, // does not resave session variables if info unchanged
    saveUninitialized: false // session not saved if no values provided
  }));

  //use passport
  server.use(passport.initialize());
  server.use(passport.session());

  //use flash
  server.use(flash());

  
  /* POST METHODS */

  /* Register User */
  server.post("/register", async (req, res) => {
    const {name, email, password, password2} = req.body;
    console.log('req.body', req.body)
    let errors = [];

    if (!name || !email || !password || !password2) {
      errors.push("Please enter all fields");
    };

    if (password.length < 1) { ////////NEED TO CHANGE BACK TO 6
      errors.push("Password should be at least 6 characters");
    };

    if (password != password2) {
      errors.push("Passwords do not match");
    };

    if (errors.length > 0) {
      return res.json({ errors })
    } else {
      // Form validation has passed
      let hashedPassword = await bcrypt.hash(password, 10);

      pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
        if (err) {throw err};
        console.log('EMAIL EXISTS', results.rows);

        if (results.rows.length > 0) {
            errors.push({ message: "Email already exists"});
            return res.json({ errors: errors[0].message });
        } else {
            pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`, [name, email, hashedPassword], (err, results) => {
                if (err) { throw err };
                console.log(results.rows)
                return res.json({ success_msg: "You are now registered. Please login." });
            })
        }
      }) 
    }
  });

  /* Login User */
  server.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) { throw err };
      if (!user) {
        res.json({ errors: "No user exists" })
      } else {
        req.logIn(user, (err) => {
          if (err) { throw err };
          res.json({ success_msg: JSON.stringify(req.user)})
          console.log('user', req.user);
        })
      }

    })(req, res, next);
  });


  server.post("/logout", (req, res) => {
    console.log(req.body)
    req.logOut(); //passportJS function
    res.json({ success_msg: "You have logged out"})
  })


  /* Check if user authenticated to access routes */
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { //passportJS function
        return res.redirect("/user/dashboard");
    };
    next();
  };

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect("/login");
  }


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});