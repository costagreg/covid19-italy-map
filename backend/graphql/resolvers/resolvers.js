import { UpdateRegion } from '../../database/models'

export default {
  Query: {
    latestUpdates: async () => { 
      const latest = await UpdateRegion.find().sort({ _id: -1 }).limit(21)

      return {
        date: latest[0].date,
        regions: latest
      }
    }
  }
}