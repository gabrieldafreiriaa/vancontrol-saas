import { alunosService } from '../services/alunos.service.js';

function listar(req, res) {
  const alunos = alunosService.listarAlunos();

  return res.json(alunos);
}

function criar(req, res) {
  const aluno = alunosService.criarAluno(req.body);

  return res.status(201).json(aluno);
}

function buscarPorID(req, res) {
  const { id } = req.params;

  const aluno = alunosService.buscarAlunoPorID(id);

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.json(aluno);
}

export const alunosController = {
  listar,
  criar,
  buscarPorID,
};
