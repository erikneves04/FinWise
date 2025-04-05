import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    create(createUsuarioDto: CreateUsuarioDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    adicionarSaldo(id: string, valor: number): Promise<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }>;
    removerSaldo(id: string, valor: number): Promise<{
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
        saldo: number;
        id: number;
    }>;
}
