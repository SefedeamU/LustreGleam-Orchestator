import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { AuthRegisterDto } from '../models/registerDto';
import { AuthLoginDto } from '../models/loginDto';
import { UserOutDto } from '../models/responseOutDto';
import { UserUpdateDto } from '../models/updateUserDto';
import { AddressDto } from '../models/AdressDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {
    
    constructor(private readonly httpService: HttpService, private configService: ConfigService) {
        const API_USUARIOS = this.configService.get('API_USUARIOS');
        this.authUrl = `${API_USUARIOS}/auth`;
        this.usersUrl = `${API_USUARIOS}/users`;
    }

    private readonly authUrl : string;
    private readonly usersUrl : string;

//AUTH
    // Registrar usuario
    async registrarUsuario(data: AuthRegisterDto): Promise<UserOutDto> {
        try {
        const response = await lastValueFrom(
            this.httpService.post(`${this.authUrl}/register`, data),
        );
        return response.data;
        } catch (error) {
        throw new Error(`Error al registrar usuario: ${error.response?.data?.message || error.message}`);
        }
    }

    // Iniciar sesión
    async iniciarSesion(data: AuthLoginDto): Promise<string> {
        try {
        const response = await lastValueFrom(
            this.httpService.post(`${this.authUrl}/login`, data),
        );
        return response.data; // Token de autenticación
        } catch (error) {
        throw new Error(`Error al iniciar sesión: ${error.response?.data?.message || error.message}`);
        }
    }

//USUARIOS
    // Obtener todos los usuarios
    async obtenerUsuarios(skip = 0, limit = 10): Promise<UserOutDto[]> {
        try {
        const response = await lastValueFrom(
            this.httpService.get(`${this.usersUrl}/users`, { params: { skip, limit } }),
        );
        return response.data;
        } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.response?.data?.message || error.message}`);
        }
    }

    // Obtener un usuario por ID
    async obtenerUsuarioPorId(userId: number): Promise<UserOutDto> {
        try {
        const response = await lastValueFrom(
            this.httpService.get(`${this.usersUrl}/users/${userId}`),
        );
        return response.data;
        } catch (error) {
        throw new Error(`Error al obtener el usuario con ID ${userId}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Actualizar un usuario por ID
    async actualizarUsuario(userId: number, data: UserUpdateDto): Promise<UserOutDto> {
        try {
        const response = await lastValueFrom(
            this.httpService.put(`${this.usersUrl}/users/${userId}`, data),
        );
        return response.data;
        } catch (error) {
        throw new Error(`Error al actualizar el usuario con ID ${userId}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Eliminar un usuario por ID
    async eliminarUsuario(userId: number): Promise<void> {
        try {
        await lastValueFrom(this.httpService.delete(`${this.usersUrl}/users/${userId}`));
        } catch (error) {
        throw new Error(`Error al eliminar el usuario con ID ${userId}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Agregar o actualizar dirección de un usuario
    async agregarActualizarDireccion(userId: number, data: AddressDto): Promise<AddressDto> {
        try {
        const response = await lastValueFrom(
            this.httpService.post(`${this.usersUrl}/users/${userId}/address`, data),
        );
        return response.data;
        } catch (error) {
        throw new Error(`Error al agregar o actualizar la dirección del usuario con ID ${userId}: ${error.response?.data?.message || error.message}`);
        }
    }

    
    // Verificar token con un guard
    async verificarToken(token: string): Promise<{ valid: boolean; user_id: string }> {
        try {
        const response = await lastValueFrom(
            this.httpService.post(`${this.authUrl}/verify-token`, { token }),
        );
        return response.data;
        } catch (error) {
        throw new Error(`Error al verificar el token: ${error.response?.data?.message || error.message}`);
        }
    }
}