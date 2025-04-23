import { Test, TestingModule } from '@nestjs/testing';
import { EstatisticasController } from './estatisticas.controller';
import { EstatisticasService } from './estatisticas.service';

describe('EstatisticasController', () => {
  let controller: EstatisticasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatisticasController],
      providers: [EstatisticasService],
    }).compile();

    controller = module.get<EstatisticasController>(EstatisticasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
