const Pais = require('../modelos/pais.modelo')

exports.solucionadorPais = {
    Query: {
        obtenerPaises: (parent, args, context, info) => {
            console.log('Listando paises');
            return Pais.find();
        },
        obtenerPais: (parent, args, context, info) => {
            console.log(`Listando pais con id=${args.id}`);
            return Pais.findOne({ id: args.id });
        }
    },
    Mutation: {
        agregarPais: (parent, args, context, info) => {
            console.log(`Agregando pais con id=${args.id}`);
            return Pais.create({
                id: args.id,
                nombre: args.nombre,
                continente: args.continente,
                tipoRegion: args.tipoRegion,
                codigoAlfa2: args.codigoAlfa2,
                codigoAlfa3: args.codigoAlfa3
            }
            );
        },
        modificarPais: (parent, args, context, info) => {
            console.log(`Modificando pais con id=${args.id}`);
            return Pais.findOneAndUpdate(
                { id: args.id },
                {
                    nombre: args.nombre,
                    continente: args.continente,
                    tipoRegion: args.tipoRegion,
                    codigoAlfa2: args.codigoAlfa2,
                    codigoAlfa3: args.codigoAlfa3
                }
            );
        },
        eliminarPais: (parent, args, context, info) => {
            console.log(`Eliminando pais con id=${args.id}`);
            return Pais.findOneAndDelete(
                { id: args.id }
            );
        }
    }

}