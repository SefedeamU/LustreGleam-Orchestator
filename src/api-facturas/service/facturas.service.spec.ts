import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FacturaDto } from '../models/productoFacturaDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacturasService {
    private readonly facturaUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        const API_FACTURAS = this.configService.get('API_FACTURAS');
        this.facturaUrl = `${API_FACTURAS}/factura`;
    }

    async listarFacturas(params?: { skip?: number; limit?: number; usuario_id?: number }): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(this.facturaUrl, { params })
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al listar facturas: ${error.response?.data?.message || error.message}`);
        }
    }

    async crearFactura(data: FacturaDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(this.facturaUrl, data)
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al crear factura: ${error.response?.data?.message || error.message}`);
        }
    }

    async obtenerFacturaPorId(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.facturaUrl}/${id}`)
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener la factura: ${error.response?.data?.message || error.message}`);
        }
    }

    async modificarFactura(id: string, data: FacturaDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.put(`${this.facturaUrl}/${id}`, data)
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al modificar la factura: ${error.response?.data?.message || error.message}`);
        }
    }

    async borrarFactura(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.delete(`${this.facturaUrl}/${id}`)
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al borrar la factura: ${error.response?.data?.message || error.message}`);
        }
    }
}