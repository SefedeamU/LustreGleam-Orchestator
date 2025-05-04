import { IsString, IsNumber, IsNotEmpty, Min, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

import { CategoriaDto } from './categoria.dto';

export class ProductoDto {
    @IsString()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    descripcion: string;

    @IsNumber()
    @Min(0, { message: 'El precio no puede ser negativo' })
    precio: number;

    @IsNumber()
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;

    @ValidateNested()
    @IsObject()
    @Type(() => CategoriaDto)
    categoria: CategoriaDto;

    @IsString()
    @IsNotEmpty({ message: 'La URL de la imagen no puede estar vacía' })
    imagen_url: string;

    @IsString()
    @IsNotEmpty({ message: 'La fecha de creación no puede estar vacía' })
    fecha_creacion: string;
}