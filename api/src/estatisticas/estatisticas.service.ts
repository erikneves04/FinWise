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

    const porCategoria: Record<string, number> = {};

    for (const despesa of despesas) {
      porCategoria[despesa.tipo] = (porCategoria[despesa.tipo] || 0) + despesa.valor;
    }

    const porcentagemPorCategoria = total > 0
      ? Object.fromEntries(
          Object.entries(porCategoria).map(([tipo, valor]) => [
            tipo,
            Number(((valor / total) * 100).toFixed(2)), // Duas casas decimais
          ])
        )
      : {};

    const categoriaMaisCara = Object.entries(porCategoria).reduce(
      (max, atual) => (atual[1] > max[1] ? atual : max),
      ['', 0]
    )[0];

    return {
      total,
      porCategoria,
      porcentagemPorCategoria,
      categoriaMaisCara: categoriaMaisCara || null,
      totalDespesas: despesas.length,
    };
  }
}
