import React from 'react'
import { Query } from 'react-apollo'
import Loader from '../../components/Loader'
import LineChart from '../../components/LineChart'
import { FETCH_LATEST_TREND } from '../../queries'

export const ChartTrending = ({ selectedRegion, selectedParam }) => (
    <Query
      query={FETCH_LATEST_TREND}
      variables={{ region: selectedRegion, param: selectedParam }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loader />
        if (error) return <div>Ops something went wrong</div>

        const { latestTrendParam } = data

        return (
          <LineChart
            xAxis={latestTrendParam.x}
            yAxis={latestTrendParam.y}
            yLabel={selectedParam}
            chartWidth={400}
            chartHeight={200}
            margin={[10, 20, 30, 20]}
          />
        )
      }}
    </Query>
)
