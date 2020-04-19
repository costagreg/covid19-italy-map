import React, { useState } from 'react'
import ItalyMap from '../../components/ItalyMap'
import DataTable from '../../components/DataTable'
import ChartTrending from '../../components/ChartTrending'
import './Dashboard.scss'

export default function Dashboard({ data }) {
  const [selectedRegion, selectRegion] = useState('Sicilia')
  const { date, regions } = data

  const selectedRegionData = regions.find(
    (update) => update.region === selectedRegion
  )

  return (
    <main className="dashboard">
      <section className="dashboard__italyMap">
        <ItalyMap
          width={700}
          height={770}
          data={regions}
          selectedRegion={selectedRegion}
          selectRegion={selectRegion}
        />
      </section>
      <section className="dashboard__dataTable">
        {selectedRegionData && (
          <DataTable updatesDate={+date} regionData={selectedRegionData} />
        )}
        <ChartTrending
          xAxis={['03/06/2020', '04/06/2020', '05/06/2020', '06/06/2020']}
          yAxis={[120, 130, 120, 180]}
          chartWidth={400}
          chartHeight={200}
          marginBottom={30}
        />
      </section>
    </main>
  )
}
