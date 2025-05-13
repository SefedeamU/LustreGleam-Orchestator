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

        // Extrae el user_id del query, body o header según tu API
        const user_id = request.query?.usuario_id || request.body?.user_id || request.headers['user_id'];
        if (!user_id) {
            throw new UnauthorizedException('user_id no proporcionado');
        }

        const result = await this.usuariosService.verificarToken(token, user_id);
        if (!result.valid) throw new UnauthorizedException('Token inválido o expirado');
        request.user_id = result.user_id;
        return true;
    }
}