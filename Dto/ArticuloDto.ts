export class ArticuloDto {
  id_articulo?: number;
  id_categoria: number;
  codigo: string;
  nombre: string;
  precio_venta: number;
  stock: number;
  descripcion: string;
  imagen: string;
  estado: boolean;

  constructor(
    id_categoria: number,
    codigo: string,
    nombre: string,
    precio_venta: number,
    stock: number,
    descripcion: string,
    imagen: string,
    estado: boolean
  ) {
    this.id_categoria = id_categoria;
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio_venta = precio_venta;
    this.stock = stock;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.estado = estado;
  }
}
