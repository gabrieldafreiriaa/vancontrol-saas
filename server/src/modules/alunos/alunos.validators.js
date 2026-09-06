import { z } from 'zod';

export const criarAlunoSchema = z.object({
  body: z.object({
    nome: z
      .string()
      .trim()
      .min(2, 'O Nome deve conter pelo menos 2 caracteres'),

    escola: z
      .string()
      .trim()
      .min(2, 'A Escola deve conter pelo menos 2 caracteres'),

    turno: z.enum(['MANHA', 'TARDE', 'INTEGRAL']),

    responsavelId: z.coerce
      .number()
      .int('Responsável deve ser um número inteiro')
      .positive('Responsável é obrigatório'),

    observacoes: z.string().trim().optional(),

    valorMensal: z.coerce.number().positive('O Valor deve ser maior que zero'),

    diaVencimento: z.coerce
      .number()
      .int('O Dia do vencimento deve ser um numero inteiro')
      .min(1, 'O Dia de vencimento deve ser no mínimo 1')
      .max(31, 'Dia de vencimento deve ser no máximo 31'),

    dataInicio: z.coerce.date({
      message: 'Data de início inválida',
    }),
  }),
});

export const atualizarAlunoSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser maior que zero'),
  }),

  body: z.object({
    nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres'),

    escola: z.string().trim().min(2, 'Escola deve ter pelo menos 2 caracteres'),

    turno: z.enum(['MANHA', 'TARDE', 'INTEGRAL']),

    responsavelId: z.coerce
      .number()
      .int('Responsável deve ser um número inteiro')
      .positive('Responsável é obrigatório'),

    observacoes: z.string().trim().optional(),
  }),
});

export const idAlunoSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser maior que zero'),
  }),
});
