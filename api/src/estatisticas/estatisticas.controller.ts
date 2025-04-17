import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('usuarios/estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async obterEstatisticas(@User() user: any) {
    return this.estatisticasService.calcularEstatisticas(user.id);
  }
}
