import { Component, OnInit } from '@angular/core';
import { Compra } from '../../../Models/Compra';
import { Router } from '@angular/router';
import { DetalleCompraService } from '../../../Services/detalle-compra.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compras: Compra[] = [];
  compra: Compra | null = null;
  showModalCompra: boolean = false;

  constructor(
    private detalleCompraService: DetalleCompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCompras();
  }

  listarCompras(): void {
    this.detalleCompraService.obtenerMisCompras().subscribe(
      (data: Compra[] | null) => {
        this.compras = data ?? []; // si es null, asigna []
        console.log('Compras obtenidas:', this.compras);
      },
      error => {
        console.error('Error al obtener las compras', error);
        this.compras = []; // prevenir errores de renderizado
      }
    );
  }

  mostrarDetalles(id: number | undefined): void {
    if (id == null) return;
    this.detalleCompraService.obtenerCompraPorId(id).subscribe(
      (data: Compra) => {
        this.compra = data;
        this.showModalCompra = true;
      },
      error => {
        console.error('Error al obtener los detalles de la compra', error);
        this.compra = null;
      }
    );
  }

  cerrarModal(): void {
    this.showModalCompra = false;
    this.compra = null;
  }

  productos(): void {
    this.router.navigate(['productos']);
  }
}
