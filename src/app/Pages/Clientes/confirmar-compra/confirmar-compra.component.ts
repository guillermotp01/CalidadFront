import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrl: './confirmar-compra.component.css'
})
export class ConfirmarCompraComponent {
  constructor(private router: Router) { }
  
  MisCompras(): void {
    this.router.navigate(['misCompras']);
  }
}
