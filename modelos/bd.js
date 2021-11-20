//Cargar la libreria para operar con bases de datos mongo
const mongo = require('mongoose');

//Cargar la configuracion de la BD
const configBD = require('../configuracion/bd.config');

//Asignar cadena de coenexion
const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}/${configBD.BASEDATOS}`;

//objeto que contiene la conexion a la bd
let basedatos;

module.exports = {
    conectar: function () {
        //conectar al servidor
        mongo.connect(url);
        basedatos = mongo.Connection;

        if (!basedatos) {
            console.log('Error conectando a la base de datos');
        }
        else {
            console.log('Se ha establecido conexion a la base de datos');
        }
    },

    obtenerBaseDatos: function () {
        return basedatos;
    }
}