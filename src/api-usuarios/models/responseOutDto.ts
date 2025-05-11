import { ApiProperty } from '@nestjs/swagger';

export class UserOutDto {
    @ApiProperty({ example: 'juan@mail.com', description: 'Correo electrónico' })
    email: string;

    @ApiProperty({ example: 1, description: 'ID del usuario' })
    id: number;

    @ApiProperty({ example: 'admin', description: 'Rol del usuario' })
    role: string;

    @ApiProperty({ example: 'Juan', description: 'Nombre de usuario' })
    username: string;
}