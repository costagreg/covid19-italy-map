import { GraphQLObjectType } from 'graphql'

import { updateRegion } from '../queries/updateRegion'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...updateRegion,
  }
})