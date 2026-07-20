/* 
===================================
-------CONFIGURA O EXPRESS---------
===================================
*/

import express from 'express';
import cors from 'cors';

import alunosRoutes from './routes/alunos.routes.js';

const app = express();

app.use(cors()); // permite que mais de uma porta utilize a API
app.use(express.json()); // implementação de json no  body

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    message: 'VanControl API running',
  });
});
// controla a rota de teste da API

app.use('/alunos', alunosRoutes); // Tudo que começar com /alunos vai para alunosRoutes

export default app;
