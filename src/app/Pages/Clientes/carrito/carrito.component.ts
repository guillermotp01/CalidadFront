import { Component, OnInit, inject } from '@angular/core';
import { CarritoService } from '../../../Services/carrito.service';
import { Carrito } from '../../../Models/Carrito';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MetodoPagoService } from '../../../Services/metodo-pago.service';
import { Compra } from '../../../Models/Compra';
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

  constructor(private route: ActivatedRoute, private carritoService: CarritoService, private router: Router, private loginService: LoginService, private metodoPagoService: MetodoPagoService) {
  }

  ngOnInit(): void {
    this.usuarioIngresa = this.loginService.getUser();
    if (this.usuarioIngresa != null) {
      this.listarCarrito();
    }

    this.verificarEstadoPago();
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
    //this.confirmarCompra();
  }

  cerrarModalPago(): void {
    this.mostrarModalPagoFlag = false;
    this.montoPago = 0;
  }


  confirmarCompra(): void {
    this.carritoService.confirmarCompra().subscribe({
      next: (response) => {
        console.log('✅ Compra confirmada en backend:', response);
        // Opcional: redirigir a otra página después de confirmar
        this.router.navigate(['confirmar-compra']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error al confirmar la compra:', error);
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
  const compra = JSON.parse(JSON.stringify({
    nombre: "Compra Exitosa",
    descripcion: 'Productos de Ecodar',
    cantidadBoletos: 2,
    precioTotal: this.montoTotal,
    email: user.correo,
    back_urls: {
      success: 'https://ecommerce-pi-five.vercel.app/carrito/success',
      pending: 'https://ecommerce-pi-five.vercel.app/carrito/pending',
      failure: 'https://ecommerce-pi-five.vercel.app/carrito/failure'
    },
    auto_return: 'approved'
  }));


  this.metodoPagoService.crearPreferencia(compra).subscribe(response => {
    console.log('Respuesta preferencia:', response);
    
    const initPoint = response.initPoint || response.init_point;

    if (initPoint) {
      // ✅ Redirigir en nueva pestaña
      window.location.href = initPoint;
      
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

  verificarEstadoPago() {
    const currentPath = this.router.url;

    if (currentPath.includes('/carrito/success')) {
      this.carritoService.confirmarCompra().subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Compra Exitosa!',
            text: 'Tu compra fue confirmada con éxito.',
            confirmButtonText: 'Ir a Mis Compras'
          }).then(() => {
            this.router.navigate(['/misCompras']);
          });
        },
        error: () => {
          Swal.fire('Error', 'No se pudo confirmar la compra', 'error');
        }
      });
    }

    if (currentPath.includes('/carrito/pending')) {
      Swal.fire('Pago pendiente', 'Tu pago está en revisión', 'info');
    }

    if (currentPath.includes('/carrito/failure')) {
      Swal.fire('Pago fallido', 'No se pudo completar el pago', 'error');
    }
  }

}
