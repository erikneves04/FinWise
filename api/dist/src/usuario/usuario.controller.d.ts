import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
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
    findOne(id: string): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    adicionarSaldo(id: string, valor: number): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    removerSaldo(id: string, valor: number): Promise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
    }>;
    getSaldo(id: string): Promise<{
        saldo: number;
    }>;
}
