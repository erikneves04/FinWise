import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('usuarios/estatisticas')
@UseGuards(JwtAuthGuard)
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  // Rota para soma total de despesas
  @Get('despesas/total')
  async obterTotalDespesas(@User() user: any) {
    return {
      total: await this.estatisticasService.somaTotalDespesas(user.id)
    };
  }

  // Rota para soma de despesas por categoria
  @Get('despesas/por-categoria')
  async obterDespesasPorCategoria(@User() user: any) {
    return await this.estatisticasService.somaDespesasPorCategoria(user.id);
  }

  // Rota para soma total de receitas
  @Get('receitas/total')
  async obterTotalReceitas(@User() user: any) {
    return {
      total: await this.estatisticasService.somaTotalReceitas(user.id)
    };
  }

  // Rota para soma de receitas por categoria
  @Get('receitas/por-categoria')
  async obterReceitasPorCategoria(@User() user: any) {
    return await this.estatisticasService.somaReceitasPorCategoria(user.id);
  }
}