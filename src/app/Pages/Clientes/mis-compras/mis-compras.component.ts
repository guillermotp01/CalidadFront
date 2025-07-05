import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../Models/Productos';
import { Compra } from '../../../Models/Compra';
import { DetalleCompraService } from '../../../Services/detalle-compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent implements OnInit{
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
  this.detalleCompraService.obtenerMisCompras().subscribe(
    (data: Compra[] | null) => {
      if (data) {
        this.compras = data;
        console.log('Compras obtenidas:', this.compras);
      } else {
        this.compras = [];
        console.warn('No se recibieron compras.');
      }
    },
    error => {
      console.error('Error al obtener las compras', error);
      this.compras = []; // Previene fallos en el renderizado
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
