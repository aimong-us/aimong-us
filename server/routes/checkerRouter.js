const express = require('express');
const {} = require('../controllers/checkerController');
const router = express.Router();
// const dbController = require('../controllers/dbController.js');

router.use(
  '/',
  /** controllers */ (req, res) => {
    res.status(201).json({});
  }
);

// TODO

// add endpoint   /check
//   if (message made by ai)
//      increment clickers point column
//   else
//     decrement clicker
//     increment message creators

module.exports = router;
