const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController.js');

router.get('/messages', dbController.getMessages, (req, res) => {
  return res.status(200).json({ messages: res.locals.messages });
});

router.post('/messages', dbController.postMessages, (req, res) => {
  return res.status(201).json({ messages: res.locals.newMessage });
});

module.exports = router;
