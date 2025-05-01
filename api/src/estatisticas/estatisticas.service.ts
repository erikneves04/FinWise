import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  async calcularSomasDespesas(usuarioId: number, mes?: number, ano?: number) {
    const whereClause: any = { usuarioId };
    
    if (mes !== undefined || ano !== undefined) {
      whereClause.data = {};
      if (mes !== undefined) whereClause.data.gte = new Date(ano || new Date().getFullYear(), mes - 1, 1);
      if (mes !== undefined) whereClause.data.lt = new Date(ano || new Date().getFullYear(), mes, 1);
      if (ano !== undefined && mes === undefined) {
        whereClause.data.gte = new Date(ano, 0, 1);
        whereClause.data.lt = new Date(ano + 1, 0, 1);
      }
    }

    const despesas = await this.prisma.despesa.findMany({
      where: whereClause,
    });

    const valorTotal = despesas.reduce((soma, d) => soma + d.valor, 0);

    const porCategoria: Record<string, number> = {};

    for (const despesa of despesas) {
      if (!porCategoria[despesa.tipo]) {
        porCategoria[despesa.tipo] = 0;
      }
      porCategoria[despesa.tipo] += despesa.valor;
    }

    return {
      valorTotal,
      porCategoria,
    };
  }

  async calcularSomasReceitas(usuarioId: number, mes?: number, ano?: number) {
    const whereClause: any = { usuarioId };
    
    if (mes !== undefined || ano !== undefined) {
      whereClause.data = {};
      if (mes !== undefined) whereClause.data.gte = new Date(ano || new Date().getFullYear(), mes - 1, 1);
      if (mes !== undefined) whereClause.data.lt = new Date(ano || new Date().getFullYear(), mes, 1);
      if (ano !== undefined && mes === undefined) {
        whereClause.data.gte = new Date(ano, 0, 1);
        whereClause.data.lt = new Date(ano + 1, 0, 1);
      }
    }

    const receitas = await this.prisma.receita.findMany({
      where: whereClause,
    });

    const valorTotal = receitas.reduce((soma, r) => soma + r.valor, 0);

    const porCategoria: Record<string, number> = {};

    for (const receita of receitas) {
      if (!porCategoria[receita.tipo]) {
        porCategoria[receita.tipo] = 0;
      }
      porCategoria[receita.tipo] += receita.valor;
    }

    return {
      valorTotal,
      porCategoria,
    };
  }
}