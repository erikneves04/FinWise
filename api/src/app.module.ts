import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DespesasModule } from './despesas/despesas.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EstatisticasModule } from './estatisticas/estatisticas.module';

@Module({
  imports: [
    UsuarioModule,
    PrismaModule,
    DespesasModule,
    AuthModule,
    EstatisticasModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
