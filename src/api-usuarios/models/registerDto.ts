import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    mail: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    telefono: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;
}