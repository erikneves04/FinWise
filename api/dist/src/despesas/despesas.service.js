"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DespesasService = void 0;
const common_1 = require("@nestjs/common");
let DespesasService = class DespesasService {
    constructor() {
        this.despesas = [];
        this.idCounter = 1;
    }
    create(createDespesaDto) {
        const novaDespesa = { id: this.idCounter++, ...createDespesaDto };
        this.despesas.push(novaDespesa);
        return novaDespesa;
    }
    findAll() {
        return this.despesas;
    }
    findOne(id) {
        return this.despesas.find(d => d.id === id);
    }
    update(id, updateDespesaDto) {
        const despesa = this.findOne(id);
        if (!despesa)
            return null;
        Object.assign(despesa, updateDespesaDto);
        return despesa;
    }
    remove(id) {
        const index = this.despesas.findIndex(d => d.id === id);
        if (index === -1) {
            message: 'Despesa removida com sucesso';
            return false;
        }
        this.despesas.splice(index, 1);
        message: 'Despesa não encontrada';
        return true;
    }
};
exports.DespesasService = DespesasService;
exports.DespesasService = DespesasService = __decorate([
    (0, common_1.Injectable)()
], DespesasService);
//# sourceMappingURL=despesas.service.js.map