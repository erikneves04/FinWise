import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';

@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user: any, @Body() createReceitaDto: CreateReceitaDto) {
    return this.receitasService.create(user.id, createReceitaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: any) {
    return this.receitasService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@User() user: any, @Param('id') id: string) {
    return this.receitasService.findOne(user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@User() user: any, @Param('id') id: string, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitasService.update(user.id, +id, updateReceitaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@User() user: any, @Param('id') id: string) {
    return this.receitasService.delete(user.id, +id);
  }
}
