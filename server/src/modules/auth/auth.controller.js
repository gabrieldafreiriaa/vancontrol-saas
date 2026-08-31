import { authService } from './auth.service.js';

async function registrar(req, res, next) {
  try {
    const resultado = await authService.registrar(req.validated.body);

    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const resultado = await authService.login(req.validated.body);

    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const usuario = await authService.buscarPerfil(req.usuario.id);

    return res.status(200).json(usuario);
  } catch (error) {
    return next(error);
  }
}

export const authController = {
  registrar,
  login,
  me,
};
