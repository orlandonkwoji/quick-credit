import morgan from 'morgan';
import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import users from './routers/user';

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

/**
 * API routes
 */
app.use(express.static(path.join('UI')));
app.use('/api/v1/auth', users);

// Home page route
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: 'Quick Credit home route',
    },
  });
});

// Handle non exist route with with proper message
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Wrong request. Route does not exist',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to server on port ${PORT}`);
});

module.exports = app;
