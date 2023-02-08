const db = require('../models/chatroomModels.js');

const gameController = {};

gameController.checkAndIncrement = async (req, res, next) => {
  const { sender_id, user_id } = req.body;
  // if message was written by AI, increment user's point column
  if (sender_id === '1') {
    const query = 'UPDATE users SET points = points + 1 WHERE user_id = $1;';
    const values = [user_id];
    await db.query(query, values);
    // if not written by ai, increment message sender's point column
  } else {
    const query = 'UPDATE users SET points = points + 1 WHERE user_id = $1;';
    const values = [sender_id];
    await db.query(query, values);
  }
  return next()
};

gameController.getLeaderboard = async (req, res, next) => {
  // store top 3
  // SELECT points, username FROM user_table Order BY points Descending LIMIT 3
  const query = 'SELECT username, points FROM users ORDER BY points DESC LIMIT 3;'

  res.locals.response = await db.query(query, values);
  // if user_id isn't in there
  // add it

  return next();
};

module.exports = gameController;
