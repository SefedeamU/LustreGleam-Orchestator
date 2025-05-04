import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductosService } from '../../service/productos/productos.service';
import { CategoriaDto } from 'src/api-productos/models/categoria.dto';

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

// PRODUCTOS
    // Obtener todos los productos
    @Get()
    async obtenerProductos() {
        return this.productosService.obtenerProductos();
    }

    // Obtener un producto por ID
    @Get(':id')
    async obtenerProductoPorId(@Param('id') id: number) {
        return this.productosService.obtenerProductoPorId(id);
    }

    // Crear un nuevo producto
    @Post()
    async crearProducto(@Body() producto: any) {
        return this.productosService.crearProducto(producto);
    }

    // Actualizar un producto por ID
    @Put(':id')
    async actualizarProducto(@Param('id') id: number, @Body() producto: any) {
        return this.productosService.actualizarProducto(id, producto);
    }

    // Eliminar un producto por ID
    @Delete(':id')
    async eliminarProducto(@Param('id') id: number) {
        return this.productosService.eliminarProducto(id);
    }

    // Obtener productos por categoría
    @Get('categoria')
    async obtenerProductosPorCategoria(@Query('categoriaId') categoriaId: number) {
        return this.productosService.obtenerProductosPorCategoria(categoriaId);
    }

// CATEGORÍAS
    // Obtener todas las categorías
    @Get('categorias')
    async obtenerCategorias() {
        return this.productosService.obtenerCategorias();
    }

    // Crear una nueva categoría
    @Post('categorias')
    async crearCategoria(@Body() categoria: CategoriaDto) {
        return this.productosService.crearCategoria(categoria);
    }

    // Actualizar una categoría por ID
    @Put('categorias/:id')
    async actualizarCategoria(@Param('id') id: number, @Body() categoria: CategoriaDto) {
        return this.productosService.actualizarCategoria(id, categoria);
    }

    // Eliminar una categoría por ID
    @Delete('categorias/:id')
    async eliminarCategoria(@Param('id') id: number) {
        return this.productosService.eliminarCategoria(id);
    }
}