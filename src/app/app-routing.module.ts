import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { ProductoListaComponent } from './Pages/Clientes/producto-lista/producto-lista.component';
import { ProductosComponent } from './Pages/Empleados/productos/productos.component';
import { ProductoDetalleComponent } from './Pages/Clientes/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './Pages/Clientes/carrito/carrito.component';
import { ConfirmarCompraComponent } from './Pages/Clientes/confirmar-compra/confirmar-compra.component'; // Importa el componente
import { MisComprasComponent } from './Pages/Clientes/mis-compras/mis-compras.component';
import { DetalleComprasComponent } from './Pages/Clientes/detalle-compras/detalle-compras.component';
import { UsuariosComponent } from './Pages/Empleados/usuarios/usuarios.component';
import { ComprasComponent } from './Pages/Empleados/compras/compras.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    pathMatch: 'full'
  },
  {
    path: 'productosAdmin',
    component: ProductosComponent,
    pathMatch: 'full'
  },
  {
    path: 'usuariosAdmin',
    component: UsuariosComponent,
    pathMatch: 'full'
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
    pathMatch: 'full'
  },
  {
    path: 'ingresa',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'registro',
    component: RegistroComponent,
    pathMatch: 'full'
  },
  {
    path: 'productos',
    component: ProductoListaComponent,
    pathMatch: 'full'
  },
  {
    path: 'productos/:id',
    component: ProductoDetalleComponent,
    pathMatch: 'full'
  },
  {
    path: 'carrito',
    component: CarritoComponent,
    pathMatch: 'full'
  },
  {
    path: 'confirmar-compra',
    component: ConfirmarCompraComponent,
    pathMatch: 'full'
  },
  {
    path: 'misCompras',
    component: MisComprasComponent,
    pathMatch: 'full'
  },
  {
    path: 'misCompras/success', 
    component: MisComprasComponent
  },
  {
    path: 'detallesCompra/:id',
    component: DetalleComprasComponent,
    pathMatch: 'full'
  },
  {
    path: 'comprasAdmin',
    component: ComprasComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
