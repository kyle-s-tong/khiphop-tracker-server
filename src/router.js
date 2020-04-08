import { Router } from 'express';

import artistRoutes from './routes/artists';

const router = new Router();

router.use('/artists', artistRoutes);

export default router;