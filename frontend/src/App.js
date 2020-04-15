import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Dashboard from './components/Dashboard'
import './App.scss'

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
        totalDeaths
        totalCases
        totalTests 
      }
    }
  }
`

export default function App() {
  const { loading, error, data = [] } = useQuery(GET_LATEST_UPDATES)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log(data.latestUpdates)
  
  return <Dashboard data={data.latestUpdates} />
}
