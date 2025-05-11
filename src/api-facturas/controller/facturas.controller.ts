import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, UnauthorizedException } from '@nestjs/common';
import { FacturasService } from '../service/facturas.service';
import { FacturaDto } from '../models/productoFacturaDto';
import { UsuariosService } from '../../api-usuarios/service/usuarios.service';

@Controller('factura')
export class FacturasController {
    constructor(
        private readonly facturasService: FacturasService,
        private readonly usuariosService: UsuariosService,
    ) {}

    private async verificarTokenOrThrow(req: any) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no proporcionado o inválido');
        }
        const token = authHeader.split(' ')[1];
        const result = await this.usuariosService.verificarToken(token);
        if (!result.valid) throw new UnauthorizedException('Token inválido o expirado');
        return result.user_id;
    }

    @Post()
    async crearFactura(@Body() data: FacturaDto, @Req() req) {
        await this.verificarTokenOrThrow(req);
        return this.facturasService.crearFactura(data);
    }

    @Get()
    async listarFacturas(@Query('skip') skip?: number, @Query('limit') limit?: number, @Query('usuario_id') usuario_id?: number, @Req() req?) {
        await this.verificarTokenOrThrow(req);
        return this.facturasService.listarFacturas();
    }

    @Get(':id')
    async obtenerFacturaPorId(@Param('id') id: string, @Req() req) {
        await this.verificarTokenOrThrow(req);
        return this.facturasService.obtenerFacturaPorId(id);
    }

    @Put(':id')
    async modificarFactura(@Param('id') id: string, @Body() data: FacturaDto, @Req() req) {
        await this.verificarTokenOrThrow(req);
        return this.facturasService.modificarFactura(id, data);
    }

    @Delete(':id')
    async borrarFactura(@Param('id') id: string, @Req() req) {
        await this.verificarTokenOrThrow(req);
        return this.facturasService.borrarFactura(id);
    }
}