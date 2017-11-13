import jwt from 'jsonwebtoken';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { User } from '../models/database';
import config from '../../config/index.json';

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({
    where: { email: userData.email }
  }).then((user) => {
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    return bcrypt.compare(password, user.password, (passwordErr, isMatch) => {
      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user.id
      };

      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        id: user.id
      };

      return done(null, token, data);
    });
  }).catch(err => done(err));
});
