import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDespesaDto } from 'src/despesas/dto/create-despesa.dto';
import { UpdateDespesaDto } from 'src/despesas/dto/update-despesa.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.user.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const usuario = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id); // garante que o usuário existe
    return this.prisma.user.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // garante que o usuário existe
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async criarDespesa(usuarioId: number, dto: CreateDespesaDto) {
    return this.prisma.despesa.create({
      data: {
        ...dto,
        usuarioId,
      },
    });
  }

  async getDespesas(usuarioId: number) {
    return this.prisma.despesa.findMany({
      where: { usuarioId },
    });
  }

  async buscarDespesaPorId(usuarioId: number, despesaId: number) {
    const despesa = await this.prisma.despesa.findFirst({
      where: {
        id: despesaId,
        usuarioId,
      },
    });
  
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }
  
    return despesa;
  }

  async atualizarDespesa(usuarioId: number, despesaId: number, dto: UpdateDespesaDto) {
    const despesa = await this.prisma.despesa.findFirst({
      where: { id: despesaId, usuarioId },
    });

    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }

    return this.prisma.despesa.update({
      where: { id: despesaId },
      data: dto,
    });
  }

  async deletarDespesa(usuarioId: number, despesaId: number) {
    const despesa = await this.prisma.despesa.findFirst({
      where: { id: despesaId, usuarioId },
    });

    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }

    return this.prisma.despesa.delete({
      where: { id: despesaId },
    });
  }

  async adicionarSaldo(id: number, valor: number) {
    const usuario = await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: {
        saldo: usuario.saldo + valor,
      },
    });
  }

  async removerSaldo(id: number, valor: number) {
    const usuario = await this.findOne(id);
    if (usuario.saldo < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }
    return this.prisma.user.update({
      where: { id },
      data: {
        saldo: usuario.saldo - valor,
      },
    });
  }

  async getSaldo(id: number) {
    const usuario = await this.findOne(id);
    return { saldo: usuario.saldo };
  }
}
