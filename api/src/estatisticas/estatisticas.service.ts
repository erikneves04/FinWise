import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  private buildDateFilter(mes?: number, ano?: number) {
    const filter: any = {};
    
    if (mes !== undefined || ano !== undefined) {
      filter.data = {};
      if (mes !== undefined) {
        filter.data.gte = new Date(ano || new Date().getFullYear(), mes - 1, 1);
        filter.data.lt = new Date(ano || new Date().getFullYear(), mes, 1);
      }
      if (ano !== undefined && mes === undefined) {
        filter.data.gte = new Date(ano, 0, 1);
        filter.data.lt = new Date(ano + 1, 0, 1);
      }
    }
    
    return filter;
  }

  async totalDespesas(usuarioId: number, mes?: number, ano?: number) {
    const whereClause = {
      usuarioId,
      ...this.buildDateFilter(mes, ano)
    };

    const despesas = await this.prisma.despesa.findMany({
      where: whereClause,
    });

    return {
      valorTotal: despesas.reduce((soma, d) => soma + d.valor, 0),
    };
  }

  async totalReceitas(usuarioId: number, mes?: number, ano?: number) {
    const whereClause = {
      usuarioId,
      ...this.buildDateFilter(mes, ano)
    };

    const receitas = await this.prisma.receita.findMany({
      where: whereClause,
    });

    return {
      valorTotal: receitas.reduce((soma, r) => soma + r.valor, 0),
    };
  }

  async totalDespesasPorCategoria(usuarioId: number, mes?: number, ano?: number) {
    const whereClause = {
      usuarioId,
      ...this.buildDateFilter(mes, ano)
    };

    const despesas = await this.prisma.despesa.findMany({
      where: whereClause,
    });

    const porCategoria: Record<string, number> = {};

    for (const despesa of despesas) {
      porCategoria[despesa.tipo] = (porCategoria[despesa.tipo] || 0) + despesa.valor;
    }

    return { porCategoria };
  }

  async totalReceitasPorCategoria(usuarioId: number, mes?: number, ano?: number) {
    const whereClause = {
      usuarioId,
      ...this.buildDateFilter(mes, ano)
    };

    const receitas = await this.prisma.receita.findMany({
      where: whereClause,
    });

    const porCategoria: Record<string, number> = {};

    for (const receita of receitas) {
      porCategoria[receita.tipo] = (porCategoria[receita.tipo] || 0) + receita.valor;
    }

    return { porCategoria };
  }
}