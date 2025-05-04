import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
    username: string;
}