import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, UseGuards } from '@nestjs/common';
import { FacturasService } from '../service/facturas.service';
import { FacturaDto } from '../models/productoFacturaDto';
import { UsuariosService } from '../../api-usuarios/service/usuarios.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('facturas')
@ApiBearerAuth()
@Controller('factura')
@UseGuards(AuthGuard)
export class FacturasController {
    constructor(
        private readonly facturasService: FacturasService,
        private readonly usuariosService: UsuariosService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear una nueva factura' })
    @ApiBody({ type: FacturaDto })
    @ApiResponse({ status: 201, description: 'Factura creada correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async crearFactura(@Body() data: FacturaDto, @Req() req) {
        return this.facturasService.crearFactura(data);
    }

    @ApiOperation({ summary: 'Listar todas las facturas' })
    @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Cantidad de facturas a omitir' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad máxima de facturas a retornar' })
    @ApiQuery({ name: 'usuario_id', required: false, type: Number, description: 'Filtrar por ID de usuario' })
    @ApiResponse({ status: 200, description: 'Lista de facturas.' })
    @Get()
    async listarFacturas(
        @Query('skip') skip?: number,
        @Query('limit') limit?: number,
        @Query('usuario_id') usuario_id?: number,
        @Req() req?
    ) {
    return this.facturasService.listarFacturas(skip, limit, usuario_id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener factura por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la factura' })
    @ApiResponse({ status: 200, description: 'Factura encontrada.' })
    @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
    async obtenerFacturaPorId(@Param('id') id: string, @Req() req) {
        return this.facturasService.obtenerFacturaPorId(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Modificar factura por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la factura' })
    @ApiBody({ type: FacturaDto })
    @ApiResponse({ status: 200, description: 'Factura modificada correctamente.' })
    @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
    async modificarFactura(@Param('id') id: string, @Body() data: FacturaDto, @Req() req) {
        return this.facturasService.modificarFactura(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar factura por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la factura' })
    @ApiResponse({ status: 200, description: 'Factura eliminada correctamente.' })
    @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
    async borrarFactura(@Param('id') id: string, @Req() req) {
        return this.facturasService.borrarFactura(id);
    }
}