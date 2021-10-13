const graphql = require('graphql')
const _ = require('lodash')

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
    } = graphql

// Dummy data
let books = [
    {name: 'Wind', genre: 'Fiction', id: '1'},
    {name: 'Rework', genre: 'Self-Help', id: '2'},
    {name: 'Julius', genre: 'Romantic', id: '3'}
]
let authors = [
    {name: 'Ram', age: 92, id: '1'},
    {name: 'Paul', age: 68, id: '2'},
    {name: 'Devesh', age: 19, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id : {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : () => ({
        id : {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //Code to get data from db/other source
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})