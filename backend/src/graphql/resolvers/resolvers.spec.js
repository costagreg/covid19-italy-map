import resolvers from './resolvers'

const UpdateRegion = (data) => {
  const find = jest.fn(() => ({
    sort,
  }))

  const sort = jest.fn(() => data)

  const UpdateRegion = {
    find,
  }

  return [UpdateRegion, find, sort]
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
      const [mockUpdateRegion, mockFind, mockSort] = UpdateRegion(regions)
      const result = await resolvers(mockUpdateRegion).Query.latestUpdates(
        {},
        { date: '03/06/1992' }
      )

      expect(mockFind).toHaveBeenCalledWith({
        date: {
          $gte: new Date('1992-03-06T00:00:00.000Z'),
          $lt: new Date('1992-03-07T00:00:00.000Z'),
        },
      })

      expect(mockSort).toHaveBeenCalledWith({ date: -1 })

      expect(result).toEqual({
        id: 699840000000,
        date: 699840000000,
        regions,
      })
    })
  })

  describe('latestTrendParam', () => {
    it('returns the latest trend data a specific parameter', async () => {
      const [mockUpdateRegion, mockFind, mockSort] = UpdateRegion([
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
        { date: '03/06/1992', region: 'region1', param: 'param1', days: 10 }
      )

      expect(mockFind).toHaveBeenCalledWith({
        date: {
          $gte: new Date('1992-02-25T00:00:00.000Z'),
          $lt: new Date('1992-03-07T00:00:00.000Z'),
        },
        region: 'region1',
      })

      expect(mockSort).toHaveBeenCalledWith({ date: -1 })
      expect(result).toEqual({
        id: 699840000000,
        x: ['date3', 'date2', 'date1'],
        y: [116, 110, 10],
      })
    })
  })
})
