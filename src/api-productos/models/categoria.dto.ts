import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaDto {
    @ApiProperty({ example: 1, description: 'ID de la categoría' })
    @IsNumber()
    @Min(0, { message: 'El ID de la categoría no puede ser negativo' })
    id: number;

    @ApiProperty({ example: 'Electrónica', description: 'Nombre de la categoría' })
    @IsString()
    @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
    categoria: string;
}