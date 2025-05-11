import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserUpdateDto {
    @ApiPropertyOptional({ example: 'nuevo@mail.com', description: 'Correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: 'nuevaPassword123', description: 'Contraseña' })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({ example: 'admin', description: 'Rol del usuario' })
    @IsString()
    @IsOptional()
    role?: string;
}