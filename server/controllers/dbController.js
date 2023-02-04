const path = require('path');

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
    res.locals.messages = [
      {
        _id: '1234',
        sender_id: '5678',
        message: 'initial commit',
        time: '2023-02-04T16:53:48.789Z',
      },
    ];
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

module.exports = dbController;
