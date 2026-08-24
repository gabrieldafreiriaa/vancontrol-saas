/* Services > executa a lógica/regra de negocio 

   Qual regra/lógica precisa acontecer?*/

import { prisma } from '../database/prisma.js';
import { validarId } from '../helpers/validarId.js';

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

async function listarAlunos() {
  try {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        id: 'asc', // Ordene por ordem crescente. Se fosse decrescente seria 'desc'
      },
    });
    return {
      erro: false,
      alunos,
    };
  } catch (error) {
    return {
      erro: true,
      tipo: 'erro_interno',
      mensagem: 'Erro ao listar alunos',
    };
  }
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

  try {
    const { nome, escola, nomeResponsavel, telefone, valorMensal } =
      dadosDoAluno;

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
  } catch (error) {
    return {
      erro: true,
      tipo: 'erro_interno',
      mensagem: 'Erro ao criar aluno',
    };
  }
}

async function buscarAlunoPorId(id) {
  const erroId = validarId(id);

  if (erroId) {
    return {
      erro: true,
      tipo: 'id_invalido',
      mensagem: erroId,
    };
  }

  try {
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
  } catch (error) {
    return {
      erro: ture,
      tipo: 'erro_interno',
      mensagem: 'Erro ao buscar aluno',
    };
  }
}

async function atualizarAluno(id, dadosAtualizados) {
  const resultadoBusca = await buscarAlunoPorId(id);

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

  const { nome, escola, nomeResponsavel, telefone, valorMensal } =
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
    },
  });

  return {
    erro: false,
    aluno,
  };
}

async function inativarAluno(id) {
  const resultadoBusca = await buscarAlunoPorId(id);

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
  const resultadoBusca = await buscarAlunoPorId(id);

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
  buscarAlunoPorId,
  atualizarAluno,
  inativarAluno,
  removerAluno,
};
