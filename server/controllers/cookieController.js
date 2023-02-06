const db = require('../models/chatroomModels.js');

const cookieController = {};

const createErr = (errObj) => {
  const { method, type, err } = errObj;
  return {
    log: `cookieController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in cookieController.${method}. Check server logs for more details.`,
    },
  };
};

cookieController.setSsidCookie = (req, res, next) => {
  try {
    const { ssid } = res.locals;
    res.cookie('ssid', ssid, { httpOnly: true });
    return next();
  } catch (error) {
    return next(
      createErr({
        method: 'cookieController.setSsidCookie',
        type: 'problem generating SSID cookie',
        err: err,
      })
    );
  }
};

cookieController.getSsidCookie = (req, res, next) => {
  try {
    const { ssid } = req.cookies;

    if (!ssid) {
      res.redirect('/login');
    }

    res.locals.ssid = ssid;
    return next();
  } catch (error) {
    return next(
      createErr({
        method: 'cookieController.getSsidCookie',
        type: 'problem getting cookie for verification',
        err: err,
      })
    );
  }
};

cookieController.verifySsidCookie = async (req, res, next) => {
  try {
    const { ssid } = res.locals;
    const values = [ssid];
    // console.log(values);
    const query = 'SELECT * FROM users WHERE ssid = $1';

    const user = await db.query(query, values);
    // console.log('user: ', user.rows);

    if (user.rows[0]) {
      res.locals.username = user.rows[0].username;
      res.locals.isValidSession = true;
      console.log('cookie verified!');
      return next();
    } else {
      res.locals.isValidSession = false;
      res.redirect('/login');
      return next(
        createErr({
          method: 'cookieController.verifySsidCookie',
          type: 'no session found',
          err: err,
        })
      );
    }
  } catch (error) {
    return next(
      createErr({
        method: 'cookieController.verifySsidCookie',
        type: 'problem verifying cookie',
        err: error,
      })
    );
  }
};

module.exports = cookieController;
