import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateDespesaDto {
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