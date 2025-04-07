import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DespesasModule } from './despesas/despesas.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsuarioModule,
    PrismaModule,
    DespesasModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
