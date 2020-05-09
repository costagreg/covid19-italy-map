export default (UpdateRegion) => ({
  Query: {
    latestUpdates: async () => {
      const latest = await UpdateRegion.find().sort({ date: -1 }).limit(21)

      return {
        date: latest[0].date,
        regions: latest,
      }
    },
    latestTrendParam: async (_, args) => {
      const { region, param, days } = args
      const latest = await UpdateRegion.find({ region })
        .sort({ date: -1 })
        .limit(days)

      const response = latest.reduce(
        (acc, update) => {
          acc.x.unshift(update['date'])
          acc.y.unshift(update[param])

          return acc
        },
        { x: [], y: [] }
      )

      return response
    },
  },
})
