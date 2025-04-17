import { Module } from '@nestjs/common';
import { EstatisticasController } from './estatisticas.controller';
import { EstatisticasService } from './estatisticas.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EstatisticasController],
  providers: [EstatisticasService, PrismaService],
})
export class EstatisticasModule {}
