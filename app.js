const express = require('express');
const app = express();
const puerto = 3020;

const graphqlHTTP = require('express-graphql').graphqlHTTP


//Realizar la conexion a la bd
var bd = require('./modelos/bd');
bd.conectar();

//importar esquemas
const esquemaPais = require('./graphQL/pais.esquema');
const esquemaRegion = require('./graphQL/region.esquema');
const esquemaCiudad = require('./graphQL/ciudad.esquema');

//Definir ruta e iniciar GraphQL
app.use('/gqlpais', graphqlHTTP(
    {
        schema: esquemaPais,
        graphiql: true
    }
));

app.use('/gqlregion', graphqlHTTP(
    {
        schema: esquemaRegion,
        graphiql: true
    }
));

app.use('/gqlciudad', graphqlHTTP(
    {
        schema: esquemaCiudad,
        graphiql: true
    }
));


app.listen(puerto, () => {
    console.log(`Servicio de BD División Política escuchando en http://localhost:${puerto}`);
})