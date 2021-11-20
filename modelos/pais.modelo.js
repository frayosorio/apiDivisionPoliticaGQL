const mongo = require("mongoose");
const Esquema = mongo.Schema;

const regionEsquema =require('./region.modelo')

const paisEsquema = new Esquema(
    {
        id: {
            type: Number,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        continente: {
            type: String,
            required: true
        },
        tipoRegion: {
            type: String,
            required: true
        },
        codigoAlfa2: {
            type: String,
            required: true
        },
        codigoAlfa3: {
            type: String,
            required: true
        },
        regiones: [
            regionEsquema
        ]
    }
);

const Pais = mongo.model('paises', paisEsquema);

module.exports = Pais;