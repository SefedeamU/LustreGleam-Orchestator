import { IsString, IsArray, IsNotEmpty, IsISO8601 } from 'class-validator';

export class ProductoFacturaDto {
    @IsString()
    @IsNotEmpty({ message: 'El identificador del producto no puede estar vacío' })
    additionalProp1: string;

    @IsString()
    @IsNotEmpty({ message: 'El valor adicional no puede estar vacío' })
    additionalProp2: string;

    @IsString()
    @IsNotEmpty({ message: 'El valor adicional no puede estar vacío' })
    additionalProp3: string;
    }

    export class FacturaDto {
    @IsString()
    @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío' })
    usuario_id: string;

    @IsArray()
    @IsNotEmpty({ message: 'La lista de productos no puede estar vacía' })
    productos: ProductoFacturaDto[];

    @IsISO8601({}, { message: 'La fecha debe estar en formato ISO 8601' })
    fecha: string;
}