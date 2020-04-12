import express from 'express';
import {} from 'dotenv/config';
import bodyParser from 'body-parser';

import router from './router';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());

app.use(router);

app.listen(3000);
console.log('Server listening on port 3000');
