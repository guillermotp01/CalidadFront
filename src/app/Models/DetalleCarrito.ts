import { Producto } from "./Productos";

export class DetalleCarrito{
    id: number = 0;
    cantidad: number = 0;
    precio: number = 0;
    producto: Producto = new Producto();
}