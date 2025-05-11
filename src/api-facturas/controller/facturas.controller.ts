import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { FacturasService } from '../service/facturas.service';
import { FacturaDto } from '../models/productoFacturaDto';
import { UsuariosService } from '../../api-usuarios/service/usuarios.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('factura')
@UseGuards(AuthGuard)
export class FacturasController {
    constructor(
        private readonly facturasService: FacturasService,
        private readonly usuariosService: UsuariosService,
    ) {}

    @Post()
    async crearFactura(@Body() data: FacturaDto, @Req() req) {
        return this.facturasService.crearFactura(data);
    }

    @Get()
    async listarFacturas(@Query('skip') skip?: number, @Query('limit') limit?: number, @Query('usuario_id') usuario_id?: number, @Req() req?) {
        return this.facturasService.listarFacturas();
    }

    @Get(':id')
    async obtenerFacturaPorId(@Param('id') id: string, @Req() req) {
        return this.facturasService.obtenerFacturaPorId(id);
    }

    @Put(':id')
    async modificarFactura(@Param('id') id: string, @Body() data: FacturaDto, @Req() req) {
        return this.facturasService.modificarFactura(id, data);
    }

    
    @Delete(':id')
    async borrarFactura(@Param('id') id: string, @Req() req) {
        return this.facturasService.borrarFactura(id);
    }
}