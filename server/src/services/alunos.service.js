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

function atualizarAluno(id, dadosAtualizados) {
  const aluno = buscarAlunoPorID(id);

  if (!aluno) {
    return null;
  }

  aluno.nome = dadosAtualizados.nome;
  aluno.escola = dadosAtualizados.escola;
  aluno.nomeResponsavel = dadosAtualizados.nomeResponsavel;
  aluno.telefone = dadosAtualizados.telefone;
  aluno.valorMensal = dadosAtualizados.valorMensal;
  aluno.atualizadoEm = new Date();

  return aluno;
}

function inativarAluno(id) {
  const aluno = buscarAlunoPorID(id);

  if (!aluno) {
    return null;
  }

  aluno.status = 'inativo';
  aluno.atualizadoEm = new Date();

  return aluno;
}

function removerAluno(id) {
  const indiceAluno = alunos.findIndex((aluno) => aluno.id === Number(id));

  if (indiceAluno === -1) {
    return null;
  }

  const alunoRemovido = alunos.splice(indiceAluno, 1);

  return alunoRemovido[0];
}

export const alunosService = {
  listarAlunos,
  criarAluno,
  buscarAlunoPorID,
  atualizarAluno,
  inativarAluno,
  removerAluno,
};
