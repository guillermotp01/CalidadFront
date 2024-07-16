import { DetalleCarrito } from "./DetalleCarrito";

export class Carrito{
    id: number = 0;
    precioDelivery: number = 0;
    subtotal: number = 0;
    precioTotal: number = 0;

    detallesCarrito: DetalleCarrito[] = [];
}