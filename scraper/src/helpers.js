import csv from 'csvtojson'

const mapCsvToDb = async (csvText) => {
  const csvArray = await csv().fromString(csvText)

  return csvArray.map((regionUpdate) => ({
    date: regionUpdate['data'],
    region: regionUpdate['denominazione_regione'],
    hospitalizedWithSymptoms: regionUpdate['ricoverati_con_sintomi'],
    intensiveCare: regionUpdate['terapia_intensiva'],
    totalHospitalized: regionUpdate['totale_ospedalizzati'],
    homeIsolation: regionUpdate['isolamento_domiciliare'],
    totalPositive: regionUpdate['totale_positivi'],
    totalChangePositive: regionUpdate['variazione_totale_positivi'],
    newPositive: regionUpdate['nuovi_positivi'],
    dischargedHealed: regionUpdate['dimessi_guariti'],
    totalDeaths: regionUpdate['deceduti'],
    totalCases: regionUpdate['totale_casi'],
    totalTests: regionUpdate['tamponi'],
  }))
}

export { mapCsvToDb }
