import { Router } from 'express';

const healthRoutes = Router();

healthRoutes.get('/', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'VanControl API running',
  });
});

export default healthRoutes;
