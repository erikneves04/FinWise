import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
export declare class DespesasController {
    private readonly despesasService;
    constructor(despesasService: DespesasService);
    create(usuarioId: number, dto: CreateDespesaDto): Promise<{
        id: number;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        data: Date;
        usuarioId: number;
    }>;
    findAll(usuarioId: number): Promise<{
        id: number;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        data: Date;
        usuarioId: number;
    }[]>;
    findOne(usuarioId: number, id: number): Promise<{
        id: number;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        data: Date;
        usuarioId: number;
    }>;
    update(usuarioId: number, id: number, dto: UpdateDespesaDto): Promise<{
        id: number;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        data: Date;
        usuarioId: number;
    }>;
    remove(usuarioId: number, id: number): Promise<{
        id: number;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        data: Date;
        usuarioId: number;
    }>;
}
