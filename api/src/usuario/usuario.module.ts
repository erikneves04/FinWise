import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // <-- importa aqui

@Module({
  imports: [PrismaModule], // <-- e adiciona aqui
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
