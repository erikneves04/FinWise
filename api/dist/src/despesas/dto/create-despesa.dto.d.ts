import { DespesaTipo } from '../despesa-tipo.enum';
export declare class CreateDespesaDto {
    descricao: string;
    valor: number;
    tipo: DespesaTipo;
    data: Date;
}
