import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDespesaDto } from 'src/despesas/dto/create-despesa.dto';
import { UpdateDespesaDto } from 'src/despesas/dto/update-despesa.dto';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
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
    criarDespesa(usuarioId: number, dto: CreateDespesaDto): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }>;
    getDespesas(usuarioId: number): Promise<{
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
    atualizarDespesa(usuarioId: number, despesaId: number, dto: UpdateDespesaDto): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
    }>;
    deletarDespesa(usuarioId: number, despesaId: number): Promise<{
        id: number;
        data: Date;
        descricao: string;
        valor: number;
        tipo: import(".prisma/client").$Enums.DespesaTipo;
        usuarioId: number;
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
