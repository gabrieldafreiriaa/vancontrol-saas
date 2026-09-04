import { z } from 'zod';

export const criarResponsavelSchema = z.object({
  body: z.object({
    nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres'),

    telefone: z
      .string()
      .trim()
      .min(11, 'Telefone deve ter pelo menos 11 caracteres'),

    telefoneSecundario: z.string().trim().optional(),

    endereco: z
      .string()
      .trim()
      .min(3, 'Endereço deve ter pelo menos 3 caracteres'),

    observacoes: z.string().trim().optional(),
  }),
});

export const atualizarResponsavelSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser maior que zero'),
  }),

  body: z.object({
    nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres'),

    telefone: z
      .string()
      .trim()
      .min(11, 'Telefone deve ter pelo menos 11 caracteres'),

    telefoneSecundario: z.string().trim().optional(),

    endereco: z
      .string()
      .trim()
      .min(3, 'Endereço deve ter pelo menos 3 caracteres'),

    observacoes: z.string().trim().optional(),
  }),
});

export const idResponsavelSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser maior que zero'),
  }),
});
