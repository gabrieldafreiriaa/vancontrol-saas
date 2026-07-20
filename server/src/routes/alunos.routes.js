/* Routes > define os caminhos da API
   Qual caminho foi chamado? */

import { Router } from 'express'; /*importa o Router para criarmos um grupo separado de rotas ao inves de jogar tudo na main*/

import { alunosController } from '../controllers/alunos.controller.js';

const alunosRoutes = Router();
/* cria um conjunto de rotas chamado alunosRoutes */

alunosRoutes.get('/', alunosController.listar);

alunosRoutes.post('/', alunosController.criar);

alunosRoutes.get('/:id', alunosController.buscarPorID);
/* Rota GET que busca por um aluno especifico pelo id */

export default alunosRoutes;
