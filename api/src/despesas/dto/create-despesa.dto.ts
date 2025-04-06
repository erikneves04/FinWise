import { DespesaTipo } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateDespesaDto {
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  valor: number;

  @IsEnum(DespesaTipo)
  tipo: DespesaTipo;

  @IsDateString()
  data: Date;

  @IsNumber()
  usuarioId: number;
}
