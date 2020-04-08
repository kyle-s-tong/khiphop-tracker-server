import express from 'express';
import dotenv from 'dotenv';

import router from './router';

dotenv.config();

const app = express();

app.use(router);

app.listen(3000);
