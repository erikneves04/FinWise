"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsuarioService = class UsuarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUsuarioDto) {
        return this.prisma.user.create({
            data: createUsuarioDto,
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    async findOne(id) {
        const usuario = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return usuario;
    }
    async update(id, updateUsuarioDto) {
        await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data: updateUsuarioDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async adicionarSaldo(id, valor) {
        const usuario = await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data: {
                saldo: usuario.saldo + valor,
            },
        });
    }
    async removerSaldo(id, valor) {
        const usuario = await this.findOne(id);
        if (usuario.saldo < valor) {
            throw new common_1.BadRequestException('Saldo insuficiente');
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                saldo: usuario.saldo - valor,
            },
        });
    }
    async getSaldo(id) {
        const usuario = await this.findOne(id);
        return { saldo: usuario.saldo };
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map