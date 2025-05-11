import { Module } from '@nestjs/common';
import { ProductosController } from './controller/productos.controller';
import { ProductosService } from './service/productos.service';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { UsuariosModule } from 'src/api-usuarios/usuarios.module';
@Module({
    imports: [AuthModule, HttpModule, UsuariosModule],
    controllers: [ProductosController],
    providers: [ProductosService]
})
export class ProductosModule {}
