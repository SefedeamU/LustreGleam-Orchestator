import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FacturasService } from '../../service/facturas/facturas.service';
import { FacturaDto } from '../../models/productoFacturaDto';

@Controller('facturas')
export class FacturasController {
    constructor(private readonly facturasService: FacturasService) {}

    // Listar todas las facturas
    @Get()
    async listarFacturas() {
        return this.facturasService.listarFacturas();
    }

    // Crear una nueva factura
    @Post()
    async crearFactura(@Body() data: FacturaDto) {
        return this.facturasService.crearFactura(data);
    }

    // Obtener una factura por ID
    @Get(':id')
    async obtenerFacturaPorId(@Param('id') id: string) {
        return this.facturasService.obtenerFacturaPorId(id);
    }

    // Modificar una factura por ID
    @Put(':id')
    async modificarFactura(@Param('id') id: string, @Body() data: FacturaDto) {
        return this.facturasService.modificarFactura(id, data);
    }

    // Borrar una factura por ID
    @Delete(':id')
    async borrarFactura(@Param('id') id: string) {
        return this.facturasService.borrarFactura(id);
    }
}