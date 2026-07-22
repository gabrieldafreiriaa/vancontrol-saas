/* Services > executa a lógica/regra de negocio 
   Qual regra/lógica precisa acontecer?*/

const alunos = [];

function validarDadosAluno(dadosAluno) {
  if (!dadosAluno.nome) {
    return 'O campo nome é obrigatorio!';
  }
  if (!dadosAluno.escola) {
    return 'O campo escola é obrigatorio!';
  }
  if (!dadosAluno.nomeResponsavel) {
    return 'O campo responsavel é obrigatorio!';
  }
  if (!dadosAluno.telefone) {
    return 'O campo telefone é obrigatorio!';
  }
  if (!dadosAluno.valorMensal) {
    return 'O campo valor é obrigatorio!';
  }
  if (dadosAluno.valorMensal <= 0) {
    return 'O valor deve ser maior que 0!';
  }

  return null;
}

function listarAlunos() {
  return alunos;
}

function criarAluno(dadosDoAluno) {
  const erroValidacao = validarDadosAluno(dadosDoAluno);

  if (erroValidacao) {
    return {
      erro: true,
      mensagem: erroValidacao,
    };
  }
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
    atualizadoEm: new Date(),
  };

  alunos.push(aluno); /* adiciona aluno no array de alunos */

  return {
    erro: false,
    aluno,
  };
}

function buscarAlunoPorID(id) {
  const aluno = alunos.find((aluno) => aluno.id === Number(id)); // find() procura um item

  return aluno;
}

function atualizarAluno(id, dadosAtualizados) {
  const aluno = buscarAlunoPorID(id);

  if (!aluno) {
    return {
      erro: true,
      tipo: 'não_encontrado',
      mensagem: 'Aluno não encontrado',
    };
  }

  const erroValidacao = validarDadosAluno(dadosAtualizados);

  if (erroValidacao) {
    return {
      erro: true,
      tipo: 'validação',
      mensagem: erroValidacao,
    };
  }

  aluno.nome = dadosAtualizados.nome;
  aluno.escola = dadosAtualizados.escola;
  aluno.nomeResponsavel = dadosAtualizados.nomeResponsavel;
  aluno.telefone = dadosAtualizados.telefone;
  aluno.valorMensal = dadosAtualizados.valorMensal;
  aluno.atualizadoEm = new Date();

  return {
    erro: false,
    aluno,
  };
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
