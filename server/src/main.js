/* 
===================================
-------CONFIGURA O EXPRESS---------
===================================
*/

import express from 'express';
import cors from 'cors';

import routes from './modules/index.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((req, res) => {
  return res.status(404).json({
    mensagem: 'Rota não encontrada',
  });
});

app.use(errorMiddleware);

export default app;
