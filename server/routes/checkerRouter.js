const express = require('express');
const {
  checkAndIncrement,
  getLeaderboard,
  resetLeaderBoard,
} = require('../controllers/gameController');
const router = express.Router();

// TODO impliment get endpoint
router.get('/', getLeaderboard, (req, res) => {
  res.status(200).json(res.locals.response);
});

router.post(
  '/',
  checkAndIncrement,
  resetLeaderBoard,
  getLeaderboard,
  (req, res) => {
    res.status(201).json(res.locals.response);
  }
);

module.exports = router;
