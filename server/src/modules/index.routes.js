import { Router } from 'express';

import healthRoutes from './health/health.routes.js';
import authRoutes from './auth/auth.routes.js';
import responsaveisRoutes from './responsaveis/responsaveis.routes.js';

const routes = Router();

routes.use('/health', healthRoutes);
routes.use('/auth', authRoutes);
routes.use('/responsaveis', responsaveisRoutes);

export default routes;
