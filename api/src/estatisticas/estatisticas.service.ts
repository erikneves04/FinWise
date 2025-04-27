import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  async calcularEstatisticasDespesas(usuarioId: number) {
    const usuario = await this.prisma.user.findUnique({
      where: { id: usuarioId },
      select: { saldo: true },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const despesas = await this.prisma.despesa.findMany({
      where: { usuarioId },
    });

    const valorTotalDespesas = despesas.reduce((soma, d) => soma + d.valor, 0);

    const porCategoria: Record<string, { valor: number, quantidade: number }> = {};

    for (const despesa of despesas) {
      if (!porCategoria[despesa.tipo]) {
        porCategoria[despesa.tipo] = { valor: 0, quantidade: 0 };
      }
      porCategoria[despesa.tipo].valor += despesa.valor;
      porCategoria[despesa.tipo].quantidade += 1;
    }

    const porcentagemPorCategoriaValor = valorTotalDespesas > 0
      ? Object.fromEntries(
          Object.entries(porCategoria).map(([tipo, { valor }]) => [
            tipo,
            Number(((valor / valorTotalDespesas) * 100).toFixed(2)),
          ])
        )
      : {};

    const porcentagemPorCategoriaQuantidade = despesas.length > 0
      ? Object.fromEntries(
          Object.entries(porCategoria).map(([tipo, { quantidade }]) => [
            tipo,
            Number(((quantidade / despesas.length) * 100).toFixed(2)),
          ])
        )
      : {};

    const categoriaMaisCara = Object.entries(porCategoria).reduce(
      (max, atual) => (atual[1].valor > max[1].valor ? atual : max),
      ['', { valor: 0, quantidade: 0 }]
    )[0];

    return {
      valorTotalDespesas,
      saldo: usuario.saldo, 
      porCategoria,
      porcentagemPorCategoriaValor,
      porcentagemPorCategoriaQuantidade,
      categoriaMaisCara: categoriaMaisCara || null,
      totalDespesas: despesas.length,
    };
  }

  async calcularEstatisticasReceitas(usuarioId: number) {
    const usuario = await this.prisma.user.findUnique({
      where: { id: usuarioId },
      select: { saldo: true },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const receitas = await this.prisma.receita.findMany({
      where: { usuarioId },
    });

    const valorTotalReceitas = receitas.reduce((soma, r) => soma + r.valor, 0);

    const porCategoria: Record<string, { valor: number, quantidade: number }> = {};

    for (const receita of receitas) {
      if (!porCategoria[receita.tipo]) {
        porCategoria[receita.tipo] = { valor: 0, quantidade: 0 };
      }
      porCategoria[receita.tipo].valor += receita.valor;
      porCategoria[receita.tipo].quantidade += 1;
    }

    const porcentagemPorCategoriaValor = valorTotalReceitas > 0
      ? Object.fromEntries(
          Object.entries(porCategoria).map(([tipo, { valor }]) => [
            tipo,
            Number(((valor / valorTotalReceitas) * 100).toFixed(2)),
          ])
        )
      : {};

    const porcentagemPorCategoriaQuantidade = receitas.length > 0
      ? Object.fromEntries(
          Object.entries(porCategoria).map(([tipo, { quantidade }]) => [
            tipo,
            Number(((quantidade / receitas.length) * 100).toFixed(2)),
          ])
        )
      : {};

    const categoriaMaisCara = Object.entries(porCategoria).reduce(
      (max, atual) => (atual[1].valor > max[1].valor ? atual : max),
      ['', { valor: 0, quantidade: 0 }]
    )[0];

    return {
      valorTotalReceitas,
      saldo: usuario.saldo, 
      porCategoria,
      porcentagemPorCategoriaValor,
      porcentagemPorCategoriaQuantidade,
      categoriaMaisRelevante: categoriaMaisCara || null,
      totalReceitas: receitas.length,
    };
  }
}
