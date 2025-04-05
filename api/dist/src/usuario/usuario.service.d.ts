import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
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
