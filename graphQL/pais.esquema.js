const { solucionadorPais } = require("./pais.solucionador")
const { makeExecutableSchema } = require("graphql-tools")

const tiposPais = `
type Pais {
    id: Int!
    nombre: String!
    continente: String!
    tipoRegion: String!
    codigoAlfa2: String!
    codigoAlfa3: String!
}

type Query{
    obtenerPaises: [Pais]
    obtenerPais(id: Int!): Pais
}

type Mutation{
    agregar(
        id: Int!
        nombre: String!
        continente: String!
        tipoRegion: String!
        codigoAlfa2: String!
        codigoAlfa3: String!       
    ): Pais

    modificarPais(
        id: Int!
        nombre: String!
        continente: String!
        tipoRegion: String!
        codigoAlfa2: String!
        codigoAlfa3: String!       
    ): Pais

    eliminarPais(id: Int!) : Pais
}

`;

const esquemaPais = makeExecutableSchema(
    {
        typeDefs: tiposPais,
        resolvers: solucionadorPais
    }
);

module.exports = esquemaPais;