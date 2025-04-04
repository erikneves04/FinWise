import { DespesaTipo } from '../despesa-tipo.enum';
export declare class Despesa {
    id: number;
    descricao: string;
    valor: number;
    tipo: DespesaTipo;
    data: Date;
}
