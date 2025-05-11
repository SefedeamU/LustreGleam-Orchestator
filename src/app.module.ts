import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './api-usuarios/usuarios.module';
import { ProductosModule } from './api-productos/productos.module';
import { FacturasModule } from './api-facturas/facturas.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsuariosModule, ProductosModule, FacturasModule, HttpModule,
    ConfigModule.forRoot({
      isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}