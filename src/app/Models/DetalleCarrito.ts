// models/DetalleCarrito.ts
import { Producto } from "./Productos";

export interface DetalleCarrito {
  id: number;
  cantidad: number;
  precio: number;
  producto: Producto;
}
