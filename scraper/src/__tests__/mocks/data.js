const responseCsv = `data,stato,codice_regione,denominazione_regione,lat,long,ricoverati_con_sintomi,terapia_intensiva,totale_ospedalizzati,isolamento_domiciliare,totale_positivi,variazione_totale_positivi,nuovi_positivi,dimessi_guariti,deceduti,totale_casi,tamponi,note_it,note_en
2020-02-24T18:00:00,ITA,13,denominazione_regione_mock,42.35122196,13.39843823,ricoverati_con_sintomi_mock,terapia_intensiva_mock,totale_ospedalizzati_mock,isolamento_domiciliare_mock,totale_positivi_mock,variazione_totale_positivi_mock,nuovi_positivi_mock,dimessi_guariti_mock,deceduti_mock,totale_casi_mock,tamponi_mock,,
2020-02-24T18:00:00,ITA,17,Basilicata,40.63947052,15.80514834,0,0,0,0,0,0,0,0,0,0,0,,`

const responseMapped = [
  {
    date: '2020-02-24T18:00:00',
    dischargedHealed: 'dimessi_guariti_mock',
    homeIsolation: 'isolamento_domiciliare_mock',
    hospitalizedWithSymptoms: 'ricoverati_con_sintomi_mock',
    intensiveCare: 'terapia_intensiva_mock',
    newPositive: 'nuovi_positivi_mock',
    region: 'denominazione_regione_mock',
    totalCases: 'totale_casi_mock',
    totalChangePositive: 'variazione_totale_positivi_mock',
    totalDeaths: 'deceduti_mock',
    totalHospitalized: 'totale_ospedalizzati_mock',
    totalPositive: 'totale_positivi_mock',
    totalTests: 'tamponi_mock',
  },
  {
    date: '2020-02-24T18:00:00',
    dischargedHealed: '0',
    homeIsolation: '0',
    hospitalizedWithSymptoms: '0',
    intensiveCare: '0',
    newPositive: '0',
    region: 'Basilicata',
    totalCases: '0',
    totalChangePositive: '0',
    totalDeaths: '0',
    totalHospitalized: '0',
    totalPositive: '0',
    totalTests: '0',
  },
]
export { responseCsv, responseMapped }
