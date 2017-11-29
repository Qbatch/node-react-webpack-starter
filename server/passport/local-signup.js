import { Strategy as PassportLocalStrategy } from 'passport-local';

import { createUser } from '../models/database';

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  createUser(
    req.body.name.trim(),
    parseInt(req.body.age.trim(), 10),
    req.body.username.trim(),
    req.body.password.trim(),
    req.body.email.trim(),
    req.body.role.trim(),
    (err) => {
      if (err) { return done(err); }

      return done(null);
    }
  );
});
