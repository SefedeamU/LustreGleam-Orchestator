import { forwardRef, Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosModule } from 'src/api-usuarios/usuarios.module';

@Module({
    imports: [forwardRef(()=>UsuariosModule)],
    providers: [AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {}