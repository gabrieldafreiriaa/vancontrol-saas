import { Router } from 'express';

import { authController } from './auth.controller.js';
import { validateMiddleware } from '../../middlewares/validate.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import {
  loginUsuarioSchema,
  registrarUsuarioSchema,
} from './auth.validators.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateMiddleware(registrarUsuarioSchema),
  authController.registrar,
);

authRoutes.post(
  '/login',
  validateMiddleware(loginUsuarioSchema),
  authController.login,
);

authRoutes.get('/me', authMiddleware, authController.me);

export default authRoutes;
