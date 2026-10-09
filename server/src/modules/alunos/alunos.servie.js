import { prisma } from "../../database/prisma.js";
import { AppError } from "../../errors/app.error.js";

async function listar(organizacaoId) {
  const alunos = await prisma.aluno.findMany({
    where: {
      organizacaoId,
    },

    include: {
      responsavel: {
        select: {
          id: true,
          nome: true,
          telefone: true,
          endereco: true,
          status: true,
        },
      },

      contratos: {
        where: {
          status: "ATIVO",
        },
        select: {
          id: true,
          valorMensal: true,
          diaVencimento: true,
          dataInicio: true,
          dataFim: true,
          status: true,
        },
      },
    },

    orderBy: {
      nome: "asc",
    },
  });

  return alunos;
}

async function buscarResponsalvelDaOrganizacao(responsalvelId, organizacaoId) {
  const responsavel = await prisma.responsavel.findFirst({
    where: {
      id: responsalvelId,
      organizacaoId,
      status: "ATIVO",
    },
  });
  if (!responsavel) {
    throw new AppError("Responsável não encontrado", 404);
  }
  return responsavel;
}

async function buscarPorId(id, organizacaoId) {
  const aluno = await prisma.aluno.findFirst({
    where: {
      id,
      organizacaoId,
    },

    include: {
      responsavel: {
        select: {
          id: true,
          nome: true,
          telefone: true,
          endereco: true,
          status: true,
        },
      },

      contratos: {
        orderBy: {
          dataInicio: "desc",
        },

        select: {
          id: true,
          valorMensal: true,
          diaVencimento: true,
          dataInicio: true,
          dataFim: true,
          status: true,
        },
      },
    },
  });

  if (!aluno) {
    throw new AppError("Aluno não encontrado", 404);
  }
  return aluno;
}
