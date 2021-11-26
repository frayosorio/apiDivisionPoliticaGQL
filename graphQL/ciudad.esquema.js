const { solucionadorCiudad } = require("./ciudad.solucionador")
const { makeExecutableSchema } = require("graphql-tools")

const tiposCiudad = `
type Ciudad {
    nombre: String!
    capitalRegion: Boolean!
    capitalPais: Boolean!
}

type Query{
    obtenerCiudades(idPais: Int!, nombreRegion: String!): [Ciudad]
    obtenerCiudad(idPais: Int!, nombreRegion: String!, nombre: String!): Ciudad
}

type Mutation{
    agregarCiudad(
        idPais: Int!
        nombreRegion: String!
        nombre: String!
        capitalRegion: Boolean!
        capitalPais: Boolean!
    ): Ciudad

    modificarCiudad(
        idPais: Int!
        nombreRegion: String!
        nombre: String!
        capitalRegion: Boolean!
        capitalPais: Boolean!
    ): Ciudad

    eliminarCiudad(idPais: Int!, nombreRegion: String!, nombre: String!): Ciudad

}
`;

const esquemaCiudad = makeExecutableSchema(
    {
        typeDefs: tiposCiudad,
        resolvers: solucionadorCiudad
    }
);

module.exports = esquemaCiudad;