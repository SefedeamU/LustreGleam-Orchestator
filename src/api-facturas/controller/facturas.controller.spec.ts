import { Test, TestingModule } from '@nestjs/testing';
import { FacturasController } from './facturas.controller';

describe('FacturasController', () => {
  let controller: FacturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturasController],
    }).compile();

    controller = module.get<FacturasController>(FacturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
