import { Controller, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductosService } from '../service/productos.service';
import { CategoriaDto } from 'src/api-productos/models/categoria.dto';
import { ProductoDto } from 'src/api-productos/models/product.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('productos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

    // PRODUCTOS

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiBody({ type: ProductoDto })
    @ApiResponse({ status: 201, description: 'Producto creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async crearProducto(@Body() producto: ProductoDto) {
        return this.productosService.crearProducto(producto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un producto por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
    @ApiBody({ type: ProductoDto })
    @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
    async actualizarProducto(@Param('id') id: number, @Body() producto: ProductoDto) {
        return this.productosService.actualizarProducto(id, producto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
    @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
    async eliminarProducto(@Param('id') id: number) {
        return this.productosService.eliminarProducto(id);
    }

    // CATEGORÍAS

    @Post('categorias')
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiBody({ type: CategoriaDto })
    @ApiResponse({ status: 201, description: 'Categoría creada correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async crearCategoria(@Body() categoria: CategoriaDto) {
        return this.productosService.crearCategoria(categoria);
    }

    @Put('categorias/:id')
    @ApiOperation({ summary: 'Actualizar una categoría por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' })
    @ApiBody({ type: CategoriaDto })
    @ApiResponse({ status: 200, description: 'Categoría actualizada correctamente.' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
    async actualizarCategoria(@Param('id') id: number, @Body() categoria: CategoriaDto) {
        return this.productosService.actualizarCategoria(id, categoria);
    }

    @Delete('categorias/:id')
    @ApiOperation({ summary: 'Eliminar una categoría por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente.' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
    async eliminarCategoria(@Param('id') id: number) {
        return this.productosService.eliminarCategoria(id);
    }
}