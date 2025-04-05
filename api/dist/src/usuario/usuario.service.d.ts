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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        nome: string;
        email: string;
        celular: string;
        senha: string;
        dataNascimento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
