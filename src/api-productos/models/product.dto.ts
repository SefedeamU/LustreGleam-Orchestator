import { IsString, IsNumber, IsNotEmpty, Min, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriaDto } from './categoria.dto';

export class ProductoDto {
    @ApiProperty({ example: 'Smartphone', description: 'Descripción del producto' })
    @IsString()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    descripcion: string;

    @ApiProperty({ example: 299.99, description: 'Precio del producto' })
    @IsNumber()
    @Min(0, { message: 'El precio no puede ser negativo' })
    precio: number;

    @ApiProperty({ example: 50, description: 'Stock disponible' })
    @IsNumber()
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;

    @ApiProperty({ type: () => CategoriaDto, description: 'Categoría del producto' })
    @ValidateNested()
    @IsObject()
    @Type(() => CategoriaDto)
    categoria: CategoriaDto;

    @ApiProperty({ example: 'https://ejemplo.com/imagen.jpg', description: 'URL de la imagen del producto' })
    @IsString()
    @IsNotEmpty({ message: 'La URL de la imagen no puede estar vacía' })
    imagen_url: string;

    @ApiProperty({ example: '2024-05-10', description: 'Fecha de creación del producto' })
    @IsString()
    @IsNotEmpty({ message: 'La fecha de creación no puede estar vacía' })
    fecha_creacion: string;
}