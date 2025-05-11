import { IsString, IsArray, IsNotEmpty, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductoFacturaDto {
    @ApiProperty({ example: '123', description: 'Identificador del producto' })
    @IsString()
    @IsNotEmpty({ message: 'El identificador del producto no puede estar vacío' })
    additionalProp1: string;

    @ApiProperty({ example: 'valor1', description: 'Valor adicional 1' })
    @IsString()
    @IsNotEmpty({ message: 'El valor adicional no puede estar vacío' })
    additionalProp2: string;

    @ApiProperty({ example: 'valor2', description: 'Valor adicional 2' })
    @IsString()
    @IsNotEmpty({ message: 'El valor adicional no puede estar vacío' })
    additionalProp3: string;
}

export class FacturaDto {
    @ApiProperty({ example: '1', description: 'ID del usuario' })
    @IsString()
    @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío' })
    usuario_id: string;

    @ApiProperty({ type: [ProductoFacturaDto], description: 'Lista de productos' })
    @IsArray()
    @IsNotEmpty({ message: 'La lista de productos no puede estar vacía' })
    productos: ProductoFacturaDto[];

    @ApiProperty({ example: '2024-05-10T12:00:00Z', description: 'Fecha de la factura (ISO 8601)' })
    @IsISO8601({}, { message: 'La fecha debe estar en formato ISO 8601' })
    fecha: string;
}