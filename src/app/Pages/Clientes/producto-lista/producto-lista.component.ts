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
        // Verifica si response y response.content existen antes de asignar
        if (response && response.content) {
          this.listaProductos = response.content;
          this.totalProductos = response.totalProductos ?? 0;
        } else {
          this.listaProductos = [];
          this.totalProductos = 0;
        }
      },
      error => {
        console.error('Error al obtener productos paginados:', error);
        this.listaProductos = [];
        this.totalProductos = 0;
      }
    );
}


listarProductos() {
  this.productoService.listar().subscribe(
    resp => {
      this.listaProductos = resp || []; // ✅ Manejo seguro
    },
    error => {
      console.error('Error al listar productos:', error);
      this.listaProductos = [];
    }
  );
}

listarCategorias() {
  this.categoriaService.listar().subscribe(
    resp => {
      this.categorias = resp || [];
    },
    error => {
      console.error('Error al listar categorías:', error);
      this.categorias = [];
    }
  );
}

listarProductosPorCategoria() {
  if (this.categoriaSeleccionada === null) {
    this.listarProductos();
  } else {
    this.productoService.listarPorCategoria(this.categoriaSeleccionada).subscribe(
      resp => {
        this.listaProductos = resp || [];
      },
      error => {
        console.error('Error al listar por categoría:', error);
        this.listaProductos = [];
      }
    );
  }
}

buscarProductos() {
  if (this.busqueda.trim() !== '') {
    this.productoService.buscar(this.busqueda).subscribe(
      resp => {
        this.listaProductos = resp || [];
      },
      error => {
        console.error('Error en búsqueda de productos:', error);
        this.listaProductos = [];
      }
    );
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
