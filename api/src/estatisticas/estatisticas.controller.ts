import { Controller, Get, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @UseGuards(JwtAuthGuard)
  @Get('totais-por-dia')
  async getTotaisPorDia(
    @User() user: any,
    @Query('mes', ParseIntPipe) mes: number,
    @Query('ano', ParseIntPipe) ano: number
  ) {
    return this.estatisticasService.getTotaisPorDia(mes, ano, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('despesas-por-categoria-por-dia')
  async getDespesasPorCategoriaPorDia(
    @User() user: any,
    @Query('mes', ParseIntPipe) mes: number,
    @Query('ano', ParseIntPipe) ano: number
  ) {
    return this.estatisticasService.getDespesasPorCategoriaPorDia(mes, ano, user.id);
  }
}