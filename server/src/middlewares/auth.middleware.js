import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { AppError } from '../errors/app.error.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não informado!', 401);
  }

  const partes = authHeader.split(' ');
  const [tipo, token] = partes;

  if (tipo !== 'Bearer' || !token) {
    throw new AppError('Token inválido', 401);
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    req.usuario = {
      id: payload.usuarioId,
      organizacaoId: payload.organizacaoId,
    };
    return next();
  } catch (error) {
    throw new AppError('Token inválido ou expirado', 401);
  }
}
