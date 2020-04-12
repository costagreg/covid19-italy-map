import { UpdateRegion } from '../../database/models'

export default {
  Query: {
    allUpdatesRegion: () => UpdateRegion.find({})
  }
}