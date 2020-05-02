import connectDb from './database/connect'
import fetch from 'node-fetch'
import { UpdateRegionModel } from './database/models'
import { mapCsvToDb } from './helpers'

const url =
  'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv'

const scraper = async () => {
  const db = await connectDb()
  const response = await fetch(url)

  if (response.ok) {
    const responseText = await response.text()
    const cod19Data = await mapCsvToDb(responseText)

    try {
      await UpdateRegionModel.collection.drop()
    } catch (e) {
      console.warn('Collection doesn\'t exist')
    }
    await UpdateRegionModel.insertMany(cod19Data)
  } else {
    console.error('HTTP-Error: ' + response.status)
  }
}

export default scraper
