import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FacturasController } from './controller/facturas.controller';
import { FacturasService } from './service/facturas.service';

@Module({
    imports: [AuthModule],
    controllers: [FacturasController],
    providers: [FacturasService]
})
export class FacturasModule {}