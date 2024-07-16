import { Carrito } from "./Carrito";
import { DetalleCarrito } from "./DetalleCarrito";

export class Compra {
    id: number = 0;
    fechaCreacion: Date = new Date;
    estado: string = "";
    precioTotal: number = 0;

    carrito: Carrito[] = [];
    detallesCarrito: DetalleCarrito[] = [];
}