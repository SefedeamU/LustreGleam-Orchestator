import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacturasController } from './api-facturas/controller/facturas.controller';
import { FacturasService } from './api-facturas/service/facturas.service';
import { UsuariosService } from './api-usuarios/service/usuarios.service';
import { UsuariosController } from './api-usuarios/controller/usuarios.controller';
import { ProductosController } from './api-productos/controller/productos.controller';
import { ProductosService } from './api-productos/service/productos.service';
import { AuthGuard } from './api-usuarios/service/auth.guard';

@Module({
  imports: [HttpModule],
  controllers: [AppController, FacturasController, UsuariosController, ProductosController],
  providers: [AppService, FacturasService, UsuariosService, ProductosService, AuthGuard],
})
export class AppModule {}
