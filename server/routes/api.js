const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');
const aiController = require('../controllers/aiController.js');


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

//get user_id by SSID cookie
router.get(
  '/user_id',
  cookieController.getSsidCookie,
  cookieController.verifySsidCookie,
  dbController.getUserBySsid,
  (req, res) => {
    const { user_id } = res.locals;
    return res.status(200).json({ user_id: user_id });
  }
);

// create a new user with username, password and email...
router.post('/users', dbController.postUser, (req, res) => {
  const { user } = res.locals;

  return res.status(201).json(user);
});

router.post(
  '/ai-message',
   dbController.getMessages,
   aiController.getAiMessage,
   dbController.postMessages,
   (req,res) =>{
    return res.sendStatus(204);
   })

module.exports = router;
