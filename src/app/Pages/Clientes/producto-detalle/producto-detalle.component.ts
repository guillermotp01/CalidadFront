import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../Models/Productos';
import { ProductoService } from '../../../Services/producto.service';
import { CarritoService } from '../../../Services/carrito.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | undefined;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    if (id) {
      this.productoService.obtener(id).subscribe(producto => {
        this.producto = producto;
      });
    }
  }

  agregarProductoAlCarrito(productoId: number, cantidad: string) {
    if (!this.loginService.isLoggedIn()) {
      Swal.fire('Usuario no autenticado', 'Por favor, inicie sesión para agregar productos al carrito', 'error');
      return;
    }

    if (this.producto && this.producto.stock <= 0) {
      Swal.fire('Producto no Disponible', 'El producto no cuenta con stock', 'error');
      return;
    }

    const cantidadNumerica = parseInt(cantidad, 10);
    if (isNaN(cantidadNumerica) || cantidadNumerica < 1) {
      console.error("Cantidad inválida");
      Swal.fire('Cantidad inválida', 'Por favor ingrese una cantidad válida', 'error');
      return;
    }

    if (this.producto && cantidadNumerica > this.producto.stock) {
      Swal.fire('Stock insuficiente', 'La cantidad seleccionada excede el stock disponible', 'error');
      return;
    }

    this.carritoService.agregarProducto(productoId, cantidadNumerica).subscribe(
      response => {
        console.log("Producto agregado al carrito", response);
        Swal.fire('Producto Agregado', 'Producto agregado al carrito', 'success');
      },
      error => {
        console.error("Error al agregar el producto al carrito", error);
        Swal.fire('Error', 'Hubo un problema al agregar el producto al carrito', 'error');
      }
    );
  }
}
