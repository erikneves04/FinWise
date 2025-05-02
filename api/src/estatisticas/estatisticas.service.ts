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

    const result = await this.prisma.despesa.aggregate({
      where: whereClause,
      _sum: {
        valor: true
      }
    });

    return {
      valorTotal: result._sum.valor || 0,
    };
  }

  async totalReceitas(usuarioId: number, mes?: number, ano?: number) {
    const whereClause = {
      usuarioId,
      ...this.buildDateFilter(mes, ano)
    };

    const result = await this.prisma.receita.aggregate({
      where: whereClause,
      _sum: {
        valor: true
      }
    });

    return {
      valorTotal: result._sum.valor || 0,
    };
  }

  async totalDespesasPorCategoria(usuarioId: number, mes?: number, ano?: number) {
    const whereClause = {
      usuarioId,
      ...this.buildDateFilter(mes, ano)
    };

    const despesas = await this.prisma.despesa.groupBy({
      where: whereClause,
      by: ['tipo'],
      _sum: {
        valor: true
      }
    });

    const porCategoria = despesas.reduce((acc, item) => {
      acc[item.tipo] = item._sum.valor || 0;
      return acc;
    }, {});

    return { porCategoria };
  }
}