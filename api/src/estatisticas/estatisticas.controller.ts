import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('usuarios/estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async obterEstatisticas(@Query('tipo') tipo: string, @User() user: any) {
    if (!tipo) {
      throw new Error('Tipo não informado. Use "despesas" ou "receitas".');
    }

    if (tipo === 'despesas') {
      return this.estatisticasService.calcularEstatisticasDespesas(user.id);
    } else if (tipo === 'receitas') {
      return this.estatisticasService.calcularEstatisticasReceitas(user.id);
    } else {
      throw new Error('Tipo inválido. Use "despesas" ou "receitas".');
    }
  }
}
