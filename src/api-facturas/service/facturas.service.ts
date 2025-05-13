import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FacturaDto } from '../models/productoFacturaDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacturasService {

    private readonly facturaUrl: string;

    constructor(private readonly httpService: HttpService, private configService: ConfigService) {
            const API_FACTURAS = this.configService.get('API_FACTURAS');
            this.facturaUrl = `${API_FACTURAS}/factura`;
        }


    // Crear una nueva factura
    async crearFactura(data: FacturaDto): Promise<any> {
        console.log(this.facturaUrl);
        try {
        const response = await lastValueFrom(this.httpService.post(this.facturaUrl, data));
        return response.data;
        } catch (error) {
        throw new Error(`Error al crear factura: ${error.response?.data?.message || error.message}`);
        }
    }

     // Listar todas las facturas
    async listarFacturas(skip?: number, limit?: number, usuario_id?: number): Promise<any> {
        const params: any = {};
        if (typeof skip !== 'undefined') params.skip = skip;
        if (typeof limit !== 'undefined') params.limit = limit;
        if (typeof usuario_id !== 'undefined') params.usuario_id = usuario_id;

        try {
            const response = await lastValueFrom(
                this.httpService.get(this.facturaUrl, { params })
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al listar facturas: ${error.response?.data?.message || error.message}`);
        }
    }
    
    // Obtener una factura por ID
    async obtenerFacturaPorId(facturaId: string): Promise<any> {
        try {
        const response = await lastValueFrom(this.httpService.get(`${this.facturaUrl}/${facturaId}`));
        return response.data;
        } catch (error) {
        throw new Error(`Error al obtener la factura con ID ${facturaId}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Modificar una factura por ID
    async modificarFactura(facturaId: string, data: FacturaDto): Promise<any> {
        try {
        const response = await lastValueFrom(this.httpService.put(`${this.facturaUrl}/${facturaId}`, data));
        return response.data;
        } catch (error) {
        throw new Error(`Error al modificar la factura con ID ${facturaId}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Borrar una factura por ID
    async borrarFactura(facturaId: string): Promise<void> {
        try {
        await lastValueFrom(this.httpService.delete(`${this.facturaUrl}/${facturaId}`));
        } catch (error) {
        throw new Error(`Error al borrar la factura con ID ${facturaId}: ${error.response?.data?.message || error.message}`);
        }
    }
}