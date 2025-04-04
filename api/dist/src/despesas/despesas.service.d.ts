import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa } from './entities/despesa.entity';
export declare class DespesasService {
    private despesas;
    private idCounter;
    create(createDespesaDto: CreateDespesaDto): Despesa;
    findAll(): Despesa[];
    findOne(id: number): Despesa;
    update(id: number, updateDespesaDto: UpdateDespesaDto): Despesa;
    remove(id: number): boolean;
}
