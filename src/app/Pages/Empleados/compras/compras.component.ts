import { Component, OnInit } from '@angular/core';
import { Compra } from '../../../Models/Compra';
import { Router } from '@angular/router';
import { DetalleCompraService } from '../../../Services/detalle-compra.service';
import { CarritoService } from '../../../Services/carrito.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit{
  compras: Compra[] = [];
  compra: Compra | undefined;
  showModalCompra: boolean = false;

  constructor(
    private detalleCompraService: DetalleCompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCompras();
  }

  listarCompras() {
    this.detalleCompraService.listarTodasCompras().subscribe(
      (data: Compra[]) => {
        this.compras = data;
        console.log('Compras obtenidas:', this.compras);
      },
      error => {
        console.error('Error al obtener las compras', error);
      }
    );
  }

  mostrarDetalles(id: number) {
    this.detalleCompraService.obtenerCompraPorId(id).subscribe(
      (data: Compra) => {
        this.compra = data;
        this.showModalCompra = true;
      },
      error => {
        console.error('Error al obtener los detalles de la compra', error);
      }
    );
  }

  cerrarModal() {
    this.showModalCompra = false;
  }

  productos() {
    this.router.navigate(['productos']);
  }
}
