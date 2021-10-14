const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require('mongoose')

const app = express()

mongoose.connect(`mongodb+srv://devesh:devesh123@cluster0.4vdli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
mongoose.connection.once('open', ()=> {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("server running on port 4000")
})