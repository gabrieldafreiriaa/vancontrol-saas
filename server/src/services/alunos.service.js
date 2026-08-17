/* Services > executa a lógica/regra de negocio 
   Qual regra/lógica precisa acontecer?*/
import { prisma } from '../database/prisma.js';

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

async function listarAlunos() {
  const alunos = await prisma.aluno.findMany({
    //Prisma, busque registro na tabela aluno == SELECT * FROM ALUNO
    orderBy: {
      id: 'asc', //Ordene por ordem crescente se fosse decrescente seria desc
    },
  });

  return alunos;
}

async function criarAluno(dadosDoAluno) {
  //Validação, nunca salve sem validar
  const erroValidacao = validarDadosAluno(dadosDoAluno);

  if (erroValidacao) {
    return {
      erro: true,
      mensagem: erroValidacao,
    };
  }
  const { nome, escola, nomeResponsavel, telefone, valorMensal } = dadosDoAluno; // desestruturação

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
  const aluno = await prisma.aluno.findUnique({
    where: {
      id: Number(id),
    },
  });

  return aluno;
}

async function atualizarAluno(id, dadosAtualizados) {
  const alunoExiste = await buscarAlunoPorID(id);

  if (!alunoExiste) {
    return {
      erro: true,
      tipo: 'nao_encontrado',
      mensagem: 'Aluno não encontrado',
    };
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
  const aluno = await buscarAlunoPorID(id);

  if (!aluno) {
    return null;
  }

  const alunoInativado = await prisma.aluno.update({
    where: {
      id: Number(id),
    },
    data: {
      status: 'inativo',
    },
  });

  return { status: alunoInativado.status };
}

async function removerAluno(id) {
  const alunoExiste = await buscarAlunoPorID(id);

  if (!alunoExiste) {
    return null;
  }

  const aluno = await prisma.aluno.delete({
    where: {
      id: Number(id),
    },
  });

  return aluno;
}

export const alunosService = {
  listarAlunos,
  criarAluno,
  buscarAlunoPorID,
  atualizarAluno,
  inativarAluno,
  removerAluno,
};
