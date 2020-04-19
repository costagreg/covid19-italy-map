import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Dashboard from './components/Dashboard'
import './App.scss'


const defaultRegion = 'Sicilia'
const GET_LATEST_UPDATES = gql`
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
        newPositive,
        dischargedHealed,
        totalDeaths,
        totalCases,
        totalTests,
      }
    },
    latestTrendParam(param:"totalCases", days: 30, region: "${defaultRegion}"){
      x,
      y
    }
  }
`

export default function App() {
  const { loading, error, data = [] } = useQuery(GET_LATEST_UPDATES)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  
  return <Dashboard data={data} defaultRegion={defaultRegion} />
}
