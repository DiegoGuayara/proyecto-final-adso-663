CREATE DATABASE tienda_de_tecnologia;

USE tienda_de_tecnologia;

CREATE TABLE persona (
id_persona INT PRIMARY KEY AUTO_INCREMENT,
tipo_persona VARCHAR (20),
nombre VARCHAR (100),
tipo_documento VARCHAR (20),
num_documento VARCHAR (20),
direccion VARCHAR (70),
telefono VARCHAR (20),
email VARCHAR (50),
password VARCHAR(250)
);

CREATE TABLE articulo (
id_articulo INT PRIMARY KEY AUTO_INCREMENT,
codigo VARCHAR (50),
nombre VARCHAR (100),
precio_venta DECIMAL(11.2),
stock INT,
descripcion VARCHAR (255),
estado BIT
);