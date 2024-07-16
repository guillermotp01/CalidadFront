import { Component, OnInit, inject } from '@angular/core';
import { CarritoService } from '../../../Services/carrito.service';
import { Carrito } from '../../../Models/Carrito';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito[] = [];
  usuarioIngresa = null;
  mostrarModalPagoFlag = false;
  montoPago: number = 0;
  montoTotal: number = 0;
  
  constructor(private carritoService: CarritoService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.usuarioIngresa = this.loginService.getUser();
    if (this.usuarioIngresa != null) {
      this.listarCarrito();
    }
  }

  listarCarrito() {
    this.carritoService.obtenerProductos().subscribe(
      (data: Carrito[]) => {
        this.carrito = data;
        console.log('Carrito obtenido:', this.carrito);
      },
      error => {
        console.error('Error al obtener el carrito', error);
      }
    );
  }

  actualizarCarrito(): void {
    this.carritoService.obtenerProductos().subscribe((carrito) => {
      this.carrito = carrito;
    });
  }

  eliminarProductoDelCarrito(id: number): void {
    this.carritoService.eliminarDetalleCarrito(id).subscribe({
      next: (response) => {
        console.log('Producto eliminado:', response);
        this.carrito = this.carrito.filter(carro => carro.detallesCarrito.every(detalle => detalle.id !== id));
        this.actualizarCarrito();
        Swal.fire('Eliminado', 'Producto eliminado del carrito', 'success');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al eliminar el producto del carrito', error);
        if (error.status === 200 && !error.ok) {
          console.error('La respuesta tiene estado 200 pero se considera un error');
        }
        Swal.fire('Error', 'No se pudo eliminar el producto del carrito', 'error');
      }
    });
  }

  mostrarModalPago(montoTotal: number): void {
    this.montoTotal = montoTotal;
    this.mostrarModalPagoFlag = true;
  }

  cerrarModalPago(): void {
    this.mostrarModalPagoFlag = false;
    this.montoPago = 0;
  }

  procesarPago(): void {
    if (this.montoPago >= this.montoTotal) {
      this.confirmarCompra();
    } else {
      Swal.fire('Error', 'El monto ingresado es insuficiente para realizar la compra.', 'error');
    }
    this.cerrarModalPago();
  }

  confirmarCompra(): void {
    this.carritoService.confirmarCompra().subscribe({
      next: (response) => {
        console.log('Compra confirmada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Procesando Compra',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['confirmar-compra']);
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al confirmar la compra', error);
        Swal.fire('Error en la compra', 'El monto es menor al precio total', 'error');
      }
    });
  }

  ingresarSesion() {
    this.router.navigate(['ingresa']);
  }

  registroSesion() {
    this.router.navigate(['registro']);
  }

  productos() {
    this.router.navigate(['productos']);
  }
}
