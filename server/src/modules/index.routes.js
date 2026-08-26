import { Router } from 'express';

import healthRoutes from './health/health.routes.js';

const routes = Router();

routes.use('/health', healthRoutes);

export default routes;
