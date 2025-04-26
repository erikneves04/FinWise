import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from '@prisma/client';

@Injectable()
export class ReceitasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, dto: CreateReceitaDto): Promise<Receita> {
    const receita = await this.prisma.receita.create({
      data: {
        ...dto,
        usuarioId: userId,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        saldo: { increment: dto.valor },
      },
    });

    return receita;
  }

  async findAll(userId: number): Promise<Receita[]> {
    return this.prisma.receita.findMany({
      where: { usuarioId: userId },
    });
  }

  async findOne(userId: number, receitaId: number): Promise<Receita | null> {
    const receita = await this.prisma.receita.findFirst({
      where: {
        id: receitaId,
        usuarioId: userId,
      },
    });

    if (!receita) {
      throw new NotFoundException('Receita não encontrada.');
    }

    return receita;
  }

  async update(userId: number, receitaId: number, dto: UpdateReceitaDto): Promise<Receita> {
    const receitaAntiga = await this.findOne(userId, receitaId);
    if (!receitaAntiga) {
      throw new NotFoundException('Receita não encontrada ou não pertence ao usuário.');
    }

    const diferenca = dto.valor - receitaAntiga.valor;

    if (diferenca !== 0) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          saldo: { increment: diferenca },
        },
      });
    }

    return this.prisma.receita.update({
      where: { id: receitaId },
      data: dto,
    });
  }

  async delete(userId: number, receitaId: number) {
    const receita = await this.findOne(userId, receitaId);
    if (!receita) {
      throw new NotFoundException('Receita não encontrada ou não pertence ao usuário.');
    }

    await this.prisma.receita.delete({
      where: { id: receitaId },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        saldo: { decrement: receita.valor }, // diminui o saldo
      },
    });

    return { message: 'Receita removida e saldo ajustado.' };
  }
}
