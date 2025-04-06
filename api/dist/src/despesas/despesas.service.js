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
exports.DespesasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DespesasService = class DespesasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(usuarioId, dto) {
        return this.prisma.despesa.create({
            data: {
                descricao: dto.descricao,
                valor: dto.valor,
                tipo: dto.tipo,
                data: new Date(dto.data),
                usuarioId: usuarioId,
            },
        });
    }
    async findAll(usuarioId) {
        return this.prisma.despesa.findMany({
            where: { usuarioId },
        });
    }
    async findOne(usuarioId, id) {
        const despesa = await this.prisma.despesa.findUnique({ where: { id } });
        if (!despesa)
            throw new common_1.NotFoundException('Despesa não encontrada');
        if (despesa.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException('Acesso negado');
        return despesa;
    }
    async update(usuarioId, id, dto) {
        const despesa = await this.findOne(usuarioId, id);
        return this.prisma.despesa.update({
            where: { id },
            data: dto,
        });
    }
    async remove(usuarioId, id) {
        const despesa = await this.findOne(usuarioId, id);
        return this.prisma.despesa.delete({
            where: { id },
        });
    }
};
exports.DespesasService = DespesasService;
exports.DespesasService = DespesasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DespesasService);
//# sourceMappingURL=despesas.service.js.map