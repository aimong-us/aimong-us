const { query } = require('express');
const db = require('../models/chatroomModels.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

const createErr = (errObj) => {
  const { method, type, err } = errObj;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

userController.verifyUsername = async (req, res, next) => {
  try {
    const { username } = res.locals;
    const values = [username];
    const userQuery = 'SELECT * FROM users WHERE username=$1';
    if (!username)
      return next(
        createErr({
          method: 'verifyUsername',
          type: 'Username in body is invalid',
          err: err,
        })
      );

    const retrievedUsers = await db.query(userQuery, values);
    // console.log('user retrieved', retrievedUsers);

    if (retrievedUsers.rows[0]) {
      res.locals.username = username;
      res.locals.validUser = true;
      return next();
    } else {
      res.locals.validUser = false;
      return next(
        createErr({
          method: 'verifyUsername',
          type: 'Username not found in DB',
          err: err,
        })
      );
    }
  } catch (err) {
    console.log('error in verify user block', err);
    return next(
      createErr({
        method: 'verifyUsername',
        type: 'Catch block in verifyUser failed',
        err: err,
      })
    );
  }
};

userController.verifyPassword = async (req, res, next) => {
  try {
    const { username, password: plaintextPassword } = res.locals;
    console.log(username, plaintextPassword);

    const dbQuery = 'SELECT password from users WHERE username = $1';
    const response = await db.query(dbQuery, [username]);
    if (response.rows.length === 0) {
      return next(
        createErr({
          method: 'verifyPassword',
          type: 'username not found',
        })
      );
    }
    const hash = response.rows[0].password;
    const validPassword = await bcrypt.compare(plaintextPassword, hash);
    res.locals.password = hash;
    res.locals.validPassword = validPassword;
    return next();

    // try {
    //   const { password } = res.locals;
    //   const values = [password];
    //   const passQuery = 'SELECT * FROM users WHERE password=$1';

    //   if (!password)
    //     return next(
    //       createErr({
    //         method: 'verifyPassword',
    //         type: 'Password in body is invalid',
    //         err: err,
    //       })
    //     );

    //   const retrievedUsers = await db.query(passQuery, values);
    //   // console.log('password retrieved', retrievedUsers);

    //   if (retrievedUsers.rows[0]) {
    //     res.locals.password = password;
    //     res.locals.validPassword = true;
    //     return next();
    //   } else {
    //     res.locals.validPassword = false;
    //     return next(
    //       createErr({
    //         method: 'verifyPassword',
    //         type: 'Password not found in DB',
    //         err: err,
    //       })
    //     );
    //   }
  } catch (err) {
    console.log('error in verify password block', err);
    return next({
      message: { err: 'Invalid username or password' },
    });
  }
};

userController.generateSession = (req, res, next) => {
  console.log('generating ssid for session');

  const ssid = uuidv4();

  res.locals.ssid = ssid;
  return next();
};

userController.encryptPassword = async (req, res, next) => {
  try {
    const plaintextPassword = res.locals.password;
    const password = await bcrypt.hash(plaintextPassword, saltRounds);
    // console.log(password);

    res.locals.password = password;
    return next();
  } catch (error) {
    return next(
      createErr({
        method: 'userController.encryptPassword',
        type: 'Error encrypting password',
        err: error,
      })
    );
  }
};

userController.getUserInfoFromBody = (req, res, next) => {
  const { username, password, email } = req.body;
  res.locals = { username, password, email };
  return next();
};

module.exports = userController;
