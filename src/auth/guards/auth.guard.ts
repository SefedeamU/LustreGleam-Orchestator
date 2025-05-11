import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../../api-usuarios/service/usuarios.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly usuariosService: UsuariosService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no proporcionado o inválido');
        }
        const token = authHeader.split(' ')[1];
        const result = await this.usuariosService.verificarToken(token);
        if (!result.valid) throw new UnauthorizedException('Token inválido o expirado');
        // Puedes adjuntar el user_id al request para usarlo en los handlers
        request.user_id = result.user_id;
        return true;
    }
}