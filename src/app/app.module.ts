import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { LoginComponent } from './Pages/login/login.component';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { NavegacionComponent } from './Pages/navegacion/navegacion.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './Services/auth.interceptor';
import { ProductosComponent } from './Pages/Empleados/productos/productos.component';
import { ProductoListaComponent } from './Pages/Clientes/producto-lista/producto-lista.component';
import { ProductoDetalleComponent } from './Pages/Clientes/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './Pages/Clientes/carrito/carrito.component';
import { ConfirmarCompraComponent } from './Pages/Clientes/confirmar-compra/confirmar-compra.component';
import { MisComprasComponent } from './Pages/Clientes/mis-compras/mis-compras.component';
import { DetalleComprasComponent } from './Pages/Clientes/detalle-compras/detalle-compras.component';
import { UsuariosComponent } from './Pages/Empleados/usuarios/usuarios.component';
import { ComprasComponent } from './Pages/Empleados/compras/compras.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    PrincipalComponent,
    NavegacionComponent,
    FooterComponent,
    NosotrosComponent,
    ProductosComponent,
    ProductoListaComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    ConfirmarCompraComponent,
    MisComprasComponent,
    DetalleComprasComponent,
    UsuariosComponent,
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
