import { UpdateRegion } from '../../database/models'

export default {
  Query: {
    latestUpdates: async () => {
      // TO-DO: change _id to date
      const latest = await UpdateRegion.find().sort({ _id: -1 }).limit(21)

      return {
        date: latest[0].date,
        regions: latest,
      }
    },
    latestTrendParam: async (obj, args, context, info) => {
      // TO-DO: change _id to date
      const { region, param, days} = args
      const latest = await UpdateRegion.find({ region }).sort({ _id: -1 }).limit(days)

      // TO-DO check for param
      // TO-DO refactor

      const response = latest.reduce((acc, update) => {
        acc.x.unshift(update['date'])
        acc.y.unshift(update[param])

        return acc
      }, { x: [], y: []})

      return response
    },
  },
}
