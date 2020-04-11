import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { UpdateRegionType } from '../../types'
import { UpdateRegion } from '../../../database/models'

export const updateRegion = {
  allUpdatesRegion: {
    type: new GraphQLList(UpdateRegionType),
    async resolve() {
      return UpdateRegion.find({})
    },
  },
}
