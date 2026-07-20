/* Services > executa a lógica/regra de negocio 
   Qual regra/lógica precisa acontecer?*/

const alunos = [];

function listarAlunos() {
  return alunos;
}

function criarAluno(dadosDoAluno) {
  const { nome, escola, nomeResponsavel, telefone, valorMensal } = dadosDoAluno; // desestruturação

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

  alunos.push(aluno); /* adiciona aluno no array de alunos */

  return aluno;
}

function buscarAlunoPorID(id) {
  const aluno = alunos.find((aluno) => aluno.id === Number(id)); // find() procura um item

  return aluno; // service devolve o aluno para o array em controle
}

export const alunosService = {
  listarAlunos,
  criarAluno,
  buscarAlunoPorID,
};
