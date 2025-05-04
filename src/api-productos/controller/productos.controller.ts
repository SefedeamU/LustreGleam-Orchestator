import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ProductosService } from '../service/productos.service';
import { CategoriaDto } from 'src/api-productos/models/categoria.dto';
import { AuthGuard } from '../../api-usuarios/service/auth.guard';

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

    // PRODUCTOS
    @Get()
    async obtenerProductos() {
        return this.productosService.obtenerProductos();
    }

    @Get(':id')
    async obtenerProductoPorId(@Param('id') id: number) {
        return this.productosService.obtenerProductoPorId(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async crearProducto(@Body() producto: any) {
        return this.productosService.crearProducto(producto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async actualizarProducto(@Param('id') id: number, @Body() producto: any) {
        return this.productosService.actualizarProducto(id, producto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async eliminarProducto(@Param('id') id: number) {
        return this.productosService.eliminarProducto(id);
    }

    @Get('categoria')
    async obtenerProductosPorCategoria(@Query('categoriaId') categoriaId: number) {
        return this.productosService.obtenerProductosPorCategoria(categoriaId);
    }

    // CATEGORÍAS
    @Get('categorias')
    async obtenerCategorias() {
        return this.productosService.obtenerCategorias();
    }

    @UseGuards(AuthGuard)
    @Post('categorias')
    async crearCategoria(@Body() categoria: CategoriaDto) {
        return this.productosService.crearCategoria(categoria);
    }

    @UseGuards(AuthGuard)
    @Put('categorias/:id')
    async actualizarCategoria(@Param('id') id: number, @Body() categoria: CategoriaDto) {
        return this.productosService.actualizarCategoria(id, categoria);
    }

    @UseGuards(AuthGuard)
    @Delete('categorias/:id')
    async eliminarCategoria(@Param('id') id: number) {
        return this.productosService.eliminarCategoria(id);
    }
}