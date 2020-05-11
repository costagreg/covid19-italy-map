import { tomorrow, subtractDays } from './utils'

describe('utils', () => {
  describe('tomorrow', () => {
    it('returns current day without time', () => {
      const date = new Date(2020,12,1)
      const tomorrowDate = tomorrow(date)

      const expected = new Date(2020,12,2)

      expect(tomorrowDate.getTime()).toBe(expected.getTime())
    })
  })

  describe('subtractDays', () => {
    it('subtract days from a full date', () => {
      const date = new Date(1992,6,3)
      const pastDate = subtractDays(date, 4)

      const expected = new Date(1992,5,29)

      expect(pastDate.getTime()).toBe(expected.getTime())
    })
  })
})
