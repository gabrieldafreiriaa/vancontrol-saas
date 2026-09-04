import { Router } from 'express';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validateMiddleware } from '../../middlewares/validate.middleware.js';
import { responsaveisController } from './responsaveis.controller.js';
import {
  atualizarResponsavelSchema,
  criarResponsavelSchema,
  idResponsavelSchema,
} from './responsaveis.validators.js';

const responsaveisRoutes = Router();

responsaveisRoutes.use(authMiddleware);

responsaveisRoutes.get('/', responsaveisController.listar);

responsaveisRoutes.post(
  '/',
  validateMiddleware(criarResponsavelSchema),
  responsaveisController.criar,
);

responsaveisRoutes.get(
  '/:id',
  validateMiddleware(idResponsavelSchema),
  responsaveisController.buscarPorId,
);

responsaveisRoutes.put(
  '/:id',
  validateMiddleware(atualizarResponsavelSchema),
  responsaveisController.atualizar,
);

responsaveisRoutes.patch(
  '/:id/inativar',
  validateMiddleware(idResponsavelSchema),
  responsaveisController.inativar,
);

export default responsaveisRoutes;
