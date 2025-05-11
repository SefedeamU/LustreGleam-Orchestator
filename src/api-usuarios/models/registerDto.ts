import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
    @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
    @IsString()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @ApiProperty({ example: 'juan@mail.com', description: 'Correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    mail: string;

    @ApiProperty({ example: '123456789', description: 'Teléfono del usuario' })
    @IsString()
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    telefono: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;
}