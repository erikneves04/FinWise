import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Injectable()
export class DespesasService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioId: number, dto: CreateDespesaDto) {
    const data = new Date(dto.data);
    const utcData = new Date(Date.UTC(
      data.getUTCFullYear(),
      data.getUTCMonth(),
      data.getUTCDate(),
      0, 0, 0, 0
    ));
  
    const createData: any = {
      descricao: dto.descricao,
      valor: dto.valor,
      tipo: dto.tipo,
      data: utcData,
      usuarioId: usuarioId,
    };
  
    return this.prisma.despesa.create({ data: createData });
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
    await this.findOne(usuarioId, id);
    
    const updateData: any = { ...dto };
    return this.prisma.despesa.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(usuarioId: number, id: number) {
    const despesa = await this.findOne(usuarioId, id);
    return this.prisma.despesa.delete({
      where: { id },
    });
  }
}
