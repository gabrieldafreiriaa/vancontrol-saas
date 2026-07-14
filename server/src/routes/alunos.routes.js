import { Router } from 'express';

const alunosRoutes = Router();

const alunos = [];

alunosRoutes.get('/', (req, res) => {
  return res.json(alunos);
});

alunosRoutes.post('/', (req, res) => {
  const { nome, escola, nomeResponsavel, telefone, valorMensal } = req.body;

  const aluno = {
    id: alunos.length + 1,
    nome,
    escola,
    nomeResponsavel,
    telefone,
    valorMensal,
    status: 'ativo',
    criadoEm: new Date(),
  };

  alunos.push(aluno);

  return res.status(201).json(aluno);
});

alunosRoutes.get('/:id', (req, res) => {
  const { id } = req.params;

  const aluno = alunos.find((aluno) => aluno.id === Number(id));

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado',
    });
  }

  return res.json(aluno);
});

export default alunosRoutes;
