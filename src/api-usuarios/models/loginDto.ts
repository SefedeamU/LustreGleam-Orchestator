import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
    @ApiProperty({ example: 'juan@mail.com', description: 'Correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    mail: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;
}