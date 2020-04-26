import React from 'react'
import { Query } from 'react-apollo'
import propTypes from 'prop-types'

import Loader from '../../components/Loader'
import LineChart from '../../components/LineChart'
import { FETCH_LATEST_TREND } from '../../queries'

const ChartTrending = ({ selectedRegion, selectedParam }) => (
  <Query
    query={FETCH_LATEST_TREND}
    variables={{ region: selectedRegion, param: selectedParam }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loader />
      if (error) return <div>Ops something went wrong</div>

      const { latestTrendParam } = data

      return (
        <div data-testid={`chartTrending-${selectedRegion}`}>
          <LineChart
            xAxis={latestTrendParam.x}
            yAxis={latestTrendParam.y}
            yLabel={selectedParam}
            chartWidth={400}
            chartHeight={200}
            margin={[10, 20, 30, 20]}
          />
        </div>
      )
    }}
  </Query>
)

ChartTrending.propTypes = {
  selectedRegion: propTypes.string.isRequired,
  selectedParam: propTypes.string.isRequired,
}

export default ChartTrending
