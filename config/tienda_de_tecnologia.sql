CREATE DATABASE tienda_de_tecnologia;

USE tienda_de_tecnologia;

CREATE TABLE persona (
id_persona INT,
tipo_persona VARCHAR (20),
nombre VARCHAR (100),
tipo_documento VARCHAR (20),
num_documento VARCHAR (20),
direccion VARCHAR (70),
telefono VARCHAR (20),
email VARCHAR (50)
password VARCHAR(250)
);

CREATE TABLE articulo (
id_articulo INT,
id_categoria INT,
codigo VARCHAR (50),
nombre VARCHAR (100),
precio_venta DECIMAL(11.2),
stock INT,
descripcion VARCHAR (255),
imagen VARCHAR (20),
estado BIT
);

CREATE TABLE categoria (
id_categoria INT,
nombre VARCHAR (50),
descripcion VARCHAR (255),
estado BIT
);