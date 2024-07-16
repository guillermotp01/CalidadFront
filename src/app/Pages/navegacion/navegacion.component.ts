import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { ProductoService } from '../../Services/producto.service';
import { Producto } from '../../Models/Productos';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  nombreUsuario: string | null = null;
  RolUsuario: string | null = null;
  busqueda: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    const user = this.loginService.getUser();
    if (user) {
      this.nombreUsuario = user.nombre; 
      this.RolUsuario = this.loginService.getUserRole();
    }
  }

  formIngresar(): void {
    this.router.navigate(['ingresa']);
  }

  formRegistro(): void {
    this.router.navigate(['registro']);
  }

  nosotros(): void {
    this.router.navigate(['nosotros']);
  }

  productos(): void {
    this.router.navigate(['productos']);
  }

  inicio(): void {
    this.router.navigate(['/']);
  }

  carrito(): void {
    this.router.navigate(['carrito']);
  }

  cerrarSesion(): void {
    this.loginService.logout();
    this.router.navigate(['/ingresa']);
  }

  misCompras(): void {
    this.router.navigate(['misCompras']);
  }

  administrarProductos(): void {
    this.router.navigate(['productosAdmin']);
  }

  administrarUsuarios(): void {
    this.router.navigate(['usuariosAdmin']);
  }

  administrarCompras(): void {
    this.router.navigate(['comprasAdmin']);
  }

  buscarProductos(): void {
    this.router.navigate(['productos'], { queryParams: { search: this.busqueda } });
  }
}
