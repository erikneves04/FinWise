import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseFloatPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDespesaDto } from 'src/despesas/dto/create-despesa.dto';
import { UpdateDespesaDto } from 'src/despesas/dto/update-despesa.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(+id);
  }

  @Post(':id/despesas')
  createDespesa(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDespesaDto: CreateDespesaDto,
  ) {
    return this.usuarioService.criarDespesa(id, createDespesaDto);
  }

  @Get(':id/despesas')
  async getDespesasDoUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.getDespesas(id);
  }

  @Get(':id/despesas/:despesaId')
  async buscarDespesaPorId(
    @Param('id', ParseIntPipe) usuarioId: number,
    @Param('despesaId', ParseIntPipe) despesaId: number,
  ) {
    return this.usuarioService.buscarDespesaPorId(usuarioId, despesaId);
  }

  @Patch(':usuarioId/despesas/:despesaId')
  updateDespesa(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('despesaId', ParseIntPipe) despesaId: number,
    @Body() updateDespesaDto: UpdateDespesaDto,
  ) {
    return this.usuarioService.atualizarDespesa(usuarioId, despesaId, updateDespesaDto);
  }

  @Delete(':usuarioId/despesas/:despesaId')
  deleteDespesa(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('despesaId', ParseIntPipe) despesaId: number,
  ) {
    return this.usuarioService.deletarDespesa(usuarioId, despesaId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(+id);
  }

  @Post(':id/saldo/adicionar')
  adicionarSaldo(
    @Param('id') id: number,
    @Body('valor', ParseFloatPipe) valor: number,
  ) {
    return this.usuarioService.adicionarSaldo(+id, valor);
  }

  @Post(':id/saldo/remover')
  removerSaldo(
    @Param('id') id: number,
    @Body('valor', ParseFloatPipe) valor: number,
  ) {
    return this.usuarioService.removerSaldo(+id, valor);
  }

  @Get(':id/saldo')
  getSaldo(@Param('id') id: number) {
    return this.usuarioService.getSaldo(+id);
  }

}

