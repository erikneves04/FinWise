import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDespesaDto } from 'src/despesas/dto/create-despesa.dto';
import { UpdateDespesaDto } from 'src/despesas/dto/update-despesa.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/usuario.decorator';
import { User as PrismaUser, Despesa } from '@prisma/client';
import { DespesaTipo } from '@prisma/client'; 

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUsuarioDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('E-mail já está em uso.');
    }

    const hashed = await bcrypt.hash(dto.senha, 10);

    return this.prisma.user.create({
      data: {
        ...dto,
        senha: hashed,
      },
    });
  }

  async findAll(): Promise<PrismaUser[]> {
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

  async createExpense(id: number, dto: CreateDespesaDto): Promise<Despesa> {
    const usuario = await this.findOne(id);
  
    // Verificando se o tipo da despesa é válido
    if (!Object.values(DespesaTipo).includes(dto.tipo)) {
      throw new BadRequestException('Tipo de despesa inválido.');
    }
    if (usuario.saldo < dto.valor) {
      throw new BadRequestException('Saldo insuficiente para criar a despesa.');
    }

    const despesa = await this.prisma.despesa.create({
      data: {
        ...dto,
        usuarioId: usuario.id,
      },
    });

    await this.prisma.user.update({
      where: { id: usuario.id },
      data: {
        saldo: usuario.saldo - dto.valor,
      },
    });

    return despesa;
  }
  

  async getExpenses(@User() user: any): Promise<Despesa[]> {
    return this.prisma.despesa.findMany({
      where: { usuarioId: user.id },
    });
  }

  async getExpenseById(id: number, despesaId: number): Promise<Despesa> { 
    const despesa = await this.prisma.despesa.findFirst({
      where: {
        usuarioId: id,
        id: despesaId,
      },
    });

    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }

    return despesa;
  }

  async updateExpense(@User() user: any, despesaId: number, dto: UpdateDespesaDto): Promise<Despesa> {
    const despesaAntiga = await this.prisma.despesa.findFirst({
      where: { usuarioId: user.id, id: despesaId },
    });

    if (!despesaAntiga) {
      console.log("UsuarioID: " + user.id);
      console.log("DespesaID: " + despesaId);
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }

    const diferenca = dto.valor - despesaAntiga.valor;
    const usuario = await this.findOne(user.id);

    if (diferenca > 0 && usuario.saldo < diferenca) {
      throw new BadRequestException('Saldo insuficiente para atualizar a despesa.');
    }

    // Atualiza o saldo conforme a diferença
    await this.prisma.user.update({
      where: { id: user.id },
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

  async deleteExpense(@User() user: any, despesaId: number) {
    const despesa = await this.prisma.despesa.findFirst({
      where: { id: despesaId, usuarioId: user.id },
    });


    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada para este usuário.');
    }

    await this.prisma.despesa.delete({
      where: { id: despesaId },
    });

    // Reembolsa o valor da despesa no saldo do usuário
    const usuario = await this.findOne(user.id);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        saldo: usuario.saldo + despesa.valor,
      },
    });

    return { message: 'Despesa excluída e valor reembolsado ao saldo.' };
  }

  async addBalance(@User() user: any, valor: number) {
    const usuario = await this.findOne(user.id);
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        saldo: usuario.saldo + valor,
      },
    });
  }

  async removeBalance(@User() user: any, valor: number) {
    const usuario = await this.findOne(user.id);
    if (usuario.saldo < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        saldo: usuario.saldo - valor,
      },
    });
  }

  async getBalance(@User() user: any) {
    const usuario = await this.findOne(user.id);
    return { saldo: usuario.saldo };
  }
}
