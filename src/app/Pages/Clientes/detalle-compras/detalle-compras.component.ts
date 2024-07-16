import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCompraService } from '../../../Services/detalle-compra.service';
import { Compra } from '../../../Models/Compra';

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styleUrl: './detalle-compras.component.css'
})
export class DetalleComprasComponent {
  compra: Compra | undefined;

  constructor(
    private route: ActivatedRoute,
    private detalleCompraService: DetalleCompraService
  ) {}

  ngOnInit(): void {
    this.obtenerCompra();
  }

  obtenerCompra(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    if (id) {
      this.detalleCompraService.obtenerCompraPorId(id).subscribe(compra => {
        this.compra = compra;
      });
    }
  }
}
