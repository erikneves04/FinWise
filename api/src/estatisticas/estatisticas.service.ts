import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  async calcularEstatisticas(usuarioId: number) {
    const despesas = await this.prisma.despesa.findMany({
      where: { usuarioId },
    });
  
    const total = despesas.reduce((soma, d) => soma + d.valor, 0);
  
    const porCategoria: Record<string, { valor: number, quantidade: number }> = {};
  
    for (const despesa of despesas) {
      if (!porCategoria[despesa.tipo]) {
        porCategoria[despesa.tipo] = { valor: 0, quantidade: 0 };
      }
      porCategoria[despesa.tipo].valor += despesa.valor;
      porCategoria[despesa.tipo].quantidade += 1;
    }
  
    const porcentagemPorCategoriaValor = total > 0
      ? Object.fromEntries(
          Object.entries(porCategoria).map(([tipo, { valor }]) => [
            tipo,
            Number(((valor / total) * 100).toFixed(2)), 
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
      total,
      porCategoria,
      porcentagemPorCategoriaValor,
      porcentagemPorCategoriaQuantidade,
      categoriaMaisCara: categoriaMaisCara || null,
      totalDespesas: despesas.length,
    };
  }
  
}
