import { today } from './utils'

describe('utils', () => {
  describe('today', () => {
    it('returns current day without time', () => {
      const now = new Date()
      const todayWithouTime = today()

      now.setHours(0, 0, 0, 0)
      expect(todayWithouTime.getTime()).toBe(now.getTime())
    })
  })
})
