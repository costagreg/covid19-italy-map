import { GraphQLSchema } from 'graphql'
import { RootQueryType } from './rootQueryType'

export default new GraphQLSchema({ query: RootQueryType })