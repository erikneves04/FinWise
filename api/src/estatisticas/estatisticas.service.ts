// estatisticas.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  async getTotaisPorDia(usuarioId: number, mes: number, ano: number) {
    // Validação básica dos parâmetros
    if (mes < 1 || mes > 12) throw new Error('Mês inválido (1-12)');
    
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0); // Último dia do mês

    // Obter despesas agrupadas por dia
    const despesasPorDia = await this.prisma.despesa.groupBy({
      by: ['data'],
      where: {
        usuarioId,
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      _sum: {
        valor: true,
      },
    });

    // Obter receitas agrupadas por dia
    const receitasPorDia = await this.prisma.receita.groupBy({
      by: ['data'],
      where: {
        usuarioId,
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      _sum: {
        valor: true,
      },
    });

    // Criar um mapa para facilitar a consulta
    const resultados = new Map<string, { valorTotalReceitas: number, valorTotalDespesas: number }>();

    // Processar despesas
    despesasPorDia.forEach((item) => {
      const dataStr = item.data.toISOString().split('T')[0];
      if (!resultados.has(dataStr)) {
        resultados.set(dataStr, { valorTotalReceitas: 0, valorTotalDespesas: 0 });
      }
      resultados.get(dataStr).valorTotalDespesas = item._sum.valor;
    });

    // Processar receitas
    receitasPorDia.forEach((item) => {
      const dataStr = item.data.toISOString().split('T')[0];
      if (!resultados.has(dataStr)) {
        resultados.set(dataStr, { valorTotalReceitas: 0, valorTotalDespesas: 0 });
      }
      resultados.get(dataStr).valorTotalReceitas = item._sum.valor;
    });

    // Converter para o formato de array solicitado
    const resultadoFinal = Array.from(resultados.entries())
      .map(([referencia, valores]) => ({
        referencia,
        ...valores
      }))
      .sort((a, b) => new Date(a.referencia).getTime() - new Date(b.referencia).getTime());

    return resultadoFinal;
  }

  async getDespesasPorCategoria(usuarioId: number, mes: number, ano: number) {
    // Validação básica dos parâmetros
    if (mes < 1 || mes > 12) throw new Error('Mês inválido (1-12)');
    
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0); // Último dia do mês

    // Obter despesas agrupadas por categoria
    const despesasPorCategoria = await this.prisma.despesa.groupBy({
      by: ['tipo'],
      where: {
        usuarioId,
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      _sum: {
        valor: true,
      },
      _count: {
        _all: true,
      },
    });

    // Formatar o resultado
    const resultado = despesasPorCategoria.map((item) => ({
      categoria: item.tipo,
      valorTotal: item._sum.valor,
      quantidade: item._count._all,
    }));

    return resultado;
  }
}