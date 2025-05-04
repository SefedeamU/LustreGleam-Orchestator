import { Module } from '@nestjs/common';
import { UsuariosService } from './service/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [AuthModule],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})

export class UsuariosModule {}