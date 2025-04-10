export class PersonaDto {
  id_persona?: number;
  tipo_persona: string;
  nombre: string;
  tipo_documento: string;
  num_documento: string;
  direccion: string;
  telefono: string;
  email: string;
  password?: string; // Para el registro de usuarios

  constructor(
    tipo_persona: string,
    nombre: string,
    tipo_documento: string,
    num_documento: string,
    direccion: string,
    telefono: string,
    email: string,
    password?: string
  ) {
    this.tipo_persona = tipo_persona;
    this.nombre = nombre;
    this.tipo_documento = tipo_documento;
    this.num_documento = num_documento;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
  }
}

export class LoginDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
