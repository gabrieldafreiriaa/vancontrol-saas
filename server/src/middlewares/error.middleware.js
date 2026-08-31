import { AppError } from '../errors/app.error.js';
import { env } from '../config/env.js';

export function errorMiddleware(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      mensagem: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    mensagem: 'Erro interno do servidor',
    detalhe: env.NODE_ENV === 'development' ? error.message : undefined,
  });
}
