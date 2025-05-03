import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateReceitaDto {
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  valor: number;

  @IsString()
  tipo: string;

  @IsDateString()
  data: Date;

  @IsNumber()
  usuarioId: number;
}
