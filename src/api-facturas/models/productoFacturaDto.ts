import { IsString, IsArray, IsNotEmpty, IsISO8601, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductoFacturaDto {
    @ApiProperty({ example: 123, description: 'Identificador del producto' })
    @IsInt()
    id: number;

    @ApiProperty({ example: 2, description: 'Cantidad de este producto' })
    @IsInt()
    @Min(1, { message: 'La cantidad debe ser al menos 1' })
    cantidad: number;
}

export class FacturaDto {
    @ApiProperty({ example: 1, description: 'ID del usuario' })
    @IsInt()
    @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío' })
    user_id: string;

    @ApiProperty({ type: [ProductoFacturaDto], description: 'Lista de productos' })
    @IsArray()
    @IsNotEmpty({ message: 'La lista de productos no puede estar vacía' })
    productos: ProductoFacturaDto[];

    @ApiProperty({ example: '2024-05-10T12:00:00Z', description: 'Fecha de la factura (ISO 8601)' })
    @IsISO8601({}, { message: 'La fecha debe estar en formato ISO 8601' })
    fecha: string;
}