import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

const port = process.env.PORT
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
}

const app = express()


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})

const server = new ApolloServer({ typeDefs, resolvers, context: params => () => {
  console.log(params.req.body.query);
  console.log(params.req.body.variables);
} })

server.applyMiddleware({ app , cors: corsOptions})


app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)