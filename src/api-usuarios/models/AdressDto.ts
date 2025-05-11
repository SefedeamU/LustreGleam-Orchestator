import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
    @ApiProperty({ example: 'México', description: 'País' })
    @IsString()
    @IsNotEmpty({ message: 'El país no puede estar vacío' })
    country: string;

    @ApiProperty({ example: 'Ciudad de México', description: 'Ciudad' })
    @IsString()
    @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
    city: string;

    @ApiProperty({ example: 'Calle 123', description: 'Calle' })
    @IsString()
    @IsNotEmpty({ message: 'La calle no puede estar vacía' })
    street: string;

    @ApiProperty({ example: '12345', description: 'Código postal' })
    @IsString()
    @IsNotEmpty({ message: 'El código postal no puede estar vacío' })
    postal_code: string;
}