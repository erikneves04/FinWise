import { DespesaTipo } from '../despesa-tipo.enum';

export class CreateDespesaDto {
  descricao: string;
  valor: number;
  tipo: DespesaTipo;
  data: Date;
}
