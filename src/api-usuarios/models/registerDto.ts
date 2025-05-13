import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthRegisterDto {
    @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
    @IsString()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @ApiProperty({ example: 'juan@mail.com', description: 'Correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    mail: string;

    @ApiPropertyOptional({ example: '123456789', description: 'Teléfono del usuario' })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;

    @ApiPropertyOptional({ example: 'Av. Siempre Viva 123', description: 'Dirección del usuario' })
    @IsString()
    @IsOptional()
    usrdir?: string;

    @ApiPropertyOptional({ example: '2025-05-13', description: 'Fecha de creación' })
    @IsString()
    @IsOptional()
    fecha_creacion?: string;
}