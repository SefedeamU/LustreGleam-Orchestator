import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { ProductoDto } from '../models/product.dto';
import { CategoriaDto } from '../models/categoria.dto';

@Injectable()
export class ProductosService {
    constructor(private readonly httpService: HttpService) {}

    private readonly productoUrl = 'http://CAMBIAR/productos';
    private readonly categoriasUrl = 'http://CAMBIAR/categorias';

//PRODUCTOS

    // Crear un nuevo producto
    async crearProducto(producto: ProductoDto): Promise<ProductoDto> {
        try {
        const response = await lastValueFrom(this.httpService.post(this.productoUrl, producto));
        return response.data;
        } catch (error) {
        throw new Error(`Error al crear producto: ${error.response?.data?.message || error.message}`);
        }
    }

    // Actualizar un producto por ID
    async actualizarProducto(id: number, producto: ProductoDto): Promise<ProductoDto> {
        try {
        const response = await lastValueFrom(this.httpService.put(`${this.productoUrl}/${id}`, producto));
        return response.data;
        } catch (error) {
        throw new Error(`Error al actualizar el producto con ID ${id}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Eliminar un producto por ID
    async eliminarProducto(id: number): Promise<void> {
        try {
        await lastValueFrom(this.httpService.delete(`${this.productoUrl}/${id}`));
        } catch (error) {
        throw new Error(`Error al eliminar el producto con ID ${id}: ${error.response?.data?.message || error.message}`);
        }
    }

//CATEGORIAS
    // Crear una nueva categoría
    async crearCategoria(categoria: CategoriaDto): Promise<CategoriaDto> {
        try {
        const response = await lastValueFrom(this.httpService.post(this.categoriasUrl, categoria));
        return response.data;
        } catch (error) {
        throw new Error(`Error al crear categoría: ${error.response?.data?.message || error.message}`);
        }
    }

    // Actualizar una categoría por ID
    async actualizarCategoria(id: number, categoria: CategoriaDto): Promise<CategoriaDto> {
        try {
        const response = await lastValueFrom(this.httpService.put(`${this.categoriasUrl}/${id}`, categoria));
        return response.data;
        } catch (error) {
        throw new Error(`Error al actualizar la categoría con ID ${id}: ${error.response?.data?.message || error.message}`);
        }
    }

    // Eliminar una categoría por ID
    async eliminarCategoria(id: number): Promise<void> {
        try {
        await lastValueFrom(this.httpService.delete(`${this.categoriasUrl}/${id}`));
        } catch (error) {
        throw new Error(`Error al eliminar la categoría con ID ${id}: ${error.response?.data?.message || error.message}`);
        }
    }
}