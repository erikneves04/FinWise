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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const create_despesa_dto_1 = require("../despesas/dto/create-despesa.dto");
const update_despesa_dto_1 = require("../despesas/dto/update-despesa.dto");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    create(createUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }
    findAll() {
        return this.usuarioService.findAll();
    }
    findOne(id) {
        return this.usuarioService.findOne(+id);
    }
    createDespesa(id, createDespesaDto) {
        return this.usuarioService.criarDespesa(id, createDespesaDto);
    }
    async getDespesasDoUsuario(id) {
        return this.usuarioService.getDespesas(id);
    }
    async buscarDespesaPorId(usuarioId, despesaId) {
        return this.usuarioService.buscarDespesaPorId(usuarioId, despesaId);
    }
    updateDespesa(usuarioId, despesaId, updateDespesaDto) {
        return this.usuarioService.atualizarDespesa(usuarioId, despesaId, updateDespesaDto);
    }
    deleteDespesa(usuarioId, despesaId) {
        return this.usuarioService.deletarDespesa(usuarioId, despesaId);
    }
    update(id, updateUsuarioDto) {
        return this.usuarioService.update(+id, updateUsuarioDto);
    }
    remove(id) {
        return this.usuarioService.remove(+id);
    }
    adicionarSaldo(id, valor) {
        return this.usuarioService.adicionarSaldo(+id, valor);
    }
    removerSaldo(id, valor) {
        return this.usuarioService.removerSaldo(+id, valor);
    }
    getSaldo(id) {
        return this.usuarioService.getSaldo(+id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/despesas'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_despesa_dto_1.CreateDespesaDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "createDespesa", null);
__decorate([
    (0, common_1.Get)(':id/despesas'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getDespesasDoUsuario", null);
__decorate([
    (0, common_1.Get)(':id/despesas/:despesaId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('despesaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "buscarDespesaPorId", null);
__decorate([
    (0, common_1.Patch)(':usuarioId/despesas/:despesaId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('despesaId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_despesa_dto_1.UpdateDespesaDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "updateDespesa", null);
__decorate([
    (0, common_1.Delete)(':usuarioId/despesas/:despesaId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('despesaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "deleteDespesa", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/saldo/adicionar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('valor', common_1.ParseFloatPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "adicionarSaldo", null);
__decorate([
    (0, common_1.Post)(':id/saldo/remover'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('valor', common_1.ParseFloatPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "removerSaldo", null);
__decorate([
    (0, common_1.Get)(':id/saldo'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "getSaldo", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map