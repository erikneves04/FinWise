import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';  // Adicionando o AuthModule

@Module({
  imports: [PrismaModule, AuthModule],  // Importando o AuthModule
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
