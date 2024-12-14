const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const Author = require('../models/author');

const validateRegisterInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

/**
 * Sign up route
 * @ POST /api/author/signup
 */

router.post('/signup', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      token: null,
      _id: null,
      email: null,
      userName: null,
      msg: errors.msg,
    });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await Author.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        token: null,
        _id: null,
        email: null,
        userName: null,
        msg: 'Account already exists!',
      });
    }

    const newUser = new Author({ email });
    await newUser.setPassword(password); // Call the async method directly
    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      _id: savedUser._id,
      email: savedUser.email,
      msg: 'Success! Go To Login!',
    });
  } catch (err) {
    console.error('Error in signup route:', err);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
});

/**
 * Login route
 * @ POST /api/author/login
 */

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json({
      success: false,
      token: null,
      _id: null,
      email: null,
      userName: null,
      msg: errors.msg,
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  Author.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        token: null,
        _id: null,
        email: null,
        userName: null,
        msg: 'Email not found. Please Sign Up!',
      });
    }
    //Check Password
    user.comparePassword(password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              id: user.id,
              email: user.email,
            });
          }
        );
      } else {
        return res.status(400).json({
          success: false,
          token: null,
          _id: null,
          email: null,
          userName: null,
          msg: 'Password incorrect',
        });
      }
    });
  });
});

module.exports = router;
