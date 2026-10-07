import { z } from "zod";

export const criAlunoSchema = z.object({
  body: z.object({
    nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),

    escola: z.string().trim().min(2, "Escola deve ter pelo menos 2 caracteres"),

    turno: z.enum(["MANHA", "TARDE", "INTEGRAL"]),

    responsaveisId: z.coerce
      .number()
      .int("O responsavel precisa ser inteiro")
      .positive("Responsavel deve ser maior que zero"),

    observacoes: z.string().trim().optional(),

    valorMensal: z.coerce.number().positive("O valor deve ser maior que zero"),

    dataVencimento: z.coerce
      .number()
      .int("Dia de vencimento deve ser um numero inteiro")
      .min(1, "Dia de vencimento deve ser no minimo 1")
      .max(31, "Dia de vencimento deve ser no maximo 31 "),

    dataInicio: z.coerce.date({
      mensage: "Data de inicio invalida",
    }),
  }),
});

export const idAlunoSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int("ID Deve ser interio")
      .positive("ID deve ser maior que zero"),
  }),
});
