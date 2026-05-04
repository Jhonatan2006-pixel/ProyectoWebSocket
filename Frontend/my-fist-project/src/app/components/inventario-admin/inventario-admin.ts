import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductoDto } from '../../interfaces/productoDto';

@Component({
  selector: 'app-inventario-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-admin.html',
  styleUrl: './inventario-admin.css'
})
export class InventarioAdminComponent implements OnInit {
  productos: ProductoDto[] = [];
  cargando = false;
  error = '';
  editando = false;
  productoEditandoId: number | null = null;

  formulario: ProductoDto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: '',
    categoria_id: 1
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';

    this.productService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  guardarProducto(): void {
    if (!this.formulario.nombre || this.formulario.precio < 0 || this.formulario.stock < 0) {
      alert('Completa correctamente los campos obligatorios');
      return;
    }

    if (this.editando && this.productoEditandoId) {
      this.productService.updateProducto(this.productoEditandoId, this.formulario).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.resetFormulario();
          this.cargarProductos();
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar producto');
        }
      });
    } else {
      this.productService.createProducto(this.formulario).subscribe({
        next: () => {
          alert('Producto agregado correctamente');
          this.resetFormulario();
          this.cargarProductos();
        },
        error: (err) => {
          console.error(err);
          alert('Error al agregar producto');
        }
      });
    }
  }

  editarProducto(producto: ProductoDto): void {
    this.editando = true;
    this.productoEditandoId = producto.id || null;
    this.formulario = {
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen || '',
      categoria_id: producto.categoria_id
    };
  }

  eliminarProducto(id?: number): void {
    if (!id) return;

    const confirmar = confirm('¿Seguro que deseas eliminar este producto?');
    if (!confirmar) return;

    this.productService.deleteProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
        this.cargarProductos();
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar producto');
      }
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.editando = false;
    this.productoEditandoId = null;
    this.formulario = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
      categoria_id: 1
    };
  }

  obtenerNombreCategoria(id: number): string {
    const categorias: { [key: number]: string } = {
      1: 'Abarrotes',
      2: 'Lácteos',
      3: 'Aceites',
      4: 'Bebidas',
      5: 'Limpieza'
    };

    return categorias[id] || `Categoría ${id}`;
  }
}