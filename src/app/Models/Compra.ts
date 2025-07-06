import { DetalleCarrito } from "./DetalleCarrito";
import { Usuario } from "./Usuario";

export interface Compra {
  id: number ;
  fechaCreacion: string;
  estado: string;
  precioTotal: number;
  cantidadTotal: number;
  precioDelivery: number;
  subtotal: number;
  detallesCarrito: DetalleCarrito[];
  usuario: Usuario;
}