const express = require('express');
const {
  checkAndIncrement,
  getLeaderboard,
} = require('../controllers/gameController');
const router = express.Router();
// const dbController = require('../controllers/dbController.js');

router.post('/', checkAndIncrement, getLeaderboard, (req, res) => {
  res.status(201).json(res.locals.response);
});

// TODO

// add endpoint   /check
//   if (message made by ai)
//      increment clickers point column
//   else
//     decrement clicker
//     increment message creators

// const body = {
//   message_id: 'int',
//   sender_id: 'int',
//   user_id: 'int',
// };

module.exports = router;

// const response = {
//   first_place: ['username', 'score'],
//   second_place: ['username', 'score'],
//   third_place: ['username', 'score'],
//   current_user: ['username', 'score'],
// };
