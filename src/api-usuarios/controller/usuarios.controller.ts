import { Controller, Post, Body, Get, Delete, Put, Param, Query, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../service/usuarios.service';
import { AuthRegisterDto } from '../models/registerDto';
import { AuthLoginDto } from '../models/loginDto';
import { AddressDto } from 'src/api-usuarios/models/AdressDto';
import { UserUpdateDto } from 'src/api-usuarios/models/updateUserDto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    // AUTH
    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiBody({ type: AuthRegisterDto })
    @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async registrarUsuario(@Body() data: AuthRegisterDto) {
        return this.usuariosService.registrarUsuario(data);
    }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión de usuario' })
    @ApiBody({ type: AuthLoginDto })
    @ApiResponse({ status: 200, description: 'Login exitoso. Retorna un token.' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    async iniciarSesion(@Body() data: AuthLoginDto) {
        return this.usuariosService.iniciarSesion(data);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':usuario_id')
    @ApiOperation({ summary: 'Obtener usuario por ID' })
    @ApiParam({ name: 'usuario_id', type: Number, description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    async obtenerUsuarioPorId(@Param('usuario_id') usuario_id: number) {
        return this.usuariosService.obtenerUsuarioPorId(usuario_id);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar usuario por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    @ApiBody({ type: UserUpdateDto })
    @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    async actualizarUsuario(
        @Param('id') id: number,
        @Body() data: UserUpdateDto
    ) {
        return this.usuariosService.actualizarUsuario(id, data);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar usuario por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    async eliminarUsuario(@Param('id') id: number) {
        return this.usuariosService.eliminarUsuario(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post(':id/address')
    @ApiOperation({ summary: 'Agregar o actualizar dirección de usuario' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    @ApiBody({ type: AddressDto })
    @ApiResponse({ status: 200, description: 'Dirección agregada o actualizada correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    async agregarActualizarDireccion(
        @Param('id') id: number,
        @Body() data: AddressDto
    ) {
        return this.usuariosService.agregarActualizarDireccion(id, data);
    }
}