import { ReceitaTipo } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateReceitaDto {
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  valor: number;

  @IsEnum(ReceitaTipo)
  tipo: ReceitaTipo;

  @IsDateString()
  data: Date;

  @IsNumber()
  usuarioId: number;
}
