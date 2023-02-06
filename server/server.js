require('dotenv').config();
const exp = require('constants');
const path = require('path');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// console.log(io);

// const io = require('socket.io')(3001);

const PORT = 3000;
const DB_KEY = process.env.DB_KEY;

const routerAPI = require('./routes/api.js');
const userController = require('./controllers/userController.js');
const dbController = require('./controllers/dbController.js');
const cookieController = require('./controllers/cookieController.js');

app.use(express.json());
app.use(cookieParser());

app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));

app.use('/api', routerAPI);

app.get('/login', (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'client', 'login.html'));
});

app.get('/signup', (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'client', 'signup.html'));
});

app.post(
  '/login',
  userController.getUserInfoFromBody,
  userController.verifyUsername,
  userController.verifyPassword,
  userController.generateSession,
  dbController.storeSsid,
  cookieController.setSsidCookie,
  (req, res) => {
    // console.log(res.locals);
    res.status(302).redirect('/');
  }
);

app.post(
  '/signup',
  userController.getUserInfoFromBody,
  userController.encryptPassword,
  dbController.postUser,
  userController.generateSession,
  dbController.storeSsid,
  cookieController.setSsidCookie,
  (req, res) => {
    // console.log(res.locals);
    res.status(302).redirect('/');
  }
);

app.get(
  '/',
  //TODO: check for session cookie and redirect to login if missing
  cookieController.getSsidCookie,
  cookieController.verifySsidCookie,
  // validate cookie on database (query users for that ssid, see if you get anything back)
  (req, res) =>
    res
      .status(200)
      .sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
);

// WEBSOCKETS
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('send-message', async (body) => {
    console.log(body);

    const data = await dbController.sendMessageFromSocket(body);
    console.log(data);
    body.message;

    io.emit('receive-message', data);
  });
});

//catch-all route
app.use('/', (req, res, next) =>
  //TODO add a 404 page to route to
  next({
    log: 'Express catch all handler caught unknown route',
    status: 404,
    message: { err: 'Route not found' },
  })
);

const defaultErr = {
  log: 'Express error handler caught an unknown middleware error',
  status: 400,
  message: { err: 'An error occurred' },
};

app.use((err, req, res, next) => {
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
