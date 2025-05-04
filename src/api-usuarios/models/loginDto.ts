import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;
}