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
  return next();
};

gameController.getLeaderboard = async (req, res, next) => {
  // store top 3 in res.locals
  const { user_id } = req.body;
  const query =
    'SELECT * FROM (SELECT user_id, username, points FROM users ORDER BY points DESC LIMIT 3) AS test UNION ALL SELECT user_id, username, points FROM users WHERE user_id = $1;';
  const values = [user_id];
  const { rows } = await db.query(query, values);

  // res.locals.response = rows

  // format response data
  res.locals.response = {
    first_place: [rows[0].username, rows[0].points],
    second_place: [rows[1].username, rows[1].points],
    third_place: [rows[2].username, rows[2].points],
    current_user: [rows[3].username, rows[3].points],
  };
  return next();
};

module.exports = gameController;
