import express from 'express';
import {} from 'dotenv/config';
import bodyParser from 'body-parser';

import router from './router';

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3000);
console.log('Server listening on port 3000');
