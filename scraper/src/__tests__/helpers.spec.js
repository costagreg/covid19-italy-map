import { mapCsvToDb } from '../helpers'
import { responseCsv, responseMapped }  from './mocks/data.js'

describe('helpers', () => {
  describe('@mapCsvToDb', () => {
    it('maps CSV data to Database model', async () => {
      const mappedData = await mapCsvToDb(responseCsv)

      expect(mappedData).toEqual(responseMapped)
    })
  })
})
