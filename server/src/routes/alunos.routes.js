import { Router } from 'express';

import { alunosController } from '../controllers/alunos.controller.js';

const alunosRoutes = Router();

alunosRoutes.get('/', alunosController.listar);

alunosRoutes.post('/', alunosController.criar);

alunosRoutes.get('/:id', alunosController.buscarPorID);

export default alunosRoutes;
