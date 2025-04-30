import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  // Retorna apenas o valor total de todas as despesas
  async somaTotalDespesas(usuarioId: number): Promise<number> {
    const despesas = await this.prisma.despesa.findMany({
      where: { usuarioId },
      select: { valor: true }
    });
    
    return despesas.reduce((total, despesa) => total + despesa.valor, 0);
  }

  // Retorna a soma das despesas agrupadas por categoria
  async somaDespesasPorCategoria(usuarioId: number): Promise<Record<string, number>> {
    const despesas = await this.prisma.despesa.findMany({
      where: { usuarioId },
      select: { valor: true, tipo: true }
    });

    const porCategoria: Record<string, number> = {};

    for (const despesa of despesas) {
      porCategoria[despesa.tipo] = (porCategoria[despesa.tipo] || 0) + despesa.valor;
    }

    return porCategoria;
  }

  // Retorna apenas o valor total de todas as receitas
  async somaTotalReceitas(usuarioId: number): Promise<number> {
    const receitas = await this.prisma.receita.findMany({
      where: { usuarioId },
      select: { valor: true }
    });
    
    return receitas.reduce((total, receita) => total + receita.valor, 0);
  }

  // Retorna a soma das receitas agrupadas por categoria
  async somaReceitasPorCategoria(usuarioId: number): Promise<Record<string, number>> {
    const receitas = await this.prisma.receita.findMany({
      where: { usuarioId },
      select: { valor: true, tipo: true }
    });

    const porCategoria: Record<string, number> = {};

    for (const receita of receitas) {
      porCategoria[receita.tipo] = (porCategoria[receita.tipo] || 0) + receita.valor;
    }

    return porCategoria;
  }
}
