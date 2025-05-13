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

        // Solo acepta usuario_id (en query, body o header)
        const usuario_id =
            request.query?.usuario_id ||
            request.body?.usuario_id ||
            request.headers['usuario_id'];

        if (!usuario_id) {
            throw new UnauthorizedException('usuario_id no proporcionado');
        }

        const result = await this.usuariosService.verificarToken(token, usuario_id);
        if (!result.valid) throw new UnauthorizedException('Token inválido o expirado');
        request.usuario_id = result.usuario_id;
        return true;
    }
}