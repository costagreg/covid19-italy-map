import { tomorrow, subtractDays } from '../../utils'

export default (UpdateRegion) => ({
  Query: {
    latestUpdates: async (_, { date }) => {
      const today = new Date(date)

      const latest = await UpdateRegion.find({
        date: { $gte: today, $lt: tomorrow(today) },
      }).sort({ date: -1 })

      return {
        id: today.getTime(),
        date: today.getTime(),
        regions: latest,
      }
    },
    latestTrendParam: async (_, { date, region, param, days }) => {
      const today = new Date(date)

      const latest = await UpdateRegion.find({
        date: { $gte: subtractDays(today, days), $lt: tomorrow(today) },
        region,
      }).sort({ date: -1 })

      const response = latest.reduce(
        (acc, update) => {
          acc.x.unshift(update['date'])
          acc.y.unshift(update[param])

          return acc
        },
        { id: today.getTime(), x: [], y: [] }
      )

      return response
    },
  },
})
