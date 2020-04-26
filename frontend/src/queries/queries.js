import gql from 'graphql-tag'

export const FETCH_LATEST_TREND = gql`
  query latestTrendParam($param: String!, $region: String!) {
    latestTrendParam(param: $param, days: 30, region: $region) {
      x
      y
    }
  }
`
export const FETCH_LATEST_UPDATES = gql`
  {
    latestUpdates {
      date
      regions {
        region
        hospitalizedWithSymptoms
        intensiveCare
        totalHospitalized
        homeIsolation
        totalPositive
        totalChangePositive
        newPositive
        dischargedHealed
        totalDeaths
        totalCases
        totalTests
      }
    }
  }
`