/* Services > executa a lógica/regra de negocio 

   Qual regra/lógica precisa acontecer?*/

import { prisma } from '../database/prisma.js';

function validarDadosAluno(dadosAluno) {
  if (!dadosAluno.nome || dadosAluno.nome.trim() === '') {
    return 'O campo nome é obrigatorio!';
  }

  if (!dadosAluno.escola || dadosAluno.escola.trim() === '') {
    return 'O campo escola é obrigatorio!';
  }

  if (!dadosAluno.nomeResponsavel || dadosAluno.nomeResponsavel.trim() === '') {
    return 'O campo responsavel é obrigatorio!';
  }

  if (!dadosAluno.telefone || dadosAluno.telefone.trim() === '') {
    return 'O campo telefone é obrigatorio!';
  }

  if (dadosAluno.valorMensal === undefined || dadosAluno.valorMensal === null) {
    return 'O campo valor é obrigatorio!';
  }

  if (typeof dadosAluno.valorMensal !== 'number') {
    return 'O valorMensal deve ser um número!';
  }

  if (dadosAluno.valorMensal <= 0) {
    return 'O valor deve ser maior que zero!';
  }

  return null;
}

function validarID(id) {
  const idNumero = Number(id);

  if (!idNumero || idNumero <= 0) {
    return 'ID inválido';
  }

  return null;
}

async function listarAlunos() {
  const alunos = await prisma.aluno.findMany({
    // Prisma, busque registros na tabela Aluno
    // Equivalente a: SELECT * FROM "Aluno"
    orderBy: {
      id: 'asc', // Ordene por ordem crescente. Se fosse decrescente seria 'desc'
    },
  });

  return alunos;
}

async function criarAluno(dadosDoAluno) {
  // Validação: nunca salve sem validar
  const erroValidacao = validarDadosAluno(dadosDoAluno);

  if (erroValidacao) {
    return {
      erro: true,
      tipo: 'validacao',
      mensagem: erroValidacao,
    };
  }

  const { nome, escola, nomeResponsavel, telefone, valorMensal } = dadosDoAluno;

  const aluno = await prisma.aluno.create({
    data: {
      nome,
      escola,
      nomeResponsavel,
      telefone,
      valorMensal,
    },
  });

  return {
    erro: false,
    aluno,
  };
}

async function buscarAlunoPorID(id) {
  const erroID = validarID(id);

  if (erroID) {
    return {
      erro: true,
      tipo: 'id_invalido',
      mensagem: erroID,
    };
  }

  const aluno = await prisma.aluno.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!aluno) {
    return {
      erro: true,
      tipo: 'nao_encontrado',
      mensagem: 'Aluno não encontrado!',
    };
  }

  return {
    erro: false,
    aluno,
  };
}

async function atualizarAluno(id, dadosAtualizados) {
  const resultadoBusca = await buscarAlunoPorID(id);

  if (resultadoBusca.erro) {
    return resultadoBusca;
  }

  const erroValidacao = validarDadosAluno(dadosAtualizados);

  if (erroValidacao) {
    return {
      erro: true,
      tipo: 'validacao',
      mensagem: erroValidacao,
    };
  }

  const { nome, escola, nomeResponsavel, telefone, valorMensal, status } =
    dadosAtualizados;

  const aluno = await prisma.aluno.update({
    where: {
      id: Number(id),
    },
    data: {
      nome,
      escola,
      nomeResponsavel,
      telefone,
      valorMensal,
      status,
    },
  });

  return {
    erro: false,
    aluno,
  };
}

async function inativarAluno(id) {
  const resultadoBusca = await buscarAlunoPorID(id);

  if (resultadoBusca.erro) {
    return resultadoBusca;
  }

  const aluno = await prisma.aluno.update({
    where: {
      id: Number(id),
    },
    data: {
      status: 'inativo',
    },
  });

  return {
    erro: false,
    aluno,
  };
}

async function removerAluno(id) {
  const resultadoBusca = await buscarAlunoPorID(id);

  if (resultadoBusca.erro) {
    return resultadoBusca;
  }

  const aluno = await prisma.aluno.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    erro: false,
    aluno,
  };
}

export const alunosService = {
  listarAlunos,
  criarAluno,
  buscarAlunoPorID,
  atualizarAluno,
  inativarAluno,
  removerAluno,
};
