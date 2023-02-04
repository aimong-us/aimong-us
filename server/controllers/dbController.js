const db = require('../models/chatroomModels.js');

//this controller will be responsible for the middleWare that controls CRUD to the DB;
const dbController = {};

const createErr = (errObj) => {
  const { method, type, err } = errObj;
  return {
    log: `dbController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in dbController.${method}. Check server logs for more details.`,
    },
  };
};

dbController.getMessages = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM messages';
    const data = await db.query(query);
    res.locals.messages = data.rows;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getMessages',
        type: 'catch all block getting messages',
        err: err,
      })
    );
  }
};

dbController.postMessages = async (req, res, next) => {
  try {
    const { sender_id, message } = req.body;
    const time = Date.now(); // will return the ms ***** come back here for date time *** issues
    //will this leave us vulnerable to SQL Inj? if so, how fix?
    const query = `INSERT INTO messages(sender_id, message) VALUES($1, $2) RETURNING *`;
    const values = [sender_id, message];

    const data = await db.query(query, values);
    res.locals.newMessage = data.rows;

    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'postMessages',
        type: 'catch all block posting messages',
        err: err,
      })
    );
  }
};

module.exports = dbController;
