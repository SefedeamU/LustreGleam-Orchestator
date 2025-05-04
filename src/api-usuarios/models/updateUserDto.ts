import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserUpdateDto {
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    role?: string;
}