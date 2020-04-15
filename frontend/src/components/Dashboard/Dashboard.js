import React, { useState } from 'react'
import ItalyMap from '../../components/ItalyMap'
import DataTable from '../../components/DataTable'
import './Dashboard.scss'

export default function Dashboard({ data }) {
  const [selectedRegion, selectRegion] = useState('Sicilia')
  const { regions } = data

  const selectedRegionData = regions.find(
    (update) => update.region === selectedRegion
  )

  return (
    <main className="dashboard">
      <section className="dashboard__italyMap">
        <ItalyMap
          width={700}
          height={800}
          data={regions}
          selectedRegion={selectedRegion}
          selectRegion={selectRegion}
        />
      </section>
      <section className="dashboard__dataTable">
        {selectedRegionData && <DataTable regionData={selectedRegionData} />}
      </section>
    </main>
  )
}
