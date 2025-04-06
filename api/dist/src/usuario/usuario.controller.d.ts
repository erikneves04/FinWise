import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDespesaDto } from 'src/despesas/dto/create-despesa.dto';
import { UpdateDespesaDto } from 'src/despesas/dto/update-despesa.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    create(createUsuarioDto: CreateUsuarioDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    createDespesa(id: number, createDespesaDto: CreateDespesaDto): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }>;
    getDespesasDoUsuario(id: number): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }[]>;
    buscarDespesaPorId(usuarioId: number, despesaId: number): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }>;
    updateDespesa(usuarioId: number, despesaId: number, updateDespesaDto: UpdateDespesaDto): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }>;
    deleteDespesa(usuarioId: number, despesaId: number): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    adicionarSaldo(id: number, valor: number): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    removerSaldo(id: number, valor: number): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    getSaldo(id: number): Promise<{
        saldo: number;
    }>;
}
