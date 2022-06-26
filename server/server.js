const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const user = require('./router/user');
const { connect } = require('./db');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const server = express();
const app = next({ dev, dir: './client' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    server.use(cors());
    server.disable('etag');
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    server.use(
      expressSession({
        secret: 'my key',
        resave: false,
        saveUninitialized: false,
      })
    );

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
      connect();
    });

    server.use('/api/user', user);

    server.all('*', (req, res) => handle(req, res));
  })
  .catch((err) => {
    console.log('Error:::::', err);
  });

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    http.get('http://front-dori.herokuapp.com/');
  }, 600000);
}
