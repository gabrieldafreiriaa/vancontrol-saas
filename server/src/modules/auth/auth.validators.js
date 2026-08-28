import { email, z } from 'zod';

export const registarUsuarioSchema = z.object({
  body: z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 2 caracteres'),
    nomeOrganizacao: z

      .string()
      .min(2, 'Nome da organização deve ter pelo menos 2 caracteres'),
  }),
});

export const loginUsuarioSchema = z.object({
  body: z.object({
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(1, 'Senha é obrigatória'),
  }),
});
