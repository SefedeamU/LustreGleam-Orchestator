import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from '../../api-usuarios/service/usuarios.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token no proporcionado o inválido');
        }

        const token = authHeader.split(' ')[1];

        try {
        const result = await this.usuariosService.verificarToken(token);
        request.user = { userId: result.user_id }; // Adjuntar información del usuario a la solicitud
        return result.valid;
        } catch (error) {
        throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}