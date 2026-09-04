import { responsaveisService } from './responsaveis.service.js';

async function listar(req, res, next) {
  try {
    const responsaveis = await responsaveisService.listar(
      req.usuario.organizacaoId,
    );
    return res.status(200).json(responsaveis);
  } catch (error) {
    return next(error);
  }
}

async function criar(req, res, next) {
  try {
    const responsavel = await responsaveisService.criar(
      req.validated.body,
      req.usuario.organizacaoId,
    );

    return res.status(201).json(responsavel);
  } catch (error) {
    return next(error);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const responsavel = await responsaveisService.buscarPorId(
      req.validated.params.id,
      req.usuario.organizacaoId,
    );

    return res.status(200).json(responsavel);
  } catch (error) {
    return next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const responsavel = await responsaveisService.atualizar(
      req.validated.params.id,
      req.validated.body,
      req.usuario.organizacaoId,
    );

    return res.status(200).json(responsavel);
  } catch (error) {
    return next(error);
  }
}

async function inativar(req, res, next) {
  try {
    const responsavel = await responsaveisService.inativar(
      req.validated.params.id,
      req.usuario.organizacaoId,
    );

    return res.status(200).json(responsavel);
  } catch (error) {
    return next(error);
  }
}

export const responsaveisController = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  inativar,
};
