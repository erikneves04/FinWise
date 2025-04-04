import { DespesaTipo } from '../despesa-tipo.enum';

export class Despesa {
  id: number;
  descricao: string;
  valor: number;
  tipo: DespesaTipo;
  data: Date;
}