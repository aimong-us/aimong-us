require('dotenv').config();
const exp = require('constants');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_KEY = process.env.DB_KEY;

const routerAPI = require('./routes/api.js');

app.use(express.json());

app.use('/api', routerAPI);

//production env build routes for homepage, static files
if (process.env.NODE_ENV === 'production') {
  app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));
  app.get('/', (req, res) =>
    res
      .status(200)
      .sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
  );
}

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

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
