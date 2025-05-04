import { IsString, IsNotEmpty } from 'class-validator';

export class AddressDto {
    @IsString()
    @IsNotEmpty({ message: 'El país no puede estar vacío' })
    country: string;

    @IsString()
    @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
    city: string;

    @IsString()
    @IsNotEmpty({ message: 'La calle no puede estar vacía' })
    street: string;

    @IsString()
    @IsNotEmpty({ message: 'El código postal no puede estar vacío' })
    postal_code: string;
}