const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController.js');

router.get('/messages', dbController.getMessages, (req, res) => {
  return res.status(200).json({ messages: res.locals.messages });
});

router.post('/messages', dbController.postMessages, (req, res) => {
  return res.status(201).json({ messages: res.locals.newMessage });
});

// get a full list of users
router.get('/users', dbController.getUsers, (req, res) => {
  return res.status(200).json({ users: res.locals.users });
});

router.get('/users/:username', dbController.getUserByUsername, (req, res) => {
  const { user } = res.locals;
  return res.status(200).json(user);
});

// create a new user with username, password and email...
router.post('/users', dbController.postUser, (req, res) => {
  const { user } = res.locals;

  return res.status(201).json(user);
});

module.exports = router;
