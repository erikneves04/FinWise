import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('usuarios/:usuarioId/despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  create(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Body() dto: CreateDespesaDto,
  ) {
    return this.despesasService.create(usuarioId, dto);
  }

  @Get()
  findAll(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.despesasService.findAll(usuarioId);
  }

  @Get(':id')
  findOne(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.despesasService.findOne(usuarioId, id);
  }

  @Put(':id')
  update(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDespesaDto,
  ) {
    return this.despesasService.update(usuarioId, id, dto);
  }

  @Delete(':id')
  remove(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.despesasService.remove(usuarioId, id);
  }
}
