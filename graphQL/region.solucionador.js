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
    },
    Mutation:{
        agregarRegion: async function (parent, args, context, info){
            console.log(`Agregando region con nombre=[${args.nombre}] del pais con id=[${args.idPais}]`);

            await Pais.updateOne(
                {
                    id: args.idPais
                },
                {
                    $push: {
                        regiones:
                        {
                            nombre: args.nombre,
                            area: args.area,
                            poblacion: args.poblacion,
                        }
                    }
                }
            );
            return buscarRegion(args.idPais, args.nombre);
        },
        modificarRegion: async function (parent, args, context, info) {
            console.log(`Modificando region con nombre=[${args.nombre}] del pais con id=[${args.idPais}]`);

            await Pais.updateOne(
                {
                    id: args.idPais,
                    regiones: { $elemMatch: { nombre: args.nombre } }
                },
                {
                    $set:
                    {
                        'regiones.$.area': args.area,
                        'regiones.$.poblacion': args.poblacion
                    }
                }
            );
            return buscarRegion(args.idPais, args.nombre)

        },
        eliminarRegion: async function (parent, args, context, info) {
            console.log(`Eliminando region con nombre=[${args.nombre}] del pais con id=[${args.idPais}]`);
            
            const region = await buscarRegion(args.idPais, args.nombre)
            if (region) {
                await Pais.updateOne(
                    {
                        id: args.idPais
                    },
                    {
                        $pull: {
                            regiones:
                            {
                                nombre: args.nombre
                            }
                        }
                    });
                return region;
            }
        }
    }
}