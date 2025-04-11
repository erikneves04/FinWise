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
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async createExpense(usuarioId: number, dto: CreateDespesaDto) {
    const usuario = await this.findOne(usuarioId);
  
    if (usuario.saldo < dto.valor) {
      throw new BadRequestException('Saldo insuficiente para criar a despesa.');
    }
  
    const despesa = await this.prisma.despesa.create({
      data: {
        ...dto,
        usuarioId,
      },
    });
  
    await this.prisma.user.update({
      where: { id: usuarioId },
      data: {
        saldo: usuario.saldo - dto.valor,
      },
    });
  
    return despesa;
  }

  async getExpenses(usuarioId: number) {
    return this.prisma.despesa.findMany({
      where: { usuarioId },
    });
  }

  async getExpenseById(usuarioId: number, despesaId: number) {
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

  async updateExpense(usuarioId: number, despesaId: number, dto: UpdateDespesaDto) {
    const despesaAntiga = await this.prisma.despesa.findFirst({
      where: { id: despesaId, usuarioId },
    });
  
    if (!despesaAntiga) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }
  
    const diferenca = dto.valor - despesaAntiga.valor;
    const usuario = await this.findOne(usuarioId);
  
    if (diferenca > 0 && usuario.saldo < diferenca) {
      throw new BadRequestException('Saldo insuficiente para atualizar a despesa.');
    }
  
    // Atualiza o saldo conforme a diferença
    await this.prisma.user.update({
      where: { id: usuarioId },
      data: {
        saldo: usuario.saldo - diferenca,
      },
    });
  
    // Atualiza a despesa
    return this.prisma.despesa.update({
      where: { id: despesaId },
      data: dto,
    });
  }  

  async deleteExpense(usuarioId: number, despesaId: number) {
    const despesa = await this.prisma.despesa.findFirst({
      where: { id: despesaId, usuarioId },
    });
  
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }
  
    await this.prisma.despesa.delete({
      where: { id: despesaId },
    });
  
    // Reembolsa o valor da despesa no saldo do usuário
    const usuario = await this.findOne(usuarioId);
    await this.prisma.user.update({
      where: { id: usuarioId },
      data: {
        saldo: usuario.saldo + despesa.valor,
      },
    });
  
    return { message: 'Despesa excluída e valor reembolsado ao saldo.' };
  }

  async addBalance(id: number, valor: number) {
    const usuario = await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: {
        saldo: usuario.saldo + valor,
      },
    });
  }

  async removeBalance(id: number, valor: number) {
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

  async getBalance(id: number) {
    const usuario = await this.findOne(id);
    return { saldo: usuario.saldo };
  }
}
