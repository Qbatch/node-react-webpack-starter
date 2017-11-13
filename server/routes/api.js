import express from 'express';

import { User } from '../../server/models/database';

const router = new express.Router();

router.get('/users/:userId', (req, res) => {
  console.log('\n\nFetch User ', req.params);
  User.findById(req.params.userId).then((user) => {
    res.json(user);
  });
});

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

module.exports = router;
