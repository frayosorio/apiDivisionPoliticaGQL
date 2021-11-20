const { solucionadorRegion } = require("./region.solucionador")
const { makeExecutableSchema } = require("graphql-tools")

const tiposRegion = `
type Region {
    nombre: String!
    area: Float
    poblacion: Int
}

type Query{
    obtenerRegiones(idPais: Int!): [Region]
    obtenerRegion(idPais: Int!, nombre: String!): Region
}

type Mutation{
    agregarRegion(
        idPais: Int!
        nombre: String!
        area: Float
        poblacion: Int
    ): Region

    modificarRegion(
        idPais: Int!
        nombre: String!
        area: Float
        poblacion: Int
    ): Region

    eliminarRegion(idPais: Int!, nombre: String!): Region

}
`;

const esquemaRegion = makeExecutableSchema(
    {
        typeDefs: tiposRegion,
        resolvers: solucionadorRegion
    }
);

module.exports = esquemaRegion;