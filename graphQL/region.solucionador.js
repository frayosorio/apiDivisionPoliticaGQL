const Pais = require('../modelos/pais.modelo');

const buscarRegion = async function (idPais, nombreRegion) {
    const regionesEncontradas = await Pais.aggregate([
        { $match: { id: idPais } },
        {
            $project: {
                regiones: {
                    $filter: {
                        input: '$regiones',
                        as: 'region',
                        cond: { $eq: ['$$region.nombre', nombreRegion] }
                    }
                }
            }
        },
        { $unwind: '$regiones' },
        {
            $project: {
                nombre: '$regiones.nombre',
                area: '$regiones.area',
                poblacion: '$regiones.poblacion'
            }
        }
    ]);

    if (regionesEncontradas) {
        return regionesEncontradas[0];
    }
}

exports.solucionadorRegion = {
    Query: {
        obtenerRegiones: (parent, args, context, info) => {
            console.log(`Listando regiones del pais con id=${args.idPais}`);
            return Pais.aggregate([
                { $match: { id: args.idPais } },
                { $unwind: '$regiones' },
                {
                    $project: {
                        nombre: '$regiones.nombre',
                        area: '$regiones.area',
                        poblacion: '$regiones.poblacion'
                    }
                }
            ]);
        },

        obtenerRegion: (parent, args, context, info) => {
            console.log(`Buscando región con nombre=${args.nombre} del pais con id=${args.idPais}`);
            return buscarRegion(args.idPais, args.nombre);
        }
    }
}