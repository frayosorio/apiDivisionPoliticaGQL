const ciudadEsquema = require("./ciudad.modelo");
const mongo = require("mongoose");

const Esquema = mongo.Schema;

const regionEsquema = new Esquema(
    {
        nombre: {
            type: String,
            required: true
        },
        area:{
            type: Number,
            required: false
        },
        poblacion:{
            type: Number,
            required: false
        },
        ciudades:[
            ciudadEsquema
        ]
    }
);

module.exports = regionEsquema

