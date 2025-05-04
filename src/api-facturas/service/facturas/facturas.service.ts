import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FacturasService {
    
    constructor(private readonly httpService: HttpService) {}

    async obtenerFacturas(): Promise<any> {
        try {
            const response = await this.httpService.axiosRef.get('http://api.facturas.com/facturas');
            return response.data;
            } catch (error) {
            throw new Error(`Error al obtener facturas: ${error.response?.data?.message || error.message}`);
            }
        }
}