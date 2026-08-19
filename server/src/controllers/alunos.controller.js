/* Controler > recebe requisição e devolvolve resposta 
   O que eu recebi e o que vou responder?*/

import { alunosService } from '../services/alunos.service.js';

function responderErro(res, resultado) {
  if (resultado.tipo === 'id_invalido') {
    return res.status(400).json({
      mensagem: resultado.mensagem,
    });
  }

  if (resultado.tipo === 'validacao') {
    return res.status(400).json({
      mensagem: resultado.mensagem,
    });
  }

  if (resultado.tipo === 'nao_encontrado') {
    return res.status(404).json({
      mensagem: resultado.mensagem,
    });
  }

  return res.status(500).json({
    mensagem: 'Erro interno do servidor',
  });
}

async function listar(req, res) {
  const alunos = await alunosService.listarAlunos();

  return res.status(200).json(alunos);
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

  return res.status(200).json(aluno);
}

async function remover(req, res) {
  const { id } = req.params;

  const resultado = await alunosService.removerAluno(id);

  if (resultado.erro) {
    return responderErro(res, resultado);
  }

  return res.status(200).json(aluno);
}

export const alunosController = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  inativar,
  remover,
};
