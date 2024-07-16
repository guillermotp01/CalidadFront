import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../../Services/producto.service';
import { Producto } from '../../../Models/Productos';
import { CategoriaService } from '../../../Services/categoria.service';
import { Categoria } from '../../../Models/Categoria';
import { Proveedor } from '../../../Models/Proveedor';
import { ProveedorService } from '../../../Services/proveedor.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  listaProductos: Producto[] = [];
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  private proveedorService = inject(ProveedorService);

  producto: Producto = new Producto();
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];
  actualizarModal: boolean = false;
  idProductoEliminar: number = 0;
  MostrarModalActualizarProducto: boolean = false;
  MostrarModalEliminarProducto: boolean = false;
  categoriaSeleccionada: number | null = null;
  busqueda: string = '';
  actualPagina = 0; // Página actual, inicialmente la primera
  cantidadProductos = 6; // Tamaño de la página, cantidad de productos por página
  totalProductos = 0; // Total de productos en la lista

  constructor() { }

  ngOnInit(): void {
    this.listarProductosPaginado();
    this.cargarCategorias();
    this.cargarProveedores();
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

  cargarCategorias() {
    this.categoriaService.listar().subscribe(data => {
      this.categorias = data;
    });
  }

  cargarProveedores() {
    this.proveedorService.listar().subscribe(data => {
      this.proveedores = data;
    });
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

  crearProducto() {
    this.actualizarModal = false;
    this.MostrarModalActualizarProducto = true;
    this.producto = {
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagen: '',
        categoria: {
            id: 0,
            nombre: ''
        },
        proveedor: {
            id: 0,
            nombre: '',
            celular: ''
        }
    };  
  }


  modalActualizar(item: any): void {
    this.actualizarModal = true;
    this.MostrarModalActualizarProducto = true;
    this.MostrarModalEliminarProducto = false;

    this.producto = {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: item.precio,
        stock: item.stock,
        imagen: item.imagen,
        categoria: {
            id: item.categoria.id,
            nombre: item.categoria.nombre
        },
        proveedor: {
            id: item.proveedor.id,
            nombre: item.proveedor.nombre,
            celular: item.proveedor.celular
        }
    };
  }

  modalEliminar(id: number) {
    this.idProductoEliminar = id;
    this.MostrarModalEliminarProducto = true;
    this.MostrarModalActualizarProducto = false;
  }

  eliminar(){
    this.productoService.eliminar(this.idProductoEliminar).subscribe(resp => {
      if(resp){
        this.listarProductos();
      }
    });
    this.MostrarModalEliminarProducto = false;
  }

  cancelar() {
    this.MostrarModalActualizarProducto = false;
    this.MostrarModalEliminarProducto = false;
  }

  guardar() {
    this.productoService.crear(this.producto).subscribe(resp => {
      if (resp) {
        this.listarProductos();  
      }
    });
    this.MostrarModalActualizarProducto = false;
  }

  actualizar() {
    const productoId = this.producto.id;
    this.productoService.actualizar(productoId, this.producto).subscribe(resp => {
        if (resp) {
          this.listarProductos();
        }
      });
    this.MostrarModalActualizarProducto = false;
  }

  CambiarPagina(pagina: number): void {
    this.actualPagina = pagina;
    this.listarProductosPaginado();
  }
}
