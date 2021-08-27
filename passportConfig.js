const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');

const authenticateUser = (email, password, done) => {
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
        if (err) {throw err};
        console.log(results.rows);

        if (results.rows.length > 0) {
            const user = results.rows[0];
            //bcrypt compares password with db queried password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {throw err};
                if (isMatch) {
                    return done(null, user); //returns user, stores it in session cookie object
                } else { //if password incorrect
                    return done(null, false, { message: "Password is not correct" }) //done function stores error messages in "error" array in server.js
                }
            })
        } else { //if no users in DB
            return done(null, false, { message: "Email is not registered" });
        }
    })
}
/* Initialize local strategy */
function initialize(passport) {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticateUser));

    //stores the user ID in the session cookie
    passport.serializeUser((user, done) => done(null, user.id)); 

    // takes the user id to get the user details from the DB
    passport.deserializeUser((id, done) => { 
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {throw err};
            //stores full object into the session
            return done(null, results.rows[0]) 
        })
    })
};

module.exports = initialize;