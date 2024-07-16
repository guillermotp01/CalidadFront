import { Categoria } from "./Categoria";
import { Proveedor } from "./Proveedor";

export class Producto {
    id: number = 0;
    nombre: string = "";
    descripcion: string = "";
    precio: number = 0;
    stock: number = 0;
    imagen: string = "";
    categoria: Categoria = new Categoria();
    proveedor: Proveedor = new Proveedor();
}
