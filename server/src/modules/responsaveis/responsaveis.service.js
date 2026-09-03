import { prisma } from '../../database/prisma.js';
import { AppError } from '../../errors/app.error.js';

async function listar(organizacaoId) {
  const responsaveis = await prisma.responsavel.findMany({
    where: {
      organizacaoId,
    },
    include: {
      alunos: {
        select: {
          id: true,
          nome: true,
          escola: true,
          turno: true,
          status: true,
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  });
  return responsaveis;
}

async function criar(dados, organizacaoId) {
  const responsavel = await prisma.responsavel.create({
    data: {
      nome: dados.nome,
      telefone: dados.telefone,
      telefoneSecundario: dados.telefoneSecundario,
      endereco: dados.endereco,
      observacoes: dados.observacoes,
      organizacaoId,
    },
  });

  return responsavel;
}

async function buscarPorId(id, organizacao) {
  const responsavel = await prisma.responsavel.findFirst({
    where: {
      id,
      organizacaoId,
    },
    include: {
      alunos: {
        select: {
          id: true,
          nome: true,
          escola: true,
          turno: true,
          status: true,
        },
      },
    },
  });

  if (!responsavel) {
    throw new AppError('Responsavel nãpo encontrado', 404);
  }
  return responsavel;
}

async function atualizar(id, dados, organizacaoId) {
  await buscarPorId(id, organizacaoId);

  const responsavel = await prisma.upadte({
    where: {
      id,
    },
    data: {
      nome: dados.nome,
      telefone: dados.telefone,
      telefoneSecundario: dados.telefoneSecundario,
      endereco: dados.endereco,
      observacoes: dados.observacoes,
    },
  });
  return responsavel;
}

async function inativar(id, organizacaoId) {
  const responsavel = await prisma.responsavel.update({
    where: {
      id,
    },
    data: {
      status: 'INATIVO',
    },
  });
  return responsavel;
}

export const responsaveisService = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  inativar,
};
