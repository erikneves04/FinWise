import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  private getFirstAndLastDayOfMonth(month: number, year: number) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0); // Último dia do mês
    
    return { firstDay, lastDay };
  }

  async getTotaisPorDia(mes: number, ano: number, usuarioId: number) {
    const { firstDay, lastDay } = this.getFirstAndLastDayOfMonth(mes, ano);
    
    // Consulta despesas agrupadas por dia
    const despesasPorDia = await this.prisma.despesa.groupBy({
      by: ['data'],
      where: {
        usuarioId,
        data: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      _sum: {
        valor: true,
      },
    });

    // Consulta receitas agrupadas por dia
    const receitasPorDia = await this.prisma.receita.groupBy({
      by: ['data'],
      where: {
        usuarioId,
        data: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      _sum: {
        valor: true,
      },
    });

    // Criar um mapa para cada dia do mês
    const diasNoMes = lastDay.getDate();
    const resultados = [];

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes - 1, dia);
      const dataFormatada = dataAtual.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Encontrar despesas para este dia
      const despesaDia = despesasPorDia.find(d => 
        d.data.getDate() === dia && 
        d.data.getMonth() === mes - 1 && 
        d.data.getFullYear() === ano
      );

      // Encontrar receitas para este dia
      const receitaDia = receitasPorDia.find(r => 
        r.data.getDate() === dia && 
        r.data.getMonth() === mes - 1 && 
        r.data.getFullYear() === ano
      );

      resultados.push({
        referencia: dataFormatada,
        valorTotalReceitas: receitaDia?._sum.valor || 0,
        valorTotalDespesas: despesaDia?._sum.valor || 0,
      });
    }

    return resultados;
  }

  async getDespesasPorCategoriaPorDia(mes: number, ano: number, usuarioId: number) {
    const { firstDay, lastDay } = this.getFirstAndLastDayOfMonth(mes, ano);
    
    // Consulta despesas agrupadas por dia e categoria
    const despesas = await this.prisma.despesa.findMany({
      where: {
        usuarioId,
        data: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      select: {
        data: true,
        tipo: true,
        valor: true,
      },
      orderBy: {
        data: 'asc',
      },
    });

    // Criar estrutura de resultados
    const diasNoMes = lastDay.getDate();
    const resultados = [];

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes - 1, dia);
      const dataFormatada = dataAtual.toISOString().split('T')[0];

      // Filtrar despesas do dia atual
      const despesasDoDia = despesas.filter(d => 
        d.data.getDate() === dia && 
        d.data.getMonth() === mes - 1 && 
        d.data.getFullYear() === ano
      );

      // Agrupar por categoria
      const porCategoria = {};
      despesasDoDia.forEach(d => {
        porCategoria[d.tipo] = (porCategoria[d.tipo] || 0) + d.valor;
      });

      resultados.push({
        referencia: dataFormatada,
        categorias: porCategoria,
      });
    }

    return resultados;
  }
}