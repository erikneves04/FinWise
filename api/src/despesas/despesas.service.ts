import { Injectable } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa } from './entities/despesa.entity';

@Injectable()
export class DespesasService {
  private despesas: Despesa[] = [];
  private idCounter = 1;

  create(createDespesaDto: CreateDespesaDto): Despesa {
    const novaDespesa = { id: this.idCounter++, ...createDespesaDto };
    this.despesas.push(novaDespesa);
    return novaDespesa;
  }

  findAll(): Despesa[] {
    return this.despesas;
  }

  findOne(id: number): Despesa {
    return this.despesas.find(d => d.id === id);
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto): Despesa {
    const despesa = this.findOne(id);
    if (!despesa) return null;
    Object.assign(despesa, updateDespesaDto);
    return despesa;
  }

  remove(id: number): boolean {
    const index = this.despesas.findIndex(d => d.id === id);
    if (index === -1) {
      message: 'Despesa removida com sucesso';
      return false;
    }
    this.despesas.splice(index, 1);
    message: 'Despesa não encontrada';
    return true;
  }
}
