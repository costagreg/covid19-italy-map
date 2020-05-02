import scraper from '../scraper'
import * as connect from '../database/connect'
import * as models from '../database/models'
import { responseCsv, responseMapped } from './mocks/data.js'

import fetch from 'node-fetch'

jest.mock('node-fetch')
jest.mock('../database/models')

describe('Scraper', () => {
  const insertManyMock = jest.fn()
  const dropDbMock = jest.fn()

  connect.default = jest.fn()
  models.UpdateRegionModel = {
    insertMany: insertManyMock,
    collection: {
      drop: dropDbMock,
    },
  }
  fetch.mockReturnValue(
    Promise.resolve({
      ok: true,
      text: () => responseCsv,
    })
  )

  it('fetches end point, drop collection and update the database', async () => {
    await scraper()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(dropDbMock).toHaveBeenCalledTimes(1)
    expect(insertManyMock).toHaveBeenCalledWith(responseMapped)
  })
})
