const {
    getAparments,
    getAparmentsLength,
    getApartment
} = require('./database');
const {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = require('graphql');
const {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    toGlobalId,
} = require('graphql-relay');

const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        const { type, id } = fromGlobalId(globalId);
        if (type === 'Apartment') {
            return getApartment(id);
        }
        return null;
    },
    obj => {
        if (obj.fullAdress) {
            return GraphQLAppartment;
        }
        return null;
    },
);

const GraphQLAppartment = new GraphQLObjectType({
    name: 'Apartment',
    fields: {
        id: globalIdField(),
        title: { type: GraphQLString },
        area: { type: GraphQLInt },
        rooms: { type: GraphQLInt },
        type: { type: GraphQLString },
        price: { type: GraphQLInt },
        fullAdress: { type: GraphQLString },
    },
    interfaces: [nodeInterface],
});

const {
    connectionType: ApartmentConnection,
    edgeType: GraphQLTApartmentEdge,
} = connectionDefinitions({
    nodeType: GraphQLAppartment,
    connectionFields: () => ({
        totalCount: {
            type: GraphQLInt,
            description: 'Total apartments length',
            resolve: getAparmentsLength
        }
    })
});

const GraphQLRoot = new GraphQLObjectType({
    name: 'Root',
    fields: {
        apartments: {
            type: ApartmentConnection,
            args: {
                ...connectionArgs,
            },
            resolve: (obj, { ...args }) =>
                connectionFromArray(getAparments(), args),
        },
        node: nodeField,
    },
});

module.exports = new GraphQLSchema({
    query: GraphQLRoot,
});