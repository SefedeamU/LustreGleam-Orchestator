import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FacturasController } from './controller/facturas.controller';
import { FacturasService } from './service/facturas.service';
import { HttpModule } from '@nestjs/axios';
import { UsuariosModule } from 'src/api-usuarios/usuarios.module';

@Module({
    imports: [AuthModule, HttpModule, UsuariosModule],
    controllers: [FacturasController],
    providers: [FacturasService]
})
export class FacturasModule {}