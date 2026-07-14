import express from 'express';
import cors from 'cors';

import alunosRoutes from './routes/alunos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    message: 'VanControl API running',
  });
});

app.use('/alunos', alunosRoutes);

export default app;
