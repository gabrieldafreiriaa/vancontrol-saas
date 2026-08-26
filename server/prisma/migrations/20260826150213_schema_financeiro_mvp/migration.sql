/*
  Warnings:

  - You are about to drop the column `nomeResponsavel` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `valorMensal` on the `Aluno` table. All the data in the column will be lost.
  - The `status` column on the `Aluno` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `organizacaoId` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsavelId` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusUsuario" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'MOTORISTA');

-- CreateEnum
CREATE TYPE "StatusResponsavel" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "StatusAluno" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "TurnoAluno" AS ENUM ('MANHA', 'TARDE', 'INTEGRAL');

-- CreateEnum
CREATE TYPE "StatusContrato" AS ENUM ('ATIVO', 'ENCERRADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "StatusMensalidade" AS ENUM ('PENDENTE', 'PAGO', 'PARCIAL', 'ATRASADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'CARTAO', 'PIX');

-- CreateEnum
CREATE TYPE "CategoriaDespesa" AS ENUM ('COMBUSTIVEL', 'MANUTENCAO', 'OUTROS');

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "nomeResponsavel",
DROP COLUMN "telefone",
DROP COLUMN "valorMensal",
ADD COLUMN     "dataEntrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "organizacaoId" INTEGER NOT NULL,
ADD COLUMN     "responsavelId" INTEGER NOT NULL,
ADD COLUMN     "turno" "TurnoAluno" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusAluno" NOT NULL DEFAULT 'ATIVO';

-- CreateTable
CREATE TABLE "Organizacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL DEFAULT 'ADMIN',
    "status" "StatusUsuario" NOT NULL DEFAULT 'ATIVO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "organizacaoId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefoneSecundario" TEXT,
    "endereco" TEXT NOT NULL,
    "observacoes" TEXT,
    "status" "StatusResponsavel" NOT NULL DEFAULT 'ATIVO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "organizacaoId" INTEGER NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "valorMensal" DECIMAL(10,2) NOT NULL,
    "diaVencimento" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "status" "StatusContrato" NOT NULL DEFAULT 'ATIVO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "organizacaoId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensalidade" (
    "id" SERIAL NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "valorCobrado" DECIMAL(10,2) NOT NULL,
    "valorPago" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "status" "StatusMensalidade" NOT NULL DEFAULT 'PENDENTE',
    "statusManual" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "organizacaoId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "contratoId" INTEGER NOT NULL,

    CONSTRAINT "Mensalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "formaPagamento" "FormaPagamento" NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizacaoId" INTEGER NOT NULL,
    "mensalidadeId" INTEGER NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaDespesa" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "dataDespesa" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "organizacaoId" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_organizacaoId_idx" ON "Usuario"("organizacaoId");

-- CreateIndex
CREATE INDEX "Responsavel_organizacaoId_idx" ON "Responsavel"("organizacaoId");

-- CreateIndex
CREATE INDEX "Contrato_organizacaoId_idx" ON "Contrato"("organizacaoId");

-- CreateIndex
CREATE INDEX "Contrato_alunoId_idx" ON "Contrato"("alunoId");

-- CreateIndex
CREATE INDEX "Contrato_status_idx" ON "Contrato"("status");

-- CreateIndex
CREATE INDEX "Mensalidade_organizacaoId_idx" ON "Mensalidade"("organizacaoId");

-- CreateIndex
CREATE INDEX "Mensalidade_mesReferencia_idx" ON "Mensalidade"("mesReferencia");

-- CreateIndex
CREATE INDEX "Mensalidade_status_idx" ON "Mensalidade"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Mensalidade_alunoId_mesReferencia_key" ON "Mensalidade"("alunoId", "mesReferencia");

-- CreateIndex
CREATE INDEX "Pagamento_organizacaoId_idx" ON "Pagamento"("organizacaoId");

-- CreateIndex
CREATE INDEX "Pagamento_mensalidadeId_idx" ON "Pagamento"("mensalidadeId");

-- CreateIndex
CREATE INDEX "Pagamento_dataPagamento_idx" ON "Pagamento"("dataPagamento");

-- CreateIndex
CREATE INDEX "Despesa_organizacaoId_idx" ON "Despesa"("organizacaoId");

-- CreateIndex
CREATE INDEX "Despesa_categoria_idx" ON "Despesa"("categoria");

-- CreateIndex
CREATE INDEX "Despesa_dataDespesa_idx" ON "Despesa"("dataDespesa");

-- CreateIndex
CREATE INDEX "Aluno_organizacaoId_idx" ON "Aluno"("organizacaoId");

-- CreateIndex
CREATE INDEX "Aluno_responsavelId_idx" ON "Aluno"("responsavelId");

-- CreateIndex
CREATE INDEX "Aluno_status_idx" ON "Aluno"("status");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel" ADD CONSTRAINT "Responsavel_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Responsavel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD CONSTRAINT "Mensalidade_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD CONSTRAINT "Mensalidade_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD CONSTRAINT "Mensalidade_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_mensalidadeId_fkey" FOREIGN KEY ("mensalidadeId") REFERENCES "Mensalidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "Organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
