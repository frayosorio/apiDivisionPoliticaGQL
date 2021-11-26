const Pais = require('../modelos/pais.modelo')

const buscarCiudad = async function (idPais, nombreRegion, nombreCiudad) {
    const ciudadEncontrada = await Pais.aggregate([
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
        { $unwind: '$regiones.ciudades' },
        {
            $project: {
                nombre: '$regiones.ciudades.nombre',
                capitalRegion: '$regiones.ciudades.capitalRegion',
                capitalPais: '$regiones.ciudades.capitalPais'
            }
        },
        {
            $match: {
                nombre: nombreCiudad
            }
        }
    ]);
    if (ciudadEncontrada)
        return ciudadEncontrada[0];
}


exports.solucionadorCiudad = {
    Query: {
        obtenerCiudades: (parent, args, context, info) => {
            console.log(`Listando ciudades de la region=[${args.nombreRegion}] del pais con id=[${args.idPais}]`);
            return Pais.aggregate([
                { $match: { id: args.idPais } },
                {
                    $project: {
                        regiones: {
                            $filter: {
                                input: '$regiones',
                                as: 'region',
                                cond: { $eq: ['$$region.nombre', args.nombreRegion] }
                            }
                        }
                    }
                },
                { $unwind: '$regiones' },
                { $unwind: '$regiones.ciudades' },
                {
                    $project: {
                        nombre: '$regiones.ciudades.nombre',
                        capitalRegion: '$regiones.ciudades.capitalRegion',
                        capitalPais: '$regiones.ciudades.capitalPais'
                    }
                }
            ]);
        },
        obtenerCiudad: (parent, args, context, info) => {
            console.log(`Buscando ciudad con nombre=[${args.nombre}] de la region=[${args.nombreRegion}] del pais con id=[${args.idPais}]`);
            return buscarCiudad(args.idPais, args.nombreRegion, args.nombre);
        }
    },
    Mutation:{
        agregarCiudad: async function (parent, args, context, info){
            console.log(`Agregando ciudad con nombre=[${args.nombre}] de la region=[${args.nombreRegion}] del pais con id=[${args.idPais}]`);

            await Pais.updateOne(
                {
                    id: args.idPais,
                    regiones: { $elemMatch: { nombre: args.nombreRegion}}
                },
                {
                    $push: {
                        'regiones.$.ciudades':
                        {
                            nombre: args.nombre,
                            capitalRegion: args.capitalRegion,
                            capitalPais: args.capitalPais,
                        }
                    }
                }
            );
            return buscarCiudad(args.idPais, args.nombreRegion, args.nombre);
        },
        modificarCiudad: async function (parent, args, context, info) {
            console.log(`Modificando ciudad con nombre=${args.nombre} de región=${args.nombreRegion} del pais con id=${args.idPais}`);

            await Pais.updateOne(
                {
                    id: args.idPais
                },
                {
                    $set:
                    {
                        'regiones.$[region].ciudades.$[ciudad].capitalRegion': args.capitalRegion,
                        'regiones.$[region].ciudades.$[ciudad].capitalPais': args.capitalPais
                    }
                },
                {
                    arrayFilters: [{ 'region.nombre': args.nombreRegion }, { 'ciudad.nombre': args.nombre }],
                }
            );
            return buscarCiudad(args.idPais, args.nombreRegion, args.nombre)

        },
        eliminarCiudad: async function (parent, args, context, info) {
            console.log(`Eliminando ciudad con nombre=${args.nombre} de región=${args.nombreRegion} del pais con id=${args.idPais}`);

            const ciudad = await buscarCiudad(args.idPais, args.nombreRegion, args.nombre)
            if (ciudad) {
                await Pais.updateOne(
                    {
                        id: args.idPais,
                        regiones: { $elemMatch: { nombre: args.nombreRegion } }
                    },
                    {
                        $pull: {
                            'regiones.$.ciudades':
                            {
                                nombre: args.nombre
                            }
                        }
                    });
                return ciudad;
            }
        }
    }

}