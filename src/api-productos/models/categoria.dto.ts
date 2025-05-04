import { IsString, IsNumber, IsNotEmpty, Min, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoriaDto {
    @IsNumber()
    @Min(0, { message: 'El ID de la categoría no puede ser negativo' })
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
    categoria: string;
}