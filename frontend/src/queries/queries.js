import gql from 'graphql-tag'

export const FETCH_LATEST_TREND = gql`
  query latestTrendParam($date: String!, $param: String!, $region: String!) {
    latestTrendParam(date: $date, param: $param, days: 30, region: $region) {
      x
      y
    }
  }
`

export const FETCH_LATEST_UPDATES = gql`
  query latestUpdates($date: String!) {
    latestUpdates(date: $date) {
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