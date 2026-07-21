/* Controler > recebe requisição e devolvolve resposta 
   O que eu recebi e o que vou responder?*/

import { alunosService } from '../services/alunos.service.js';

function listar(req, res) {
  const alunos = alunosService.listarAlunos();

  return res.status(200).json(alunos);
}
/* chamada quando fazemos o GET/alunos */

function criar(req, res) {
  const aluno = alunosService.criarAluno(req.body);

  return res.status(201).json(aluno);
}
/* chamada quando fazemos o POST/alunos */

function buscarPorID(req, res) {
  const { id } = req.params;

  const aluno = alunosService.buscarAlunoPorID(id);
  /* chamda quando fazemos o GET/alunos/id */

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }
  /* se aluno não existir */
  return res.json(aluno);
}

function atualizar(req, res) {
  const { id } = req.params;

  const aluno = alunosService.atualizarAluno(id, req.body);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.status(200).json(aluno);
}

function inativar(req, res) {
  const { id } = req.params;

  const aluno = alunosService.inativarAluno(id);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.status(200).json(aluno);
}

function remover(req, res) {
  const { id } = req.params;

  const aluno = alunosService.removerAluno(id);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'aluno não encontrado',
    });
  }
  return res.status(200).json({
    mensagem: 'Aluno excluido com sucesso',
    aluno,
  });
}

export const alunosController = {
  listar,
  criar,
  buscarPorID,
  atualizar,
  inativar,
  remover,
};
/* */
