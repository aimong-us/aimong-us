const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController.js');

router.get('/messages', dbController.getMessages, (req, res) => {
  return res.status(200).json({ messages: res.locals.messages });
});

module.exports = router;
