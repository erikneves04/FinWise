import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @UseGuards(JwtAuthGuard)
  @Get('despesas')
  async obterSomasDespesas(
    @User() user: any,
    @Query('mes') mes?: number,
    @Query('ano') ano?: number
  ) {
    return this.estatisticasService.calcularSomasDespesas(user.id, mes, ano);
  }

  @UseGuards(JwtAuthGuard)
  @Get('receitas')
  async obterSomasReceitas(
    @User() user: any,
    @Query('mes') mes?: number,
    @Query('ano') ano?: number
  ) {
    return this.estatisticasService.calcularSomasReceitas(user.id, mes, ano);
  }
}