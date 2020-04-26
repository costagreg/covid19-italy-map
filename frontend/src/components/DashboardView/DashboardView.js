import React from 'react'
import propTypes from 'prop-types'
import ItalyMap from '../../components/ItalyMap'
import DataTable from '../../components/DataTable'
import ChartTrending from '../../containers/ChartTrending'

import './DashboardView.scss'

const DashboardView = ({
  selectedRegion,
  selectedParam,
  selectRegion,
  selectParam,
  selectedRegionData,
  regions,
  date,
}) => (
  <main className="dashboardView">
    <section className="dashboardView__italyMap">
      <ItalyMap
        width={700}
        height={770}
        data={regions}
        selectedRegion={selectedRegion}
        selectRegion={selectRegion}
      />
    </section>
    <section className="dashboardView__dataTable">
      {selectedRegionData && (
        <DataTable
          updatesDate={+date}
          regionData={selectedRegionData}
          selectParam={selectParam}
          selectedParam={selectedParam}
        />
      )}
      <section className="dashboardView__chartTrending">
        <ChartTrending
          selectedRegion={selectedRegion}
          selectedParam={selectedParam}
        />
      </section>
    </section>
  </main>
)

// DashboardView.propTypes = {
//   selectedRegion: 
//   selectedParam,
//   selectRegion,
//   selectParam,
//   selectedRegionData,
//   regions,
//   date,
// }
export default DashboardView
