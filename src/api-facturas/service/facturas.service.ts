import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FacturaDto } from '../models/productoFacturaDto';

@Injectable()
export class FacturasService {
    constructor(private readonly httpService: HttpService) {}

    private readonly facturaUrl = 'http://api.facturas.com/factura';

    // Listar todas las facturas
    async listarFacturas(): Promise<any> {
        try {
        const response = await lastValueFrom(this.httpService.get(this.facturaUrl));
        return response.data;
        } catch (error) {
        throw new Error(`Error al listar facturas: ${error.response?.data?.message || error.message}`);
        }
    }

    // Crear una nueva factura
    async crearFactura(data: FacturaDto): Promise<any> {
        try {
        const response = await lastValueFrom(this.httpService.post(this.facturaUrl, data));
        return response.data;
        } catch (error) {
        throw new Error(`Error al crear factura: ${error.response?.data?.message || error.message}`);
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