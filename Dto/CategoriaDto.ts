export class CategoriaDto {
  id_categoria?: number;
  nombre: string;
  descripcion: string;
  estado: boolean;

  constructor(nombre: string, descripcion: string, estado: boolean) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
  }
}
