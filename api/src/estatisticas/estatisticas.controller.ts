import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @UseGuards(JwtAuthGuard)
  @Get('despesas/total')
  async totalDespesas(
    @User() user: any,
    @Query('mes') mes?: number,
    @Query('ano') ano?: number
  ) {
    return this.estatisticasService.totalDespesas(user.id, mes, ano);
  }

  @UseGuards(JwtAuthGuard)
  @Get('receitas/total')
  async totalReceitas(
    @User() user: any,
    @Query('mes') mes?: number,
    @Query('ano') ano?: number
  ) {
    return this.estatisticasService.totalReceitas(user.id, mes, ano);
  }

  @UseGuards(JwtAuthGuard)
  @Get('despesas/categorias')
  async totalDespesasPorCategoria(
    @User() user: any,
    @Query('mes') mes?: number,
    @Query('ano') ano?: number
  ) {
    return this.estatisticasService.totalDespesasPorCategoria(user.id, mes, ano);
  }
}