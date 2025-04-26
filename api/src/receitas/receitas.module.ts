import { Module } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { ReceitasController } from './receitas.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ReceitasController],
  providers: [ReceitasService, PrismaService],
})
export class ReceitasModule {}
