import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacturasController } from './api-facturas/controller/facturas/facturas.controller';
import { FacturasService } from './api-facturas/service/facturas/facturas.service';
import { UsuariosService } from './api-usuarios/service/usuarios/usuarios.service';
import { UsuariosController } from './api-usuarios/controller/usuarios/usuarios.controller';
import { ProductosController } from './api-productos/controller/productos/productos.controller';
import { ProductosService } from './api-productos/service/productos/productos.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, FacturasController, UsuariosController, ProductosController],
  providers: [AppService, FacturasService, UsuariosService, ProductosService],
})
export class AppModule {}
