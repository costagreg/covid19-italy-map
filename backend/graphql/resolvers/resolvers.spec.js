import resolvers from './resolvers'

const UpdateRegion = (data) => {
  const find = jest.fn(() => ({
    sort,
  }))
  const sort = jest.fn(() => ({
    limit,
  }))
  const limit = jest.fn(() => data)
  const UpdateRegion = {
    find,
  }

  return [UpdateRegion, find, sort, limit]
}

const regions = [
  {
    date: 'mockDate',
    mockParam: true,
    name: 'name1',
    param1: 10,
  },
  {
    date: 'mockDate',
    mockParam: false,
    name: 'name2',
    param1: 20,
  },
]

describe('Resolvers', () => {
  describe('latestUpdates', () => {
    it('returns the latest update for all regions', async () => {
      const [mockUpdateRegion, mockFind, mockSort, mockLimit] = UpdateRegion(
        regions
      )
      const result = await resolvers(mockUpdateRegion).Query.latestUpdates()

      expect(mockFind).toHaveBeenCalledWith()
      expect(mockSort).toHaveBeenCalledWith({ date: -1 })
      expect(mockLimit).toHaveBeenCalledWith(21)
      expect(result).toEqual({
        date: 'mockDate',
        regions,
      })
    })
  })

  describe('latestTrendParam', () => {
    it('returns the latest trend data a specific parameter', async () => {
      const [mockUpdateRegion, mockFind, mockSort, mockLimit] = UpdateRegion([
        {
          name: 'region1',
          param1: 10,
          date: 'date1',
        },
        {
          name: 'region1',
          param1: 110,
          date: 'date2',
        },
        {
          name: 'region1',
          param1: 116,
          date: 'date3',
        },
      ])
      const result = await resolvers(mockUpdateRegion).Query.latestTrendParam(
        {},
        { region: 'region1', param: 'param1', days: 10 }
      )

      expect(mockFind).toHaveBeenCalledWith({ region: 'region1' })
      expect(mockSort).toHaveBeenCalledWith({ date: -1 })
      expect(mockLimit).toHaveBeenCalledWith(10)
      expect(result).toEqual({
        x: ['date3', 'date2', 'date1'],
        y: [116, 110, 10],
      })
    })
  })
})
