import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FacturasService } from '../service/facturas.service';
import { FacturaDto } from '../models/productoFacturaDto';
import { AuthGuard } from '../../api-usuarios/service/auth.guard';

@Controller('facturas')
export class FacturasController {
    constructor(private readonly facturasService: FacturasService) {}

//NECESARIO MODIFICAR LA MANERA EN QUE SE VERIFICA LA AUTENTICACIÓN, 
// HAY ENDPOINTS QUE NO DEBERÍAN SER ACCESIBLES SIN AUTENTICACIÓN PERO 
// TAMBIÉN HAY OTROS ADEMÁS DE ESO PODRÍAN SER ACCESIBLES SOLO PARA EL 
// CREADOR DE LA FACTURA, NO SOLO PARA LOS ADMINISTRADORES.


    // Listar todas las facturas
    @UseGuards(AuthGuard)
    @Get()
    async listarFacturas() {
        return this.facturasService.listarFacturas();
    }

    // Crear una nueva factura
    @UseGuards(AuthGuard)
    @Post()
    async crearFactura(@Body() data: FacturaDto) {
        return this.facturasService.crearFactura(data);
    }

    // Obtener una factura por ID
    @UseGuards(AuthGuard)
    @Get(':id')
    async obtenerFacturaPorId(@Param('id') id: string) {
        return this.facturasService.obtenerFacturaPorId(id);
    }

    // Modificar una factura por ID
    @UseGuards(AuthGuard)
    @Put(':id')
    async modificarFactura(@Param('id') id: string, @Body() data: FacturaDto) {
        return this.facturasService.modificarFactura(id, data);
    }

    // Borrar una factura por ID
    @UseGuards(AuthGuard)
    @Delete(':id')
    async borrarFactura(@Param('id') id: string) {
        return this.facturasService.borrarFactura(id);
    }
}