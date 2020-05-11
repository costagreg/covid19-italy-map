import React, { useState } from 'react'
import { Query } from 'react-apollo'
import Loader from '../../components/Loader'
import { FETCH_LATEST_UPDATES } from '../../queries'
import DashboardView from '../../components/DashboardView'
import { today } from '../../utils'

const Dashboard = () => {
  const defaultRegion = 'Sicilia'
  const [selectedRegion, selectRegion] = useState(defaultRegion)
  const [selectedParam, selectParam] = useState('totalCases')

  return (
    <Query query={FETCH_LATEST_UPDATES} variables={{ date: today() }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />
        if (error) return <div>Ops something went wrong</div>

        const { latestUpdates } = data
        const { date, regions } = latestUpdates

        if (regions.length === 0) return <div>Ops something went wrong</div>
        const selectedRegionData = regions.find(
          (update) => update.region === selectedRegion
        )

        return (
          <DashboardView
            selectedRegion={selectedRegion}
            selectRegion={selectRegion}
            selectParam={selectParam}
            selectedParam={selectedParam}
            selectedRegionData={selectedRegionData}
            regions={regions}
            date={+date}
          />
        )
      }}
    </Query>
  )
}

export default Dashboard
