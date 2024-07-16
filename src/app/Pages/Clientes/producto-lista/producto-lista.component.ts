import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../../../Models/Productos';
import { ProductoService } from '../../../Services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../../Models/Categoria';
import { CategoriaService } from '../../../Services/categoria.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent implements OnInit{
  listaProductos: Producto[] = [];
  categorias: Categoria[] = [];
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  categoriaSeleccionada: number | null = null;
  busqueda: string = '';
  actualPagina = 0; // Página actual, inicialmente la primera
  cantidadProductos = 6; // Tamaño de la página, cantidad de productos por página
  totalProductos = 0; // Total de productos en la lista


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.busqueda = params['search'] || '';
      if (this.busqueda) {
        this.buscarProductos();
      } else {
        this.listarProductosPaginado();
      }
    });
    this.listarCategorias();
  }

  listarProductosPaginado(): void {
    this.productoService.listarProductosPaginado(this.actualPagina, this.cantidadProductos)
      .subscribe(
        response => {
          this.listaProductos = response.content; 
          this.totalProductos = response.totalProductos; 
        },
        error => {
          console.log('Error al obtener productos paginados:', error);
        }
      );
  }

  listarProductos() {
    this.productoService.listar().subscribe(resp => {
      if (resp) {
        this.listaProductos = resp;
      }
    });
  }

  listarCategorias() {
    this.categoriaService.listar().subscribe(resp => {
      if (resp) {
        this.categorias = resp;
      }
    });
  }

  listarProductosPorCategoria() {
    if (this.categoriaSeleccionada === null) {
      this.listarProductos();
    } else {
      this.productoService.listarPorCategoria(this.categoriaSeleccionada).subscribe(resp => {
        if (resp) {
          this.listaProductos = resp;
        }
      });
    }
  }

  buscarProductos() {
    if (this.busqueda.trim() !== '') {
      this.productoService.buscar(this.busqueda).subscribe(resp => {
        if (resp) {
          this.listaProductos = resp;
        }
      });
    } else {
      this.listarProductos();
    }
  }

  mostrarDetalles(id: number) {
    this.router.navigate(['productos/' + id])
  }

  CambiarPagina(pagina: number): void {
    this.actualPagina = pagina;
    this.listarProductosPaginado();
  }
}
