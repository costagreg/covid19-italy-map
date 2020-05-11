import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

const port = process.env.PORT
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app, cors: true })

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
