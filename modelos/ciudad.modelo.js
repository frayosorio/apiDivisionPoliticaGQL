const mongo = require("mongoose");
const Esquema = mongo.Schema;

const ciudadEsquema = new Esquema(
    {
        nombre: {
            type: String,
            required: true
        },
        capitalRegion: {
            type: Boolean,
            required: true
        },
        capitalPais: {
            type: Boolean,
            required: true
        }

    }
);

module.exports = ciudadEsquema