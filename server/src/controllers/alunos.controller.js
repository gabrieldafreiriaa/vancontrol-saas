/* Controler > recebe requisição e devolvolve resposta 
   O que eu recebi e o que vou responder?*/

import { alunosService } from '../services/alunos.service.js';
import { responderErro } from '../helpers/responderErro.js';

async function listar(req, res) {
  const resultado = await alunosService.listarAlunos();

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(200).json(resultado.alunos);
}

async function criar(req, res) {
  const resultado = await alunosService.criarAluno(req.body);

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(201).json(resultado.aluno);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const resultado = await alunosService.buscarAlunoPorId(id);

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(200).json(resultado.aluno);
}

async function atualizar(req, res) {
  const { id } = req.params;

  const resultado = await alunosService.atualizarAluno(id, req.body);

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(200).json(resultado.aluno);
}

async function inativar(req, res) {
  const { id } = req.params;

  const resultado = await alunosService.inativarAluno(id);

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(200).json(`status : ${resultado.aluno.status}`);
}

async function remover(req, res) {
  const { id } = req.params;

  const resultado = await alunosService.removerAluno(id);

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(200).json({
    mensagem: `Aluno(a) ${resultado.aluno.nome} foi excluído com sucesso`,
  });
}

export const alunosController = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  inativar,
  remover,
};
