import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
                if (error.response) {
                    console.log('Error de respuesta:', error.response.data);
                    console.log('Error de respuesta:', error.response.status);
                    throw new HttpException(
                        error.response.data?.detail || error.response.data?.message || 'Error externo',
                        error.response.status,
                        {
                            cause: error,
                            description: error.response.data?.detail,
                        }
                    );
                }
                // SIEMPRE lanza HttpException, nunca Error
                throw new HttpException(
                    error.message || 'Error interno',
                    500
                );
            }
        }

    // Iniciar sesión
    async iniciarSesion(data: AuthLoginDto): Promise<string> {
            try {
                const response = await lastValueFrom(
                    this.httpService.post(`${this.authUrl}/login`, data),
                );
                return response.data;
            } catch (error) {
                if (error.response) {
                    console.log('Error de respuesta:', error.response.data);
                    console.log('Error de respuesta:', error.response.status);
                    throw new HttpException(
                        error.response.data?.detail || error.response.data?.message || 'Error externo',
                        error.response.status,
                        {
                            cause: error,
                            description: error.response.data?.detail,
                        }
                    );
                }
                // SIEMPRE lanza HttpException, nunca Error
                throw new HttpException(
                    error.message || 'Error interno',
                    500
                );
            }
        }

    // Obtener usuario por ID
    async obtenerUsuarioPorId(usuario_id: number): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.usersUrl}/users/${usuario_id}`)
            );
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado`);
            }
            throw new HttpException(
                error.response?.data?.message || error.message,
                error.response?.status || 500
            );
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
    async verificarToken(token: string, usuario_id: string): Promise<{ valid: boolean; usuario_id: string; role: string }> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`${this.usersUrl}/verify-token`, { token, usuario_id })
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new HttpException(
                    error.response.data?.detail || error.response.data?.message || 'Error externo',
                    error.response.status,
                    {
                        cause: error,
                        description: error.response.data?.detail,
                    }
                );
            }
            throw new HttpException(
                error.message || 'Error interno',
                500
            );
        }
    }
}