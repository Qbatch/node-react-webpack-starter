import express from 'express';
import validator from 'validator';
import passport from 'passport';

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!payload || typeof payload.age !== 'string' || payload.age.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your age.';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your username.';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res, next) => {
  console.log('\n\nsignup Server Side', '\n\n');
  const validationResult = validateSignupForm(req.body);
  console.log('\n\nvalidationResult = ', validationResult, '\n\n');
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        console.log('\n\nDuplicate Email Found\n\n');
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'This email is already taken.'
        });
      }

      console.log('\n\nCould not process form\n\n');
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    console.log('\n\nYou signed up successfully\n\n');
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    const data = {
      success: true,
      message: 'You have successfully loged in.',
      token,
      id: userData.id
    };

    return res.json(data);
  })(req, res, next);
});

module.exports = router;
