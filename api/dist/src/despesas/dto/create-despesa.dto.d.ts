import { DespesaTipo } from '@prisma/client';
export declare class CreateDespesaDto {
    descricao: string;
    valor: number;
    tipo: DespesaTipo;
    data: Date;
    usuarioId: number;
}
