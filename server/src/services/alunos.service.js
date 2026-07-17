const alunos = [];

function listarAlunos() {
  return alunos;
}

function criarAluno(dadosDoAluno) {
  const { nome, escola, nomeResponsavel, telefone, valorMensal } = dadosDoAluno;

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

  return aluno;
}

function buscarAlunoPorID(id) {
  const aluno = alunos.find((aluno) => aluno.id === Number(id));

  return aluno;
}

export const alunosService = {
  listarAlunos,
  criarAluno,
  buscarAlunoPorID,
};
