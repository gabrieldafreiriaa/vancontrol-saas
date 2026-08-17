/* Controler > recebe requisição e devolvolve resposta 
   O que eu recebi e o que vou responder?*/

import { alunosService } from '../services/alunos.service.js';

async function listar(req, res) {
  const alunos = await alunosService.listarAlunos();

  return res.status(200).json(alunos);
}

async function criar(req, res) {
  const resultado = await alunosService.criarAluno(req.body);

  if (resultado.erro) {
    return res.status(400).json({
      mensagem: resultado.mensagem,
    });
  }

  return res.status(201).json(resultado.aluno);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const aluno = await alunosService.buscarAlunoPorId(id);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.status(200).json(aluno);
}

async function atualizar(req, res) {
  const { id } = req.params;

  const resultado = await alunosService.atualizarAluno(id, req.body);

  if (resultado.erro && resultado.tipo === 'nao_encontrado') {
    return res.status(404).json({
      mensagem: resultado.mensagem,
    });
  }

  if (resultado.erro && resultado.tipo === 'validacao') {
    return res.status(400).json({
      mensagem: resultado.mensagem,
    });
  }

  return res.status(200).json(resultado.aluno);
}

async function inativar(req, res) {
  const { id } = req.params;

  const aluno = await alunosService.inativarAluno(id);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.status(200).json(aluno);
}

async function remover(req, res) {
  const { id } = req.params;

  const aluno = await alunosService.removerAluno(id);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.status(200).json({
    mensagem: 'Aluno excluído com sucesso',
    aluno,
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
