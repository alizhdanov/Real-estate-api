const express = require('express');
const routes = require('./routes');
const graphqlHTTP = require('express-graphql');
const schema = require('./data/schema')

const app = express()

app.use('/', routes)
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(7799, () => console.log('Example app listening on port 7799!'))