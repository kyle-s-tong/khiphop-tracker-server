import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './router';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3000);
console.log('Server listening on port 3000');
