import { Module } from '@nestjs/common';
import { ProductosController } from './controller/productos.controller';
import { ProductosService } from './service/productos.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ProductosController],
    providers: [ProductosService]
})
export class ProductosModule {}
