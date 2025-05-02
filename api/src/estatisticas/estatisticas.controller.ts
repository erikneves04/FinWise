// estatisticas.controller.ts
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
    @Query('mes', new ParseIntPipe()) mes: number,
    @Query('ano', new ParseIntPipe()) ano: number
  ) {
    return this.estatisticasService.getTotaisPorDia(user.id, mes, ano);
  }

  @UseGuards(JwtAuthGuard)
  @Get('despesas-por-categoria')
  async getDespesasPorCategoria(
    @User() user: any,
    @Query('mes', new ParseIntPipe()) mes: number,
    @Query('ano', new ParseIntPipe()) ano: number
  ) {
    return this.estatisticasService.getDespesasPorCategoria(user.id, mes, ano);
  }
}