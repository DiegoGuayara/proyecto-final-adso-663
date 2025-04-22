export class ArticuloDto {
  id_articulo?: number;
  codigo?: string;
  nombre: string;
  precio_venta: number;
  stock: number;
  descripcion: string;
  estado?: boolean;

  constructor(
    codigo: string,
    nombre: string,
    precio_venta: number,
    stock: number,
    descripcion: string,
    estado?: boolean
  ) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio_venta = precio_venta;
    this.stock = stock;
    this.descripcion = descripcion;
    this.estado = estado;
  }
}
