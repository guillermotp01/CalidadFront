import { Component, OnInit, inject } from '@angular/core';
import { CarritoService } from '../../../Services/carrito.service';
import { Carrito } from '../../../Models/Carrito';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MetodoPagoService } from '../../../Services/metodo-pago.service';
declare var MercadoPago: any;

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
    // Nuevo: guardamos el preferenceId y el estado de bricks listo
  preferenceId: string | null = null;
  bricksInitialized = false;

  constructor(private carritoService: CarritoService, private router: Router, private loginService: LoginService, private metodoPagoService: MetodoPagoService) { }

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
    this.generarPreferencia();
    this.confirmarCompra();
  }

  cerrarModalPago(): void {
    this.mostrarModalPagoFlag = false;
    this.montoPago = 0;
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

  
generarPreferencia() {
  const userData = localStorage.getItem('user');

  if (!userData) {
    console.error('No hay usuario en localStorage');
    return;
  }

  const user = JSON.parse(userData);
  const compra = {
    nombre: 'Compra de boletos',
    descripcion: 'Boletos de viaje',
    cantidadBoletos: 2,
    precioTotal: this.montoTotal,
    email: user.correo
  };

  this.metodoPagoService.crearPreferencia(compra).subscribe(response => {
    console.log('Respuesta preferencia:', response);
    
    const initPoint = response.initPoint || response.init_point;

    if (initPoint) {
      // ✅ Redirigir en nueva pestaña
      window.open(initPoint, '_blank');
      
      // O en la misma pestaña (descomenta si prefieres)
      // window.location.href = initPoint;
    } else {
      console.error('Error: No se pudo obtener el init_point de la respuesta');
    }
  }, error => {
    console.error('Error al crear la preferencia:', error);
  });
}


  inicializarMercadoPago(preferenceId: string) {
    // Verificar si el contenedor ya existe para evitar crear varios botones
    const container = document.getElementById('wallet_container');
    if (container) {
      // Si ya existe el contenedor, no hacer nada
      console.log('El botón de pago ya está inicializado.');
      return;
    }
  
    // Si el contenedor no existe, entonces crear el botón de pago
    const mp = new MercadoPago('APP_USR-fe75f47f-84a5-4ed2-a0dd-64ba5604f8c5');
    const bricksBuilder = mp.bricks();
  
    bricksBuilder.create('wallet', 'wallet_container', {
      initialization: { preferenceId: preferenceId },
      customization: { texts: { valueProp: 'Continuar con el Pago' } },
    }).catch((error: any) => {
      console.error('Error al inicializar Mercado Pago:', error);
    });
  }

  /*private verificarEstadoPago() {
    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      if (status) {
        Swal.fire(
          status === 'approved' ? '¡Pago aprobado!' :
          status === 'pending'  ? 'Pago pendiente'  : 'Pago fallido',
          '',
          status === 'approved' ? 'success' : 'error'
        );
      }
    });
  }*/
}
