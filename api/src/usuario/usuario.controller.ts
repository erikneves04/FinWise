import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  ParseFloatPipe,
  Param
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDespesaDto } from 'src/despesas/dto/create-despesa.dto';
import { UpdateDespesaDto } from 'src/despesas/dto/update-despesa.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/usuario.decorator';
import { Despesa } from '@prisma/client';


@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    return this.authService.login(body.email, body.senha);
  }

  @Post('logout')
  logout() {
    return { message: 'Logout bem-sucedido. Exclua o token no cliente.' };
  }

  /* @Get('usuario')
  getAllUsers() {
    return this.usuarioService.findAll();
  } */

  @UseGuards(JwtAuthGuard)
  @Get()
  getPerfil(@User() user: any) {
    return this.usuarioService.findOne(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@User() user: any, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(user.id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@User() user: any) {
    return this.usuarioService.remove(user.id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('despesas')
  createDespesa(@User() user: any, @Body() dto: CreateDespesaDto): Promise<Despesa> {
    return this.usuarioService.createExpense(user.id, dto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('despesas')
  getDespesas(@User() user: any): Promise<Despesa[]> {
    return this.usuarioService.getExpenses(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('despesas/:despesaId')
  getDespesa(@User() user: any, @Param('despesaId') despesaId: number): Promise<Despesa | null> {
    return this.usuarioService.getExpenseById(user, +despesaId);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('despesas/:despesaId')
  updateDespesa(
    @User() user: any,
    @Param('despesaId') despesaId: number,
    @Body() dto: UpdateDespesaDto,
  ): Promise<Despesa> {
    return this.usuarioService.updateExpense(user, +despesaId, dto);
  }

  

  @UseGuards(JwtAuthGuard)
  @Delete('despesas/:despesaId')
  deleteDespesa(@User() user: any, @Param('despesaId') despesaId: number) {
    return this.usuarioService.deleteExpense(user, +despesaId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saldo')
  getSaldo(@User() user: any) {
    return this.usuarioService.getBalance(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saldo/adicionar')
  adicionarSaldo(
    @User() user: any,
    @Body('valor', ParseFloatPipe) valor: number,
  ) {
    return this.usuarioService.addBalance(user, valor);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saldo/remover')
  removerSaldo(
    @User() user: any,
    @Body('valor', ParseFloatPipe) valor: number,
  ) {
    return this.usuarioService.removeBalance(user, valor);
  }
}