import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from '../../database/prisma.js';
import { env } from '../../config/env.js';
import { AppError } from '../../errors/app.error.js';
import { email } from 'zod';

function gerarToken(usuario) {
  return jwt.sign(
    //gerar um token assinado
    {
      usuarioId: usuario.id,
      organizacaoId: usuario.organizacaoId,
    },
    env.JWT_SECRET, //valida o token
    {
      expiresIn: '5d',
    },
  );
}

function formatarUsuario(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
    status: usuario.status,
    organizacaoId: usuario.organizacaoId,
    organizacao: usuario.organizacao,
  };
}

async function registrar(dados) {
  const emailJaexiste = await prisma.usuario.findUnique({
    where: {
      email: dados.email,
    },
  });
  if (emailJaexiste) {
    throw new AppError('Já existe um usuário com este e-mail', 400);
  }

  const senhaHash = await bcrypt.hash(dados.senha, 8); // criptografa a senha pura
  const usuarioCriado = await prisma.$transaction(async (transacao) => {
    //condição para a criação: se estiver certo, salva! caso contrario, nada é salvo
    const organizacao = await transacao.organizacao.create({
      data: {
        nome: dados.nomeOrganizacao,
      },
    });

    const usuario = await transacao.usuario.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        senhaHash,
        tipo: 'ADMIN',
        organizacaoId: organizacao.id,
      },
      //busca dados na tabela usuario e traga a organização ligada a ele
      include: {
        organizacao: true,
      },
    });

    return usuario;
  });

  const token = gerarToken(usuarioCriado);

  return {
    token,
    usuario: formatarUsuario(usuarioCriado),
  };
}

async function login(dados) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: dados.email,
    },
    include: {
      organizacao,
    },
  });
  if (!usuario) {
    throw new AppError('E-mail ou senha inválido', 401);
  }

  if (usuario.status !== 'ATIVO') {
    throw new AppError('Usuário inativo', 403);
  }

  if (!senhaCorreta) {
    throw new AppError('E-mail ou senha inválido', 401);
  }

  const token = gerarToken(usuario);

  return {
    token,
    usuario: formatarUsuario(usuario),
  };
}

async function buscarPerfil(usuarioId) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(usuarioId),
    },
    include: {
      organizacao: true,
    },
  });

  if (!usuario) {
    throw new AppError('Usuário não encontrado', 401);
  }
  return formatarUsuario(usuario);
}

export const authService = {
  registrar,
  login,
  buscarPerfil,
};
