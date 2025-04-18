import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Injectable()
export class DespesasService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioId: number, dto: CreateDespesaDto) {
    return this.prisma.despesa.create({
      data: {
        descricao: dto.descricao,
        valor: dto.valor,
        tipo: dto.tipo,
        data: new Date(dto.data),
        usuarioId: usuarioId,
      },
    });
  }

  async findAll(usuarioId: number) {
    return this.prisma.despesa.findMany({
      where: { usuarioId },
    });
  }

  async findOne(usuarioId: number, id: number) {
    const despesa = await this.prisma.despesa.findUnique({ where: { id } });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    if (despesa.usuarioId !== usuarioId)
      throw new ForbiddenException('Acesso negado');
    return despesa;
  }

  async update(usuarioId: number, id: number, dto: UpdateDespesaDto) {
    const despesa = await this.findOne(usuarioId, id);
    return this.prisma.despesa.update({
      where: { id },
      data: dto,
    });
  }

  async remove(usuarioId: number, id: number) {
    const despesa = await this.findOne(usuarioId, id);
    return this.prisma.despesa.delete({
      where: { id },
    });
  }
}
