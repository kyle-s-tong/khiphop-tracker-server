import { Router } from 'express';

import artistRoutes from './routes/artists';
import albumRoutes from './routes/albums';

const router = new Router();

router.use('/artists', artistRoutes);
router.use('/albums', albumRoutes);

export default router;
