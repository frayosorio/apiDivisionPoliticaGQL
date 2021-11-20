const express = require('express');
const app = express();
const puerto = 3020;


//Realizar la conexion a la bd
var bd = require('./modelos/bd');
bd.conectar();

app.listen(puerto, () => {
    console.log(`Servicio de BD División Política escuchando en http://localhost:${puerto}`);
})