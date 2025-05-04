import { Controller, Post, Body, Get, Delete, Put, Param, Query } from '@nestjs/common';

import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { AuthRegisterDto } from '../../models/registerDto';
import { AuthLoginDto } from '../../models/loginDto';
import { AddressDto } from 'src/api-usuarios/models/AdressDto';
import { UserUpdateDto } from 'src/api-usuarios/models/updateUserDto';
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

//AUTH
    @Post('register')
    async registrarUsuario(@Body() data: AuthRegisterDto) {
        return this.usuariosService.registrarUsuario(data);
    }

    @Post('login')
    async iniciarSesion(@Body() data: AuthLoginDto) {
        return this.usuariosService.iniciarSesion(data);
    }

//USUARIOS
    @Get()
    async obtenerUsuarios(@Query('skip') skip = 0, @Query('limit') limit = 10) {
        return this.usuariosService.obtenerUsuarios(skip, limit);
    }

    @Get(':id')
    async obtenerUsuarioPorId(@Param('id') id: number) {
        return this.usuariosService.obtenerUsuarioPorId(id);
    }

    @Put(':id')
    async actualizarUsuario(@Param('id') id: number, @Body() data: UserUpdateDto) {
        return this.usuariosService.actualizarUsuario(id, data);
    }

    @Delete(':id')
    async eliminarUsuario(@Param('id') id: number) {
        return this.usuariosService.eliminarUsuario(id);
    }

    @Post(':id/address')
    async agregarActualizarDireccion(@Param('id') id: number, @Body() data: AddressDto) {
        return this.usuariosService.agregarActualizarDireccion(id, data);
    }    
}