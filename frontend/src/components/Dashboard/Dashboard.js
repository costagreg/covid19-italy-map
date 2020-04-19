import React, { useState } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ItalyMap from '../../components/ItalyMap'
import DataTable from '../../components/DataTable'
import ChartTrending from '../../components/ChartTrending'
import { useQuery } from '@apollo/react-hooks'

import './Dashboard.scss'

const FETCH_LATEST_TRENT = (region, param) => gql`
  {
    latestTrendParam(param:"${param}", days: 30, region: "${region}"){
      x,
      y
    }
  }`

export default function Dashboard({
  defaultRegion,
  data: { latestUpdates, latestTrendParam },
}) {
  const [selectedRegion, selectRegion] = useState(defaultRegion)
  const [selectedParam, selectParam] = useState('totalCases')

  const { date, regions } = latestUpdates

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
          <DataTable
            updatesDate={+date}
            regionData={selectedRegionData}
            selectParam={selectParam}
          />
        )}
        <Query query={FETCH_LATEST_TRENT(selectedRegion, selectedParam)}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            const { latestTrendParam } = data

            return (
              <ChartTrending
                xAxis={latestTrendParam.x}
                yAxis={latestTrendParam.y}
                chartWidth={400}
                chartHeight={200}
                marginBottom={30}
              />
            )
          }}
        </Query>
      </section>
    </main>
  )
}
