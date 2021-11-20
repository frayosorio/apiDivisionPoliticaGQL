const mongo = require("mongoose");
const Esquema = mongo.Schema;

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
    }
);

const Pais = mongo.model('paises', paisEsquema);

module.export = Pais;